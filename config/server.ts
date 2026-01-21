import crypto from 'crypto';

export default ({ env }) => {
  // Railway and most cloud providers set PORT automatically
  // Use process.env.PORT if available (Railway sets this), otherwise use env('PORT')
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : env.int('PORT', 1337);
  
  // Log port configuration for debugging
  console.log(`🚀 Server starting on port: ${port}`);
  console.log(`🌍 Host: ${env('HOST', '0.0.0.0')}`);
  console.log(`🔧 NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  
  // Get APP_KEYS from environment
  const appKeys = env.array('APP_KEYS', []);
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Generate fallback keys if not provided (with warning in production)
  const keys = appKeys && appKeys.length > 0 
    ? appKeys 
    : (isProduction 
        ? (() => {
            console.warn('⚠️  WARNING: APP_KEYS is not set! Generating temporary keys.');
            console.warn('⚠️  This is NOT secure for production! Please set APP_KEYS in your Railway environment variables.');
            // Generate 4 random keys for production fallback
            return Array.from({ length: 4 }, () => 
              crypto.randomBytes(32).toString('base64')
            );
          })()
        : ['dev-key-1', 'dev-key-2', 'dev-key-3', 'dev-key-4']
      );
  
  return {
    host: env('HOST', '0.0.0.0'),
    port: port,
    app: {
      keys: keys,
    },
  };
};
