import { z } from 'zod';

export const createTeamSchema = z.object({
  userId: z.number({
            required_error: 'User id is required',
            invalid_type_error: 'User id must be a number'
          }),
  orgId: z.number({
            required_error: 'Org id is required',
            invalid_type_error: 'Org id must be a number'
          }),
  teamName: z
             .string({
                required_error: 'Team name is required',
                invalid_type_error: 'Team name only be with alphanumeric characters'
              })
              .min(1, 'Team name is required'),
  teamMembers: z.array(
                  z.number({
                    required_error: 'At least one member is required',
                    invalid_type_error: 'Team members must be numbers'
                  }),
                  {
                    required_error: 'Team members is required',
                    invalid_type_error: 'Team members must be in array format'
                  }
                )
                .min(1, 'At least one member is required'),
})