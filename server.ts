import express from 'express';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary with user credentials
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'kkroq7e1';
const API_KEY = process.env.CLOUDINARY_API_KEY || '246794876664153';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'fvm7_tMbabv6PgDAd4MCVEiIn10';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware - allow up to 50MB for high-resolution luxury product images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Route: Cloudinary Health & Status Check
  app.get('/api/cloudinary/status', async (_req, res) => {
    try {
      // Ping Cloudinary ping API
      const ping = await cloudinary.api.ping();
      res.json({
        success: true,
        status: ping.status,
        cloudName: CLOUD_NAME,
        apiKey: API_KEY.slice(0, 4) + '****' + API_KEY.slice(-4),
        message: 'Cloudinary storage engine connected and authenticated.'
      });
    } catch (error: any) {
      console.error('Cloudinary ping error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to ping Cloudinary'
      });
    }
  });

  // API Route: Upload Single Image
  app.post('/api/upload', async (req, res) => {
    try {
      const { file, folder = 'vendome_store' } = req.body;
      if (!file) {
        return res.status(400).json({ success: false, error: 'No image file payload provided' });
      }

      const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto:best', fetch_format: 'auto' }
        ]
      });

      res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      });
    } catch (error: any) {
      console.error('Cloudinary upload failure:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Image upload to Cloudinary failed'
      });
    }
  });

  // API Route: Batch Upload Images
  app.post('/api/upload-multi', async (req, res) => {
    try {
      const { files, folder = 'vendome_store' } = req.body;
      if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ success: false, error: 'No array of files provided' });
      }

      const uploadPromises = files.map((file: string) =>
        cloudinary.uploader.upload(file, {
          folder,
          resource_type: 'auto',
          transformation: [{ quality: 'auto:best', fetch_format: 'auto' }]
        })
      );

      const results = await Promise.all(uploadPromises);

      res.json({
        success: true,
        count: results.length,
        images: results.map((r) => ({
          url: r.secure_url,
          public_id: r.public_id,
          format: r.format,
          width: r.width,
          height: r.height
        }))
      });
    } catch (error: any) {
      console.error('Batch upload error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Batch upload failed'
      });
    }
  });

  // API Route: Delete Image
  app.delete('/api/upload', async (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id) {
        return res.status(400).json({ success: false, error: 'public_id required' });
      }

      const result = await cloudinary.uploader.destroy(public_id);
      res.json({ success: true, result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Development vs Production serving
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Vendôme Commerce Server] Listening on http://0.0.0.0:${PORT}`);
    console.log(`[Cloudinary Media Engine] Bound to cloud: ${CLOUD_NAME}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
