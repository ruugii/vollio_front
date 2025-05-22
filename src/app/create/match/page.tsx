import CreateMatch from "../../components/CreateMatch";
import H1_component from "../../Text/H1_component";
import Text from "../../Text/Text";
import Input from "../../ux/Input";

export default function createMatchPrice() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <H1_component className="mb-4">
        CREAR PARTIDO
      </H1_component>
      <Text className="mb-4">
        Aquí puedes crear un nuevo partido.
      </Text>
      <CreateMatch />
    </main>
  )
}