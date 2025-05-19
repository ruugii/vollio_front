import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Iniciar Sesión</h1>
      <LoginForm />
    </main>
  );
}
