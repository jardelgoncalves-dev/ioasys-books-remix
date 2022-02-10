import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
