import { useEffect, useState } from 'react';

export const usePagination = (maxPage: number) => {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    if (page >= maxPage) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }

    if (page <= 1) {
      setHasPrevPage(false);
    } else {
      setHasPrevPage(true);
    }
  }, [page, maxPage]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return {
    page,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  };
};
