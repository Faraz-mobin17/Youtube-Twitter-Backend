import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    rules: {
      semi: "error",
      "prefer-const": "warn",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    ignores: [
      "dist/**",
      "node_modules/**",
      "bin/**",
      "build/**",
      ".prettierrc",
    ],
  },
];
