import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Registrarse</h1>
      <RegisterForm />
    </main>
  )
}