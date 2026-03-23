# React + Vite

This template provides a minimal setup to get React working with Vite with HMR and some ESLint rules.

## Environment and secrets

Copy `.env.example` to `.env` and add your real keys from Firebase / Supabase consoles. **Do not commit `.env` or put real secrets in `.env.example`.** See [SECURITY.md](SECURITY.md) for key rotation and API key restrictions.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
