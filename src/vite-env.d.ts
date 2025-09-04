// Manually define the types for Vite environment variables to fix issues with `vite/client` type resolution.
// This resolves "Cannot find type definition file for 'vite/client'" and "Property 'env' does not exist on type 'ImportMeta'".
interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_GOOGLE_SHEET_WEB_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
