# Security

## Leaked Firebase API key (remediation)

If a real Firebase Web API key or other secrets were committed to a **public** repository:

### 1. Rotate the API key (required)

1. Open [Google Cloud Console](https://console.cloud.google.com/) → select your Firebase project.
2. Go to **APIs & Services** → **Credentials**.
3. Find the **Browser key** (or the key named like “Web API Key” / used by your Firebase Web app).
4. Click **Edit** → **Regenerate key** (or create a new key, apply restrictions, then delete the old key after you’ve migrated).
5. In **Firebase Console** → **Project settings** → **Your apps**, confirm the web app config shows the new key if the console updates automatically; otherwise use the key from Credentials.

**Update local configuration (never commit):**

- Copy [`.env.example`](.env.example) to `.env` if needed.
- Set `VITE_FIREBASE_API_KEY` (and any other changed fields) to the **new** values.
- Restart `npm run dev` and redeploy any production/staging builds that embed `VITE_*` variables.

### 2. Restrict the new API key (strongly recommended)

Still under **Credentials** → edit the key:

- **Application restrictions:** choose **HTTP referrers (web sites)** and add:
  - Your production origin(s), e.g. `https://yourdomain.com/*`
  - Local dev: `http://localhost:*` and `http://127.0.0.1:*`
- **API restrictions:** **Restrict key** and enable only what you use, for example:
  - Firebase-related APIs (e.g. Identity Toolkit, Firestore API, Cloud Storage for Firebase, Firebase Installations, Token Service, etc., depending on your stack).

This limits abuse even if a key appears in client-side bundles.

### 3. Review for abuse

- **Google Cloud Console** → **Billing** and **APIs & Services** → **Dashboard** for unusual traffic.
- **Firebase Console** → **Authentication** and **Firestore** for unexpected usage.

### 4. Repository hygiene

- **Do not** put real API keys, tokens, or project-specific secrets in [`.env.example`](.env.example), README screenshots, or committed docs.
- [`.gitignore`](.gitignore) should keep `.env` and `.env.local` out of git; verify before every push.

### 5. Optional: remove secrets from git history

Rotating the key **invalidates** the old key, but the old value may still exist in **past commits** on GitHub.

To remove it from history (disruptive for forks and clones):

- Use [git filter-repo](https://github.com/newren/git-filter-repo) or BFG Repo-Cleaner, then **force-push**; coordinate with all collaborators.

If you skip history rewrite, **rotation + restrictions** are still mandatory.

## Reporting

If you discover a new leak, rotate credentials immediately and sanitize tracked files.
