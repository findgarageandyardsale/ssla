# Deploy with AWS + GoDaddy domain

Your site is a **Vite static app**. Firebase (`VITE_FIREBASE_*`) values are **baked in at `npm run build`** — they are not read from the server at runtime.

- **GoDaddy**: domain and **DNS** (point the domain to AWS).
- **AWS**: **hosting** the built files + **build environment** where env vars must be set (or build locally and upload `dist/`).

---

## Option A — AWS Amplify Hosting (recommended)

Amplify can build from Git and inject env vars.

1. **AWS Console** → **Amplify** → **Create new app** → Host web app → connect GitHub/GitLab/Bitbucket (or deploy without Git by uploading).
2. **Build settings**: use defaults or set:
   - Build command: `npm run ci` or `npm install && npm run build`
   - Output directory: `dist`
3. **Environment variables** (Amplify → App → **Hosting** → **Environment variables**):
   - Add every `VITE_*` variable from your local `.env` / `.env.example` (Firebase + Supabase if used).
   - Use the **same names** as in `.env` (must start with `VITE_` for Vite).
4. **Save** and **Redeploy** so a new build picks up the variables.
5. **Custom domain (GoDaddy)**:
   - In Amplify → **Domain management** → add your domain (e.g. `www.yourschool.com`).
   - Amplify will show **DNS records** (CNAME or ALIAS).
   - In **GoDaddy** → **DNS** for the domain → add those records (or change nameservers if Amplify asks for full delegation).

After DNS propagates, the live site will have Firebase configured (as long as the Amplify build had the env vars).

---

## Option B — S3 + CloudFront

1. **Build with env vars** (pick one):
   - **Locally**: `.env` in project root → `npm run build` → upload `dist/` to S3.
   - **AWS CodeBuild / GitHub Actions**: set secrets as `VITE_FIREBASE_*`, run `npm run build`, sync `dist/` to S3.
2. Create an **S3 bucket** (static website or private bucket + **CloudFront** origin).
3. Upload contents of **`dist/`** (not the repo root).
4. **CloudFront** distribution in front of the bucket (HTTPS, caching).
5. **GoDaddy DNS**: CNAME `www` → CloudFront domain name, or ALIAS/ANAME for apex if your DNS supports it.

Firebase still only works if that build step had real `VITE_FIREBASE_*` values.

---

## Option C — GoDaddy “Web Hosting” / cPanel (FTP only)

If you only **FTP upload** files and there is **no build step on the server**:

1. On your computer: ensure **`.env`** has real Firebase values.
2. Run **`npm run build`**.
3. Upload everything inside the **`dist/`** folder to `public_html` (or the host’s web root).

Do **not** upload only source code without building. Do **not** expect `.env` on the server to be read by the browser — Vite does not work that way.

---

## Firebase API key restrictions (Google Cloud)

If you restricted the browser API key by **HTTP referrer**, add:

- Your **production** origin, e.g. `https://www.yourschool.com/*`
- `https://yourschool.com/*` if you use apex

Otherwise the live site may get API errors (different from “not configured”).

---

## Checklist

| Step | Done? |
|------|--------|
| `VITE_FIREBASE_*` set where **`npm run build` runs** | |
| New deploy after changing env vars | |
| GoDaddy DNS points to Amplify / CloudFront / host | |
| Firebase Auth **authorized domains** includes your production domain | |
| API key **referrer** restrictions include production URL | |

Firebase Console → **Authentication** → **Settings** → **Authorized domains**: add your custom domain if login fails on production.
