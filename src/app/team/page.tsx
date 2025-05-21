import TeamInfo from "../components/TeamInfo";
import H1_component from "../Text/H1_component";

export default function TeamPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <H1_component className="mb-4">Tu equipo</H1_component>
      <TeamInfo />
    </main>
  );
}