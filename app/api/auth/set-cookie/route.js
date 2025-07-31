import { NextResponse } from 'next/server'

export async function POST(request) {
  const { token } = await request.json()
  if (!token) {
    return NextResponse.json({ message: 'Token required' }, { status: 400 })
  }
  const response = NextResponse.json({ message: 'Cookie set' })
  response.cookies.set('user', token, {
    httpOnly: false, // Set to true for extra security if you don't need JS access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
