import { createFormHook } from '@tanstack/react-form'
import { lazy } from 'react'
import { fieldContext, formContext, useFormContext } from './formContext.tsx'

const TextField = lazy(() => import('./textFields.tsx'))
const NumberField = lazy(() => import('./numberFields.tsx'))
const SelectField = lazy(() => import('./selectFields.tsx'))


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
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
})