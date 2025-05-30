'use client'
import React, { PropsWithChildren } from 'react'
import { Button } from './button'
import { useFormState } from 'react-dom'

const SubmitButton = ({ children }: PropsWithChildren) => {
	const { pending } = useFormState()
	return (
		<Button type="submit" aria-disabled={pending} className="w-full mt-2">
			{pending ? 'Submitting...' : children}
		</Button>
	)
}

export default SubmitButton
