'use server'

import { NextResponse } from 'next/server'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type Session = {
	user: {
		id: string
		name: string
	}
}

const secretKey = process.env.SESSION_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey)

export async function POST(req: Request) {
	const session = await new SignJWT({
		user: { id: '1', name: 'Ali' },
	})
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('7d')
		.sign(encodedKey)

	const response = NextResponse.json({ success: true })

	response.cookies.set('session', session, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
	})

	return response
}

export async function getSession(): Promise<Session | null> {
	const sessionCookie = cookies().get('session')?.value

	if (!sessionCookie) return null

	try {
		const { payload } = await jwtVerify(sessionCookie, encodedKey, {
			algorithms: ['HS256'],
		})

		return payload as Session
	} catch (err) {
		console.error('Failed to verify the session:', err)
		redirect('/auth/signin')
	}
}
