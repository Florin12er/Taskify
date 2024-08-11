import { z } from 'zod';

export const CreateBoardSchema = z.object({
    title: z.string({
        required_error: 'This field is required',
        invalid_type_error: 'This field must be a string',
    }).min(3, { message: "title is too short" }),
    image: z.string({
        required_error: 'This field is required',
        invalid_type_error: 'This field must be a string',
    })
})

