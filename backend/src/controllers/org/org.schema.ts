import { z } from 'zod';
import { emailSchema } from '../../lib/global/schemas/auth.schema';

export const createOrgSchema = z.object({
  id: z.number({
              required_error: 'Owner is required',
              invalid_type_error: 'Invalid Owner'
            }),
  orgName: z
            .string({
              required_error: 'Organization Name is required',
              invalid_type_error: 'Invalid Organization Name'
            })
            .min(1, 'Organization Name is required'),
})

// export const createOrgSchema = z.object({
//   id: z.number({
//               required_error: 'Owner is required',
//               invalid_type_error: 'Invalid Owner'
//             }),
//   orgName: z
//             .string({
//               required_error: 'Organization Name is required',
//               invalid_type_error: 'Invalid Organization Name'
//             })
//             .min(1, 'Organization Name is required'),
//   orgMember: emailSchema
// })