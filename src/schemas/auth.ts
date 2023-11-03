import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é um campo obrigatório' })
    .email({ message: 'O campo deve conter um e-mail válido' }),
  password: z
    .string({ required_error: 'Senha é um campo obrigatório' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});
export const signUpSchema = z
  .object({
    name: z.string({ required_error: 'Nome é um campo obrigatório' }),
    email: z
      .string({ required_error: 'E-mail é um campo obrigatório' })
      .email({ message: 'O campo deve conter um e-mail válido' }),
    password: z
      .string({ required_error: 'Senha é um campo obrigatório' })
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    passwordConfirm: z
      .string({ required_error: 'Confirmação de senha é um campo obrigatório' })
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['confirmNewPassword'],
    message: 'As senhas não correspondem',
  });
