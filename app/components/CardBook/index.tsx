import type { Book } from '~/interfaces/book';

type CardBookProps = Book & {
  onClick?: (book: Book) => void;
};

export const CardBook = ({
  title,
  cover,
  authors,
  totalPages,
  publisher,
  published,
  onClick,
}: CardBookProps) => {
  return (
    <button
      type="button"
      className="card-book"
      onClick={() =>
        onClick?.({
          title,
          cover,
          authors,
          totalPages,
          publisher,
          published,
        })
      }
    >
      <img src={cover ?? '/cover/placeholder.png'} alt={title} />
      <div className="card-book__content">
        <h2 className="--ellipsis">{title}</h2>
        <h3 className="--ellipsis">{authors}</h3>
        <p className="card-book__content__info --ellipsis">
          <span>{totalPages} páginas</span>
          <span>{publisher}</span>
          <span>Publicado em {published}</span>
        </p>
      </div>
    </button>
  );
};
