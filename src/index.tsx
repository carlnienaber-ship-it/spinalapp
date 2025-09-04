import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Fix: Cast `import.meta` to `any` to allow access to `.env` properties without vite/client types.
const auth0Domain = (import.meta as any).env.VITE_AUTH0_DOMAIN;
const auth0ClientId = (import.meta as any).env.VITE_AUTH0_CLIENT_ID;

if (!auth0Domain || !auth0ClientId) {
  throw new Error("Auth0 domain or client ID not configured. Make sure VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID are set in your environment variables.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
