import { z } from 'zod/v4'

export const UserFormValidationSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
})

export const createOnChangeValidator = (schema: z.ZodType) => ({ value, fieldApi }: { value: any, fieldApi: any }) => {
    if (fieldApi.state.meta.isTouched) {
        const result = schema.safeParse(value);
        if (!result.success) {
            return result.error.flatten().formErrors[0];
        }
    }
    return undefined;
};

export const validateConfirmPassword = ({ value, fieldApi }: { value: any, fieldApi: any }) => {
    // First, check if the field has been touched
    if (!fieldApi.state.meta.isTouched) {
        return undefined;
    }

    // Then, validate against the Zod schema for its own rules
    const passwordCheck = UserFormValidationSchema.shape.confirmPassword.safeParse(value)
    if (!passwordCheck.success) {
        return passwordCheck.error.flatten().formErrors[0]
    }

    // Finally, check for cross-field validation
    if (fieldApi.form.getFieldValue('password') !== value) {
        return 'Passwords do not match'
    }
    return undefined
};