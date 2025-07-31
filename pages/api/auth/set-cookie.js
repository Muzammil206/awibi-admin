import { serialize } from 'cookie'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { token } = req.body
  if (!token) {
    return res.status(400).json({ message: 'Token required' })
  }
  // Set cookie for 7 days
  res.setHeader('Set-Cookie', serialize('user', token, {
    httpOnly: false, // Set to true for extra security if you don't need JS access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  }))
  res.status(200).json({ message: 'Cookie set' })
}
