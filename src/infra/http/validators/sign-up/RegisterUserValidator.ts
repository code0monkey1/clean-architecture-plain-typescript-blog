import { ZodError } from "zod";
import { Validation } from "../../interfaces/Validation";
import { UserSchema } from "./RegisterUserZodSchema";

export class RegisterUserValidator implements Validation {
    validate(input: unknown): Error | null {
        try {
            UserSchema.parse(input);
            return null; // Return null if validation is successful
        } catch (error) {
            if (error instanceof ZodError) {
                // Create a new Error object with the Zod error message contents
                const errorMessage = error?.errors
                    ?.map((err) => err.message)
                    .join(", ");
                return new Error(errorMessage);
            } else {
                // Return the original error if it's not a ZodError
                return error as Error;
            }
        }
    }
}
