import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é um campo obrigatório' })
    .email({ message: 'O campo deve conter um e-mail válido' }),
  password: z
    .string({ required_error: 'Senha é um campo obrigatório' })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});
