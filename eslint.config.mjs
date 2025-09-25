import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
     rules: {
      "@typescript-eslint/no-unused-vars": "warn", // was 'error'
      "react/no-unescaped-entities": "off",        // disable annoying rule
      "react/jsx-key": "warn",                     // keep as a warning
    },
  },
];

export default eslintConfig;
