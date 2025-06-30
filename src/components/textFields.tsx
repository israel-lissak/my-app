import { useFieldContext } from './formContext.tsx'

/**
 * TextField component for rendering a text input with label and error handling.
 * @param {string} label - The label for the text field.
 * @returns A text input with label and error handling.
 */
export default function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  return (
    <div>
      <label>
        <div>{label}</div>
        <input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
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