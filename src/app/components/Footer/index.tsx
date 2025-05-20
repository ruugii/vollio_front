import MenuItem from "@/app/ux/MenuItem";

export default function Footer() {
  return (
    <footer className="bg-vollio-50 text-vollio-950 py-4 hidden md:block shadow-md">
      <nav className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <ul className="flex space-x-6 md:space-x-8">
          <MenuItem href="/" className="text-lg">
            Inicio
          </MenuItem>
        </ul>
      </nav>
    </footer>
  );
}
