const books = require("../../model/books");
const borrowedBooks = require("../../model/borrowedBooks");
const { successResponse, errorResponse } = require("../../middlewares/respond");

module.exports = {
  getBooks: async (req, res) => {
    try {
      const book = await books.find({ stock: { $ne: 0 } });
      const borrowedBook = await borrowedBooks.find();

      let allBooks;

      borrowedBook.forEach((entry) => {
        allBooks = book.filter((item) => {
          return item.code !== entry.book_code;
        });
      });

      return successResponse(res, 200, "Success", allBooks, req);
    } catch (error) {
      errorResponse(res, error, null, req);
    }
  },
};
