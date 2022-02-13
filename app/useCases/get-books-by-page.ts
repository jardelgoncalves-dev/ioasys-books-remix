import { redirect } from 'remix';
import { api } from '~/api/api';
import { Book } from '~/interfaces/book';
import { retryApiCallUnauthorized } from '~/utils/retry-api-call-unauthorized';

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
  page: number;
  totalPages: number;
  items: Array<BookResponse>;
};

export const getBooksByPage = async (page = 1) => {
  try {
    return await retryApiCallUnauthorized<Response>(async () => {
      const { data: response } = await api.get('/books', {
        params: {
          page,
          amount: 12,
        },
      });
      return {
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
      };
    });
  } catch {
    return redirect('/logout');
  }
};
