import { z } from 'zod';

export const todoQuerySchema = z.object({
    id: z.string().uuid(),
});

export type todoQueryArgs = z.infer<typeof todoQuerySchema>;
