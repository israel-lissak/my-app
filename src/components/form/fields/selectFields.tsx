import { useFieldContext } from '../formContext.tsx'

/**
 * SelectField component for rendering a select input with options.
 * @param {string} label - The label for the select field.
 * @param {T[]} options - The options to display in the select dropdown.
 * @param {(option: T) => string} getOptionLabel - Function to get the label for each option.
 * @returns A select input with options and error handling.
 */
export default function SelectField<T>({ label, options, getOptionLabel }: { label: string, options: T[], getOptionLabel: (option: T) => string}) {
  const field = useFieldContext<T>()

  return (
    <div>
      <label className='flex flex-row gap-2 items-center w-full'>
        <div>{label}</div>
        <select
          className='border-2 border-gray-300 rounded-md p-2 flex-1'
          value={field.state.value ? String(field.state.value) : ''}
          onChange={(e) => {
            const selected = options.find(
              (option) => String(option) === e.target.value
            )
            field.handleChange(selected as T)
          }}
          >
          {options.map((option, idx) => (
            <option key={idx} value={String(option)}>
              {getOptionLabel(option)}
            </option>
          ))}
        </select>
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