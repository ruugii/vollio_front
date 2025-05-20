export default function AboutPage() {
  return (
    <main className="container mx-auto h-full px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Acerca de nosotros</h1>
      <p className="text-lg">
        Vollio es una plataforma diseñada para facilitar la gestión de equipos y
        partidos de vóley playa amateur. Nuestro objetivo es crear una comunidad
        donde los jugadores puedan conocerse, organizar partidos y disfrutar del
        vóley como se merece.
      </p>
      <p className="text-lg mt-4">
        En Vollio creemos que el vóley playa es más que un deporte: es una forma
        de vida. Nos apasiona fomentar la camaradería y el espíritu deportivo, y
        por eso hemos creado una plataforma que hace que organizar partidos sea
        sencillo y divertido.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Nuestra misión</h2>
      <p className="text-lg">
        Nuestra misión es proporcionar una herramienta intuitiva y accesible
        para todos los amantes del vóley playa. Queremos que cualquier jugador,
        sin importar su nivel, pueda encontrar compañeros, organizar partidos y
        disfrutar del deporte al aire libre.
      </p>
      <p className="text-lg mt-4">
        Aparte, con nuestro sistema de puntuación conseguimos que los partidos
        sean equilibrados: jugarás contra rivales con un nivel similar al tuyo,
        lo que garantiza una experiencia justa y competitiva.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Cómo funciona el sistema de puntuación
      </h2>
      <p className="text-lg">
        El sistema de puntuación de Vollio se basa en un sistema de{" "}
        <i>ELO híbrido</i>, en el que cada jugador tiene una puntuación que
        refleja su nivel de habilidad. Esta puntuación se ajusta en función del
        resultado de cada partido.
      </p>
      <p className="text-lg mt-4">
        Cuando un partido se juega, se calcula el ELO promedio de cada equipo a
        partir de los ELO individuales de sus jugadores. A partir de ese
        promedio, se determina qué equipo es el favorito y cuánto puede ganar o
        perder cada jugador según el resultado.
      </p>
      <p className="text-lg mt-4">
        Por ejemplo, si un jugador con un ELO de 1000 gana a un equipo cuyo
        promedio era superior, ganará más puntos que si hubiera vencido a un
        equipo más débil. Y si pierde contra un equipo con menor ELO, perderá
        más puntos.
      </p>
      <p className="text-lg mt-4">
        Este enfoque permite una progresión justa y personalizada, incluso si
        los jugadores cambian de equipo, ya que el ELO está vinculado a cada
        jugador y no al equipo en sí.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Quiénes somos</h2>
      <p className="text-lg">
        El equipo de Vollio está formado por dos personas que aman el deporte y
        comparten la visión de mejorar la forma en que los jugadores de vóley
        playa se conectan y compiten.
      </p>
    </main>
  );
}
