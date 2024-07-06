const members = require("../../model/members");
const books = require("../../model/books");
const borrowedBooks = require("../../model/borrowedBooks");
const { successResponse, errorResponse } = require("../../middlewares/respond");

module.exports = {
  getBorrowedBooks: async (req, res) => {
    try {
      const borrowedBook = await borrowedBooks.find();
      return successResponse(res, 200, "Success", borrowedBook, req);
    } catch (error) {
      errorResponse(res, error, null, req);
    }
  },
  borrowingBook: async (req, res) => {
    try {
      const { id } = req.params;
      const { book_code } = req.body;

      const member = await members.findOne({ _id: id });
      const book = await books.findOne({ code: book_code });
      const borrowedBook = await borrowedBooks.find();
      console.log(member);
      const filteredBorrowedBooksbyMember = borrowedBook.filter((item) => {
        return item.member_code === member.code;
      });

      const filteredBorrowedBooksbyBooks = borrowedBook.filter((item) => {
        return item.book_code === book_code;
      });

      const today = new Date();
      if (member.penalized) {
        if (member.penalized >= today) {
          return errorResponse(
            res,
            "Tidak dapat meminjam buku karena pinalti",
            null,
            req
          );
        }
      }
      if (filteredBorrowedBooksbyMember.length > 1) {
        return errorResponse(
          res,
          "Tidak dapat meminjam buku karena sudah mencapai maksimal buku yang dapat dipinjam",
          null,
          req
        );
      }
      if (filteredBorrowedBooksbyBooks.length > 0) {
        return errorResponse(
          res,
          "Tidak dapat meminjam buku karena buku sedang dipinjam orang lain",
          null,
          req
        );
      }
      if (book.stock < 1) {
        return errorResponse(
          res,
          "Tidak dapat meminjam buku karena stock buku tidak ada",
          null,
          req
        );
      }
      const daysAfter = 7;
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + daysAfter);

      const bookToBeBorrowed = new borrowedBooks({
        member_code: member.code,
        book_code: book.code,
        member_name: member.name,
        title: book.title,
        borrowing_date: today,
        returning_date: futureDate,
      });

      bookToBeBorrowed.save();

      book.stock = book.stock - 1;

      book.save();
      return successResponse(res, 201, "Berhasil meminjam buku", null, req);
    } catch (error) {
      errorResponse(res, error, null, req);
    }
  },
  returningBook: async (req, res) => {
    try {
      const { id } = req.params;

      const borrowedBook = await borrowedBooks.findById({ _id: id });
      const book = await books.findOne({ code: borrowedBook.book_code });
      const member = await members.findOne({ code: borrowedBook.member_code });
      const today = new Date();
      const verifyDate = new Date("2024-07-13");
      const daysAfter = 3;
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + daysAfter);
      if (borrowedBook.returning_date < verifyDate) {
        member.penalized = futureDate;

        member.save();
      }

      book.stock = book.stock + 1;

      book.save();

      await borrowedBooks.findByIdAndDelete({ _id: id });
      return successResponse(
        res,
        200,
        "Success",
        "Berhasil mengembalikan buku",
        null,
        req
      );
    } catch (error) {
      errorResponse(res, error, null, req);
    }
  },
};
