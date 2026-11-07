# Deployment

The site at **thepetroshop.com** is static hosting on Hostinger. It serves the
Vite build of `client/`, so only built files go to the web root, never the source.

## Branches

| Branch | Contents | Purpose |
| --- | --- | --- |
| `main` | full source (`client/`, `server/`, `deploy.sh`) | development |
| `deploy` | built `client/dist` contents at repo root (`index.html`, `assets/`, `.htaccess`) | what Hostinger pulls |

The `deploy` branch has no shared history with `main`; it is rewritten on every
release (`git push --force`). Never develop on it.

## Build and publish

```bash
./deploy.sh
```

That runs `npm ci && npm run build` in `client/`, then force-pushes
`client/dist` to `origin/deploy`.

## Hostinger setup (one time, in hPanel)

1. **Websites → thepetroshop.com → Advanced → GIT**
2. Repository: `https://github.com/standardpetroin-netizen/e-commerce.git`
   - Private repo: use the SSH key / credentials hPanel offers, or paste a
     GitHub token as the password.
3. Branch: `deploy`
4. Install path: `public_html` (must be empty; remove the stray `client/` folder)
5. Deploy once, then enable **Auto Deployment** so a push to `deploy` goes live.

## Notes

- `client/public/.htaccess` is copied into every build. It rewrites unknown paths
  to `index.html` so React Router routes (`/collection`, `/cart`, …) work, and is
  required on Apache.
- The API base comes from `client/.env.production` (`VITE_API_URL`), baked in at
  build time. If the backend URL changes, edit that file and re-run `./deploy.sh`.
- `server/` is not part of the Hostinger static site; it runs separately (Render).
