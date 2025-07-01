import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext, useFormContext } from './formContext.tsx'

import CheckboxField from './fields/checkboxField.tsx'
import NumberField from './fields/numberFields.tsx'
import SelectField from './fields/selectFields.tsx'
import TextField from './fields/textFields.tsx'



function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <button
          className='bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500'
          type="submit"
          disabled={!canSubmit}
        >
          {isSubmitting ? '...' : label}
        </button>
      )}
    />
  )
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    SelectField,
    CheckboxField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})