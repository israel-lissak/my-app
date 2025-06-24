import { useForm } from '@tanstack/react-form'
import {type RecipeValuesType} from '../types/RecipeValuesType'
import { RecipeSchema } from '../schemas/RecipeSchema'

const defaultValues: RecipeValuesType = {
    eggs_count: 0,
    kind: "cake", // Default kind, can be "cake" or "pancake"
}
export default function RecipeForm() {

    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: RecipeSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            alert(JSON.stringify(value, null, 2))
        },
    })

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Recipe Form</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className='flex flex-col gap-4'
            >
                <form.Field
                    name="kind"
                    validators={{
                        onBlur: RecipeSchema,
                        onChange: RecipeSchema,
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="kind">Kind:</label>
                                <select
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    id="kind"
                                    name='kind'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value as 'cake' | 'pancake')}
                                >
                                    <option value="cake">Cake</option>
                                    <option value="pancake">Pancake</option>
                                </select>
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

    
            </form>
        </div>
    )
}