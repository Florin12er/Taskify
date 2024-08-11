import { z } from 'zod';

export const CreateList = z.object({
    title: z.string({
        required_error: 'This field is required',
        invalid_type_error: 'This field must be a string',
    }),
    boardId: z.string()
})
