import { useFieldContext } from '../formContext.tsx'

/**
 * CheckboxField component for rendering a checkbox input with label and error handling.
 * @param {string} label - The label for the checkbox field.
 * @returns A checkbox input with label and error handling.
 */
export default function CheckboxField({ label }: { label: string }) {
  const field = useFieldContext<boolean>()

  return (
    <div>
      <label className='flex flex-row gap-2 items-center'>
        <div>{label}</div>
        <input
          className='border-2 border-gray-300 rounded-md p-2 h-8 w-8'
          type="checkbox"
          checked={field.state.value}
          onChange={(e) => field.handleChange(e.target.checked)}
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