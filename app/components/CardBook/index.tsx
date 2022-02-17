import type { Book } from '~/interfaces/book';

type CardBookProps = Book & {
  onClick?: (book: Book) => void;
};

export const CardBook = ({ onClick, ...book }: CardBookProps) => {
  return (
    <button type="button" className="card-book" onClick={() => onClick?.(book)}>
      <img src={book.cover ?? '/cover/placeholder.png'} alt={book.title} />
      <div className="card-book__content">
        <h2 className="--ellipsis">{book.title}</h2>
        <h3 className="--ellipsis">{book.authors}</h3>
        <p className="card-book__content__info --ellipsis">
          <span>{book.pageCount} páginas</span>
          <span>{book.publisher}</span>
          <span>Publicado em {book.published}</span>
        </p>
      </div>
    </button>
  );
};
