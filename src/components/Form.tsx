import { useForm } from '@tanstack/react-form'
import { z } from 'zod/v4'


export default function Form() {

    type FormValuesType = {
        name: string
        email: string
        password: string
        confirmPassword: string
    }

    const ZodSchema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(3, { message: 'Password must be at least 3 characters long' }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    })

    const createOnChangeValidator = (schema: z.ZodType) => ({ value, fieldApi }: { value: any, fieldApi: any }) => {
        if (fieldApi.state.meta.isTouched) {
            const result = schema.safeParse(value);
            if (!result.success) {
                return result.error.flatten().formErrors[0];
            }
        }
        return undefined;
    };

    const validateConfirmPassword = ({ value, fieldApi }: { value: any, fieldApi: any }) => {
        // First, check if the field has been touched
        if (!fieldApi.state.meta.isTouched) {
            return undefined;
        }

        // Then, validate against the Zod schema for its own rules
        const passwordCheck = ZodSchema.shape.confirmPassword.safeParse(value)
        if (!passwordCheck.success) {
            return passwordCheck.error.flatten().formErrors[0]
        }
        
        // Finally, check for cross-field validation
        if (fieldApi.form.getFieldValue('password') !== value) {
            return 'Passwords do not match'
        }
        return undefined
    };

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        } as FormValuesType,
        validators: {
            onSubmit: ZodSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            alert(JSON.stringify(value, null, 2))
        },
    })

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className='flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-md'
            >
                <form.Field
                    name="name"
                    validators={{
                        onBlur: ZodSchema.shape.name,
                        onChange: createOnChangeValidator(ZodSchema.shape.name),
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="name">Name:</label>
                                <input
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    type="text"
                                    id="name"
                                    name='name'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <em className='text-red-500 text-sm mt-1'>
                                    {field.state.meta.errors.map((err: any) =>
                                        typeof err === 'string' ? err : err.message
                                    ).join(', ')}
                                </em>
                            )}
                        </div>
                    )}
                </form.Field>
                <form.Field
                    name="email"
                    validators={{
                        onBlur: ZodSchema.shape.email,
                        onChange: createOnChangeValidator(ZodSchema.shape.email),
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="email">Email:</label>
                                <input
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    type="email"
                                    id="email"
                                    name='email'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <em className='text-red-500 text-sm mt-1'>
                                    {field.state.meta.errors.map((err: any) =>
                                        typeof err === 'string' ? err : err.message
                                    ).join(', ')}
                                </em>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="password"
                    validators={{
                        onBlur: ZodSchema.shape.password,
                        onChange: createOnChangeValidator(ZodSchema.shape.password),
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="password">Password:</label>
                                <input
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    type="password"
                                    id="password"
                                    name='password'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value)
                                        field.form.validateField('confirmPassword', 'change')
                                    }}
                                />
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <em className='text-red-500 text-sm mt-1'>
                                    {field.state.meta.errors.map((err: any) =>
                                        typeof err === 'string' ? err : err.message
                                    ).join(', ')}
                                </em>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="confirmPassword"
                    validators={{
                        onBlur: validateConfirmPassword,
                        onChange: validateConfirmPassword,
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    type="password"
                                    id="confirmPassword"
                                    name='confirmPassword'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <em className='text-red-500 text-sm mt-1'>
                                    {field.state.meta.errors.map((err: any) =>
                                        typeof err === 'string' ? err : err.message
                                    ).join(', ')}
                                </em>
                            )}
                        </div>
                    )}
                </form.Field>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <button
                            className='bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500'
                            type="submit"
                            disabled={!canSubmit}
                        >
                            {isSubmitting ? '...' : 'Submit'}
                        </button>
                    )}
                />
            </form>
        </div>
    )
}