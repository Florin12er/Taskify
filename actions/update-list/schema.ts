import { z } from 'zod';

export const UpdateList = z.object({
    title: z.string({
        required_error: 'This field is required',
        invalid_type_error: 'This field must be a string',
    }),
    id: z.string(),
    boardId: z.string()
})
