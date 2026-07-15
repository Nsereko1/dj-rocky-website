import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getSession() {
  return await getServerSession(authOptions)
}

export function isSuperAdmin(email: string) {
  const superAdmins = process.env.SUPER_ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  return superAdmins.includes(email)
}

export function isVerifierAdmin(email: string) {
  const verifiers = process.env.VERIFIER_ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  return verifiers.includes(email)
}

export function isAnyAdmin(email: string) {
  return isSuperAdmin(email) || isVerifierAdmin(email)
}