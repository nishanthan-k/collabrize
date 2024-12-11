import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordSchema = z.string()
                               .min(7, { message: 'Password must contain at least 7 characters' })
                               .refine((val) => /[a-zA-Z]/.test(val), { message: 'Password must contain atleast one alphabet' })
                               .refine((val) => /[0-9]/.test(val), { message: 'Password must contain atleast one number' })
                               .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'Password must contain one special character' })

export const emailSchema = z.string()
                            .email()
                            .regex(emailRegex, { message: 'Invalid email format' })
                            .min(1, { message: 'Email is required' })
                            .refine((val) => val.trim().length > 0, { message: 'Email is required' })

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
})
.refine((val) => val.password === val.confirmPassword, { message: 'Passwords should match', path: ["confirmPassword"] })