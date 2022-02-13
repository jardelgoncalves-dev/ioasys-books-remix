import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { HandleError } from '~/interfaces/handle-error';

export const handleError = (error: unknown | ZodError | AxiosError) => {
  if (error instanceof ZodError) {
    return error.issues.reduce<HandleError>((acc, item) => {
      const key = item?.path?.[0];
      if (key) acc[key] = item.message;
      return acc;
    }, {});
  }
  if ((error as AxiosError).response) {
    return {
      requestError: {
        code: (error as AxiosError)?.response?.status,
        message: (error as AxiosError)?.response?.data?.errors?.message,
      },
    };
  }

  return {
    requestError: {
      code: 500,
      message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    },
  };
};
