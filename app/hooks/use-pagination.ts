import { useEffect, useState } from 'react';
import { useNavigate } from 'remix';

export const usePagination = (maxPage: number, currentPage = 1) => {
  const [page, setPage] = useState(currentPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const navigate = useNavigate();
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
    navigate(`/?page=${page + 1}`);
  };

  const prevPage = () => {
    setPage(page - 1);
    navigate(`/?page=${page - 1}`);
  };

  return {
    page,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  };
};
