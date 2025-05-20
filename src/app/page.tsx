import Text from "./Text/Text";
import H1_component from "./Text/H1_component";
import H2_component from "./Text/H2_component";

export default function Home() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <H1_component className="mb-4">
        Bienvenido a <span className="text-vollio-900">vollio</span>
      </H1_component>
      <Text>
        La plataforma de gestion de equipos y partidos de voley playa amateur.
      </Text>
      <H2_component className="mt-8 mb-4">
        La comunidad de vollio
      </H2_component>
    </main>
  );
}
