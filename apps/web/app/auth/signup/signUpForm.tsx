'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/ui/submitButton'
import { useFormState } from 'react-dom'
import { signUp } from '@/lib/auth'

const SignUpForm = () => {
	const [state, action] = useFormState(signUp, undefined)

	return (
		<form action={action}>
			<div className="flex flex-col gap-4">
				{state?.message && (
					<p className="text-sm text-red-500">{state.message}</p>
				)}

				{/* Name */}
				<div>
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" placeholder="John Doe" />
					{state?.error?.name && (
						<p className="text-sm text-red-500">{state.error.name[0]}</p>
					)}
				</div>

				{/* Email */}
				<div>
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" placeholder="john@example.com" />
					{state?.error?.email && (
						<p className="text-sm text-red-500">{state.error.email[0]}</p>
					)}
				</div>

				{/* Password */}
				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" />
					{state?.error?.password && (
						<div className="text-sm text-red-500 space-y-1 mt-1">
							<p>Password must:</p>
							<ul className="list-disc list-inside">
								{state.error.password.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<SubmitButton>Sign Up</SubmitButton>
			</div>
		</form>
	)
}

export default SignUpForm
