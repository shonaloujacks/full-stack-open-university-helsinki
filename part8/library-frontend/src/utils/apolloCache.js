import { ALL_BOOKS } from "../queries";

export const addBookToCache = (cache, bookToAdd) => {
  const variableSet = [
    { genres: [""] },
    ...bookToAdd.genres.map((genre) => ({ genres: [genre] })),
  ];

  variableSet.forEach((variables) => {
    cache.updateQuery({ query: ALL_BOOKS, variables }, (data) => {
      if (!data) return null;

      const { allBooks } = data;
      if (allBooks.some((book) => book.id === bookToAdd.id)) {
        return { allBooks };
      }
      return { allBooks: allBooks.concat(bookToAdd) };
    });
  });
};
