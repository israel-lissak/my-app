import {type SliceValuesType} from '../types/SliceValuesType'
import { SliceSchema } from '../schemas/SliceSchema'
import { useAppForm } from './form'

const defaultValues: SliceValuesType = {
    duration: 0,
    power: 0,
    variation: 'single', // Default variation, can be 'single', 'multi' or 'cyclic'
    recipes: []
}
export default function SliceForm() {
    

    const form = useAppForm({
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
                <form.AppField
                    name="duration"
                    validators={{
                        onBlur: SliceSchema.shape.duration,
                        onChange: SliceSchema.shape.duration,
                    }}
                    children={(field) => <field.NumberField label="Duration" />}
                />

                <form.AppField
                    name="power"
                    validators={{
                        onBlur: SliceSchema.shape.power,
                        onChange: SliceSchema.shape.power,
                    }}
                    children={(field) => <field.NumberField label="Power" />}
                />

                <form.AppField
                    name='variation'
                    validators={{
                        onBlur: SliceSchema.shape.variation,
                        onChange: SliceSchema.shape.variation,
                    }}
                    children={(field) => <field.SelectField
                        label="Variation:"
                        options={['single', 'multi', 'cyclic']}
                        getOptionLabel={(option) => option as string}
                    />}
                />

                <form.AppForm>
                    <form.SubscribeButton label="Submit"/>
                </form.AppForm>

                <button
                    onClick={(e) => {
                            e.preventDefault,
                            e.stopPropagation,
                            alert(JSON.stringify(form.state.values, null, 2))
                        }
                    }
                    type='button'
                    className='bg-green-300 text-white p-2 rounded-md'
                >
                    Log
                </button>
            </form>
        </div>
    )
}