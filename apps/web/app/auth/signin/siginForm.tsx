'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/submitButton'
import React from 'react'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { signin } from '@/lib/auth'

const SignInForm = () => {
	const [state, action] = useFormState(signin, undefined)

	return (
		<form action={action}>
			<div className="flex flex-col gap-2 w-64">
				{state?.message && (
					<p className="text-sm text-red-500">{state.message}</p>
				)}
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						placeholder="m@example.com"
						type="email"
						required
					/>
					{state?.error?.email && (
						<p className="text-sm text-red-500">{state.error.email}</p>
					)}
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" name="password" required />
					{state?.error?.password && (
						<p className="text-sm text-red-500">{state.error.password}</p>
					)}
				</div>

				<Link className="text-sm underline" href="/auth/forgot-password">
					Forgot your password?
				</Link>

				<SubmitButton>Sign In</SubmitButton>

				<div className="flex justify-between text-sm">
					<p>Don't have an account?</p>
					<Link className="text-sm underline" href="/auth/signup">
						Sign Up
					</Link>
				</div>
			</div>
		</form>
	)
}

export default SignInForm
