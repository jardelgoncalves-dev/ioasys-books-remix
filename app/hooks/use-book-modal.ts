import { useState } from 'react';
import { Book } from '~/interfaces/book';

export const useSelectBook = () => {
  const [bookSelected, setBookSelected] = useState<null | Book>(null);

  return {
    handleSelectBook: setBookSelected,
    book: bookSelected,
  };
};
