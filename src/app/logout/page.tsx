'use client'

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return null;
}