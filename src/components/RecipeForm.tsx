import type { RecipeValuesType } from '@/types/RecipeValuesType'
import { useFieldContext } from './formContext'

export default function RecipeForm() {

      const field = useFieldContext<RecipeValuesType["kind"]>()

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Recipe Form</h2>
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
                            onChange={(e) => field.handleChange(e.target.value as RecipeValuesType['kind'])}
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
        </div>
    )
}