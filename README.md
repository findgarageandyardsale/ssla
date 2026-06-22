# React + Vite

This template provides a minimal setup to get React working with Vite with HMR and some ESLint rules.

## Environment and secrets

Copy `.env.example` to `.env` and add your real keys from Firebase / Supabase consoles. **Do not commit `.env` or put real secrets in `.env.example`.** See [SECURITY.md](SECURITY.md) for key rotation and API key restrictions.

### Deploying to production (Vite)

Firebase and Supabase values are **injected at build time** (`import.meta.env.VITE_*`). Your hosting provider does **not** read your laptop’s `.env` automatically.

1. In **Vercel / Netlify / Cloudflare Pages / GitHub Actions / etc.**, open **Environment variables** (or **Secrets**).
2. Add every variable you use from `.env.example` that starts with `VITE_` (at minimum `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_PROJECT_ID`, plus the other `VITE_FIREBASE_*` lines for the attendance dashboard).
3. **Redeploy** (new build) so the bundle includes those values.

If you build locally (`npm run build`) and upload `dist/`, run the build **on a machine that has `.env`** present, or pass the same `VITE_*` variables in the shell before `npm run build`.

For **AWS + GoDaddy** (Amplify, S3/CloudFront, or FTP), see [docs/DEPLOY_AWS_GODADDY.md](docs/DEPLOY_AWS_GODADDY.md).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
