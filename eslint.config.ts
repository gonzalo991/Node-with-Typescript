import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { Linter } from "eslint";

export default tseslint.config(
    // 1. Configuración base de JS (reeemplaza eslint:recommended)
    js.configs.recommended,

    // 2. Configuración de TS (reemplaza plugin: @typescript-eslint/recommended)
    ...tseslint.configs.recommended,

    // 3. Configuración global de reglas y entorno
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                process: "readonly",
                console: "readonly",
            },
        },
        rules: {
            "no-console": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { "argsIgnorePattern": "^_" },
            ],
        },
    },

    // 4. Prettier (debe ir al final para que mande en el estilo)
    eslintConfigPrettier,

    // 5. Ignorar archivos (reemplaza .eslintignore)
    {
        ignores: ["dist/**", "node_modules/**"],
    }
) as Linter.Config[];