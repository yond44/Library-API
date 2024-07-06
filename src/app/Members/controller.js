const members = require("../../model/members");
const borrowedBooks = require("../../model/borrowedBooks");
const { successResponse, errorResponse } = require("../../middlewares/respond");

module.exports = {
  getMembers: async (req, res) => {
    try {
      const allmembers = await members.find().lean();
      const borrowedBook = await borrowedBooks.find();

      //CARA PERTAMA

      allmembers.forEach((member) => {
        const filteredBorrowedBooks = borrowedBook.filter((book) => {
          return member.code === book.member_code;
        });

        filteredBorrowedBooks.forEach((entry) => {
          member.books = [entry] || [];
        });
        if (!member.books) {
          member.count = 0;
        } else {
          member.count = member.books.length;
        }
      });

      const cleanData = allmembers.map((item) => {
        const { books, ...rest } = item;
        return rest;
      });

      // CARA KEDUA

      //   const countMap = allmembers.reduce((map, person) => {
      //     const count = borrowedBook.filter(
      //       (entry) => entry.member_code === person.code
      //     ).length;
      //     map[person.code] = count;
      //     return map;
      //   }, {});

      //   const updatedData = allmembers.map((person) => ({
      //     ...person,
      //     count: countMap[person.code] || 0,
      //   }));
      //   const cleanData = updatedData.map((item) => {
      //     const { $__, $isNew, _doc, ...cleanedItem } = item;
      //     return { ..._doc, count: item.count };
      //   });

      return successResponse(res, 200, "Success", cleanData, req);
    } catch (error) {
      errorResponse(res, error, null, req);
    }
  },
};
