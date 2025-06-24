import { useForm } from '@tanstack/react-form'
import {type SliceValuesType} from '../types/SliceValuesType'
import { SliceSchema } from '../schemas/SliceSchema'
import RecipeForm from './RecipeForm'

const defaultValues: SliceValuesType = {
    duration: 0,
    power: 0,
    variation: 'single', // Default variation, can be 'single', 'multi' or 'cyclic'
    recipes: []
}
export default function SliceForm() {

    const form = useForm({
        defaultValues: defaultValues,
        validators: {
            onSubmit: SliceSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            alert(JSON.stringify(value, null, 2))
        },
    })

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Slice Form</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className='flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-md'
            >
                <form.Field
                    name="duration"
                    validators={{
                        onBlur: SliceSchema.shape.duration,
                        onChange: SliceSchema.shape.duration,
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="duration">Duration:</label>
                                <input
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    type="number"
                                    id="duration"
                                    name='duration'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
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
                    name="power"
                    validators={{
                        onBlur: SliceSchema.shape.power,
                        onChange: SliceSchema.shape.power,
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="power">Power:</label>
                                <input
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    type="number"
                                    id="power"
                                    name='power'
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
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
                    name="variation"
                    validators={{
                        onBlur: SliceSchema.shape.variation,
                        onChange: SliceSchema.shape.variation,
                    }}
                >
                    {(field) => (
                        <div className='flex gap-2 items-center flex-col'>
                            <div className='flex gap-2 items-center w-full'>
                                <label htmlFor="variation">Variation:</label>
                                <select
                                    className='border-2 border-gray-300 rounded-md p-2 flex-1'
                                    id="variation"
                                    name='variation'
                                    defaultValue={ field.state.value || '' }
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onMouseLeave={() => {
                                        if (field.state.meta.isDirty) field.handleBlur()
                                    }}
                                    onChange={(e) => field.handleChange(e.target.value as SliceValuesType['variation'])}
                                >
                                    <option value="single">Single</option>
                                    <option value="multi">Multi</option>
                                    <option value="cyclic">Cyclic</option>
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

                {/* Recipes fields is changing based on the variation */}
                <RecipeForm/>

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