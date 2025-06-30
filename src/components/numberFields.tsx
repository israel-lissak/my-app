import { useFieldContext } from './formContext.tsx'

/**
 * NumberField component for rendering a number input with label and error handling.
 * @param {string} label - The label for the number field.
 * @returns A number input with label and error handling.
 */
export default function NumberField({ label }: { label: string }) {
  const field = useFieldContext<number>()

  return (
    <div >
      <label className='flex flex-row gap-2 items-center'>
        <div>{label}</div>
        <input
          className='border-2 border-gray-300 rounded-md p-2 flex-1'
          type="number"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
        />
      </label>
      {field.state.meta.errors.length > 0 && (
          <em className='text-red-500 text-sm mt-1'>
              {field.state.meta.errors.map((err: any) =>
                  typeof err === 'string' ? err : err.message
              ).join(', ')}
          </em>
      )}
    </div>
  )
}