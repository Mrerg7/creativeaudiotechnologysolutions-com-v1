# creativeaudiotechnologysolutions.com

Premium domain demonstration site focused on the AI transformation of audio creation, production, and listening.

**Domain available for acquisition** → `sales@desertrich.com`

## Stack

- **Astro 5** (static output)
- **Tailwind CSS 3**
- **TypeScript**
- **Content Collections** (scaffold ready)
- **Cloudflare Workers Static Assets** (no adapter — pure static)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
# Output: ./dist

# Deploy to Cloudflare Workers Static Assets
npx wrangler deploy
```

`wrangler.toml` is pre-configured for assets-only deployment:

```toml
[assets]
directory = "./dist"
```

No `@astrojs/cloudflare` adapter is required or used.

## Features

- Fully static, edge-cached on Cloudflare’s global network
- Structured data (JSON-LD)
- Complete Open Graph + Twitter Card meta
- Sitemap + robots.txt
- Mobile-first responsive design
- Single conversion-focused CTA → sales@desertrich.com
- Sophisticated footer domain-acquisition strip + legal disclaimer

## License

All rights reserved. Domain inquiries only.
