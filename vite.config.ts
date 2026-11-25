import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/peak-sms-staff/",
  plugins: [react(), tailwindcss()],
});
