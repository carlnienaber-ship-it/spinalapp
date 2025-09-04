// Fix: Replaced the failing `/// <reference types="vite/client" />` with a manual definition
// for `import.meta.env` to resolve TypeScript errors across the project.
interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_GOOGLE_SHEET_WEB_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
