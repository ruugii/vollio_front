import LoginForm from "../components/LoginForm";
import H1_component from "../Text/H1_component";

export default function LoginPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <H1_component className="mb-4">
        Iniciar Sesión
      </H1_component>
      <LoginForm />
    </main>
  );
}
