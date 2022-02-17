import Modal from 'react-modal';
import { Book } from '~/interfaces/book';
import { Close } from '../Icon/Close';

type ModalBookProps = {
  isOpen: boolean;
  handleRequestClose: () => void;
  book?: Book | null;
};

Modal.setAppElement('body');

export const ModalBook = ({
  book,
  isOpen,
  handleRequestClose,
}: ModalBookProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      className="react-modal__content"
      overlayClassName="react-modal__overlay"
    >
      <button className="react-modal__close" onClick={handleRequestClose}>
        <Close />
      </button>
      <div className="book-container">
        <img src={book?.cover || '/cover/placeholder.png'} alt={book?.title} />
        <div className="book-container__content">
          <div className="title">
            <h1 className="--only-2-lines">{book?.title}</h1>
            <p>{book?.authors}</p>
          </div>
          <div className="informations">
            <h3>Informações</h3>
            <p className="info">
              <span>Páginas</span>
              <span className="text-gray">{book?.pageCount}</span>
            </p>
            <p className="info">
              <span>Editora</span>
              <span className="text-gray">{book?.publisher}</span>
            </p>
            <p className="info">
              <span>Publicação</span>
              <span className="text-gray">{book?.published}</span>
            </p>
            <p className="info">
              <span>Idioma</span>
              <span className="text-gray">{book?.language}</span>
            </p>
            <p className="info">
              <span>Título Original</span>
              <span className="text-gray">{book?.title}</span>
            </p>
            <p className="info">
              <span>ISBN-10</span>
              <span className="text-gray">{book?.isbn10}</span>
            </p>
            <p className="info">
              <span>ISBN-13</span>
              <span className="text-gray">{book?.isbn13}</span>
            </p>
          </div>
          <div className="description">
            <h3>Resenha</h3>
            <p>{book?.description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
