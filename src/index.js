import QRCode from 'qrcode';

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const searchParams = url.searchParams;

      // Get query parameters
      const qrUrl = searchParams.get('url');

      // Validate parameters
      if (!qrUrl) {
        return new Response('Missing required parameter: url', {
          status: 400,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // Decode the URL
      let decodedUrl;
      try {
        decodedUrl = decodeURIComponent(qrUrl);
      } catch (error) {
        return new Response('Invalid URL encoding', {
          status: 400,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // Generate SVG QR code
      const svgString = await QRCode.toString(decodedUrl, {
        type: 'svg',
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      return new Response(svgString, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400', // Cache for 1 day
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });

    } catch (error) {
      console.error('Error generating QR code:', error);
      return new Response('Internal Server Error', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};