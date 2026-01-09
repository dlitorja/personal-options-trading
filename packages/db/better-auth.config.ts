import { defineConfig } from "@better-auth/cli";

export default defineConfig({
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL,
  },
});
