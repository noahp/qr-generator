# QR Generator

A Cloudflare Worker that generates QR codes as SVG or PNG images based on URL query parameters.

## Usage

Make GET requests to your worker with the following query parameters:

- `url`: URL-encoded string to encode in the QR code

### Examples

```text
https://your-worker.your-subdomain.workers.dev/?url=https%3A%2F%2Fexample.com
```

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Deploy to Cloudflare Workers:

   ```bash
   npm run deploy
   ```
