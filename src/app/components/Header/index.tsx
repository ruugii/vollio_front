import MenuItem from "@/app/ux/MenuItem";
import PrivateHeader from "@/app/ux/PrivateHeader";

export default function Header() {
  return (
    <header className="bg-vollio-white text-vollio-dark py-4 hidden md:block shadow-md">
      <nav className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="text-2xl font-bold">Vollio</div>
        <ul className="flex space-x-6 md:space-x-8">
          <MenuItem href="/" className="text-lg">
            Inicio
          </MenuItem>
          <PrivateHeader />
        </ul>
      </nav>
    </header>
  );
}
