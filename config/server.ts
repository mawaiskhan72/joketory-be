export default ({ env }) => {
  // Railway and most cloud providers set PORT automatically
  // Use process.env.PORT if available (Railway sets this), otherwise use env('PORT')
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : env.int('PORT', 1337);
  
  // Get APP_KEYS from environment - provide empty array as default to prevent undefined
  // In production, this MUST be set or Strapi will fail to start
  const appKeys = env.array('APP_KEYS', []);
  
  // Only use fallback keys in development
  const keys = appKeys && appKeys.length > 0 
    ? appKeys 
    : (process.env.NODE_ENV === 'production' 
        ? [] // Will cause error in production if not set - this is intentional
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
