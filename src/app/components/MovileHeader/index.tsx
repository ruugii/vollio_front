"use client";

import MenuItem from "@/app/ux/MenuItem";
import PrivateHeader from "@/app/ux/PrivateHeader";
import { useState } from "react";

export default function MovileHeader() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <header className="bg-vollio-50 text-vollio-950 py-4 block md:hidden shadow-md">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="text-2xl font-bold">Vollio</div>
        <button className="text-2xl font-bold " onClick={(e) => setOpen(!open)}>
          {"="}
        </button>
      </div>
      {open && (
        <div className="container mx-auto px-4 flex flex-wrap">
          <nav className="container mx-auto flex flex-col">
            <ul className="flex space-x-6 md:space-x-8 flex-col">
              <MenuItem href="/" className="text-lg">
                Inicio
              </MenuItem>
              <MenuItem href="/about" className="text-lg">
                Acerca de nosotros
              </MenuItem>
              <PrivateHeader />
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
