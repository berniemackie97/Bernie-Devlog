import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.{test,spec}.{js,ts}"],
    environment: "happy-dom",
    exclude: ["tests/e2e/**"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
