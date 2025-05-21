import CreateTeam from "../components/CreateTeam";
import H1_component from "../Text/H1_component";
import Text from "../Text/Text";

export default function CreateTeamPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <H1_component className="mb-4">Crear Equipo</H1_component>
      <Text className="mb-4">
        Aquí puedes crear un nuevo equipo.
      </Text>
      <CreateTeam />
    </main>
  );
}