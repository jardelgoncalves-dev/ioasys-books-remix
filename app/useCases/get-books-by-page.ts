import { redirect } from 'remix';
import { api } from '~/api/api';
import { Book } from '~/interfaces/book';
import { USER_LOGGED } from '~/utils/constants';
import { renewTokenApiCallUnauthorized } from '~/utils/renew-token-api-call-unauthorized';
import { getSession } from '~/utils/session';

type BookResponse = {
  authors: Array<string>;
  title: string;
  description: string;
  pageCount: number;
  category: string;
  imageUrl: string;
  language: string;
  isbn10: string;
  isbn13: string;
  publisher: string;
  published: number;
  id: string;
};

type Response = {
  user: {
    username: string;
  };
  books: {
    page: number;
    totalPages: number;
    items: Array<BookResponse>;
  };
};

export const getBooksByPage = async (request: Request, page = 1) => {
  const callApi = async () => {
    const { data: response } = await api.get('/books', {
      params: {
        page,
        amount: 12,
      },
    });

    const session = await getSession(request.headers.get('Cookie'));
    const username = session.get(USER_LOGGED);

    return {
      user: {
        username,
      },
      books: {
        page: response.page,
        totalPages: Math.ceil(response.totalPages),
        items: response.data.map(
          (item: BookResponse): Book => ({
            id: item.id,
            title: item.title,
            authors: item.authors.join(', '),
            cover: item.imageUrl,
            publisher: item.publisher,
            published: item.published,
            pageCount: item.pageCount,
          }),
        ),
      },
    };
  };

  try {
    return await renewTokenApiCallUnauthorized<Response>(
      callApi,
      request,
      `/?page=${page}`,
      '/login',
    );
  } catch {
    return redirect('/logout');
  }
};
