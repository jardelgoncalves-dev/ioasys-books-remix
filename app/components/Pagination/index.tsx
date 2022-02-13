import { ArrowRight } from '../Icon/ArrowRight';

type PaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  totalPage: number;
};

export function Pagination({
  hasNextPage,
  hasPrevPage,
  nextPage,
  page,
  prevPage,
  totalPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <span className="pagination__text">
        Página <strong>{page}</strong> de <strong>{totalPage}</strong>
      </span>
      <button
        type="button"
        className="pagination__button-left"
        aria-label="Página anterior"
        aria-disabled={!hasPrevPage}
        onClick={prevPage}
      >
        <ArrowRight />
      </button>
      <button
        type="button"
        aria-label="Próxima Página"
        aria-disabled={!hasNextPage}
        onClick={nextPage}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
