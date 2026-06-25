// ESLint flat config voor de hele monorepo (ESLint 9).
// - TypeScript (typescript-eslint, niet type-aware → snel, geen project-setup)
// - Next.js + react-hooks + jsx-a11y voor apps/web
// - unused-imports: ongebruikte imports = error, ongebruikte vars = warn
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/*.config.*",
      "**/next-env.d.ts",
      "packages/db/prisma/migrations/**",
      "**/generated/**",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "unused-imports": unusedImports },
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      // TypeScript-compiler dekt undefined-vars af:
      "no-undef": "off",
      // Stijl/strengheid bewust soepel; correctheid blijft hard:
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
    },
  },

  // Next.js-app: extra regels voor React-hooks, toegankelijkheid en Next.
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/label-has-associated-control": "off",
      // App Router (geen pages/-map):
      "@next/next/no-html-link-for-pages": "off",
    },
  },
);
