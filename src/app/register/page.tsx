import RegisterForm from "../components/RegisterForm";
import H1_component from "../Text/H1_component";

export default function RegisterPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <H1_component className="mb-4">
        Registrarse
      </H1_component>
      <RegisterForm />
    </main>
  )
}