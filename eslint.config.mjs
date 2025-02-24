// eslint.config.mjs
export default [
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];


// // eslint.config.mjs
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// export default [
//   ...compat.extends("next/core-web-vitals"),
//   {
//     rules: {
//       "react/no-unescaped-entities": "off",
//       "react/jsx-key": "off",
//       "@next/next/no-img-element": "off",
//       "react-hooks/exhaustive-deps": "off",
//       "react/display-name": "off",
//       "@next/next/no-page-custom-font": "off",
//       "react/no-unknown-property": "off",
//       "@next/next/no-html-link-for-pages": "off",
//       "jsx-a11y/alt-text": "off",
//       "react/jsx-no-target-blank": "off",
//       // Disable all possible Next.js and React rules
//       "@next/next/no-sync-scripts": "off",
//       "@next/next/no-script-component-in-head": "off",
//       "@next/next/google-font-display": "off",
//       "@next/next/no-head-import-in-document": "off",
//       "@next/next/no-title-in-document-head": "off",
//       "react/prop-types": "off",
//       "react/react-in-jsx-scope": "off",
//       "react/no-children-prop": "off",
//       "react/no-danger": "off",
//       "react/no-deprecated": "off",
//       "react/no-direct-mutation-state": "off",
//       "react/jsx-no-duplicate-props": "off",
//       "react/jsx-pascal-case": "off"
//     }
//   }
// ];