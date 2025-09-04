// This file provides manual type definitions for Vite's environment variables.
// The standard /// <reference types="vite/client" /> can fail in some CI/CD
// build environments. This self-contained definition is a robust workaround
// to ensure `import.meta.env` is correctly typed during the build process.

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_GOOGLE_SHEET_WEB_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
