import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is a required field' })
    .email({ message: 'The field must contain a valid email address.' }),
  password: z
    .string({ required_error: 'Password is a required field' })
    .min(8, { message: 'The password must be at least 8 characters long' }),
});
export const signUpSchema = z
  .object({
    name: z.string({ required_error: 'Name is a required field' }),
    email: z
      .string({ required_error: 'Email is a required field' })
      .email({ message: 'The field must contain a valid email address.' }),
    username: z
      .string({ required_error: 'Username is a required field' })
      .min(3, 'Enter at least 3 characters'),
    phone: z.string({ required_error: 'Phone is a required field' }),
    dateOfBirth: z.string({
      required_error: 'Date of birth is a required field',
    }),
    password: z
      .string({ required_error: 'Password is a required field' })
      .min(8, { message: 'The password must be at least 8 characters long' }),
    passwordConfirm: z
      .string({ required_error: 'Password confirmation is a required field' })
      .min(8, { message: 'The password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  });
