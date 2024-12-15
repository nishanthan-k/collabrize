import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordSchema = z.string()
                               .min(7, { message: 'Password must contain at least 7 characters' })
                               .optional()
                               .refine((val) => val && val?.trim().length > 0, { message: 'Password is required' })
                               .refine((val) => val && /[a-zA-Z]/.test(val), { message: 'Password must contain atleast one alphabet' })
                               .refine((val) => val && /[0-9]/.test(val), { message: 'Password must contain atleast one number' })
                               .refine((val) => val && /[!@#$%^&*(),.?":{}|<>]/.test(val), { message: 'Password must contain one special character' })

export const confirmPasswordSchema = z.string()
                                      .optional()
                                      .refine((val) => val && val.trim().length > 0, { message: 'Confirm Password is required' })
                                      

export const emailSchema = z.string()
                            .email()
                            .regex(emailRegex, { message: 'Invalid email format' })
                            .optional()
                            .refine((val) => val && val.trim().length > 0, { message: 'Email is required' })
                            .refine((val) => val !== undefined && val !== null, { message: 'Email is required' });

export const nameSchema = z.string().optional().refine((val) => val && val.trim().length > 0, { message: 'Name is required' })

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
})
.refine((val) => val.password === val.confirmPassword, { message: 'Passwords should match', path: ["confirmPassword"] })

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})