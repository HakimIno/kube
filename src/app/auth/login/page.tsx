import Login from '../Login'
import AuthGuard from '@/components/AuthGuard'

export default function LoginPage() {
  return (
    <AuthGuard>
      <Login />
    </AuthGuard>
  )
} 