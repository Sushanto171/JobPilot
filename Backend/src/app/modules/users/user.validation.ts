import { z } from "zod";

export class UserValidation {
  createSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
}

export type CreateUserInput = z.infer<UserValidation["createSchema"]>;
