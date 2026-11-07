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

## Backend (API)

`server/` is a separate Express service. It was hosted on Render at
`https://e-commerce-101p.onrender.com/api` (set in `client/.env.production`).
When that service is not running, the API edge returns
`503 Render - Application loading` and the storefront cannot load products.

`render.yaml` at the repo root redeploys it in one step: Render dashboard →
**New → Blueprint** → select this repo, then fill `MONGO_URL` and the three
`CLOUDINARY_*` values (`JWT_SECRET` is generated). The service exposes
`GET /health`, which reports the database state, so a broken Mongo connection
shows up as `database: "disconnected"` instead of an unexplained 503.

After a new API URL exists, update `VITE_API_URL` in `client/.env.production`
and run `./deploy.sh`.

The storefront degrades instead of dying: if `/api/product/list` fails or times
out (12s), `ShopContext` falls back to the bundled catalog in
`client/src/assets/assets.js` and shows an offline banner.
