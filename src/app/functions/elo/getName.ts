export default function getName(elo: number) {
  if (elo < 900) {
    return "Novato de Playa";
  } else if (elo < 1100) {
    return "Sombrilla Activa";
  } else if (elo < 1250) {
    return "Jugador de Orilla";
  } else if (elo < 1400) {
    return "Competidor de Arena";
  } else if (elo < 1550) {
    return "Tormenta de Arena";
  } else if (elo < 1700) {
    return "Amanecer Copacabana";
  } else if (elo < 1850) {
    return "Rey/Reina del Beach Tour";
  } else if (elo < 2000) {
    return "MVP del Arena Clash";
  } else if (elo < 2200) {
    return "Leyenda de la Red";
  } else {
    return "Vollio Immortal";
  }
}
