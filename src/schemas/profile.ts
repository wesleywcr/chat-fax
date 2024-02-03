import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string({ required_error: 'Name is a required field' }),
  username: z
    .string({ required_error: 'Username is a required field' })
    .min(3, 'Enter at least 3 characters'),
  phone: z.string({ required_error: 'Telephone is a required field' }),
  dateOfBirth: z.string({
    required_error: 'Date of birth is a required field',
  }),
});
