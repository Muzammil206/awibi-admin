import { SimpleHeader } from "@/components/simple-header"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
    </div>
  )
}
