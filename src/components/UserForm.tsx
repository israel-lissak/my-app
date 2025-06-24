import { useForm } from '@tanstack/react-form'
import {type FormValuesType} from '../types/FormValuesType'
import { UserFormValidationSchema, createOnChangeValidator, validateConfirmPassword } from '../schemas/UserFormValidationSchema'

const defaultValues: FormValuesType = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}
export default function UserForm() {

    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: UserFormValidationSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            alert(JSON.stringify(value, null, 2))
        },
    })

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>User Form</h2>
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
                        onBlur: UserFormValidationSchema.shape.name,
                        onChange: createOnChangeValidator(UserFormValidationSchema.shape.name),
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
                        onBlur: UserFormValidationSchema.shape.email,
                        onChange: createOnChangeValidator(UserFormValidationSchema.shape.email),
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
                        onBlur: UserFormValidationSchema.shape.password,
                        onChange: createOnChangeValidator(UserFormValidationSchema.shape.password),
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