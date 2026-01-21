import type { Core } from '@strapi/strapi';

// Add global error handlers to catch and log errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  // Don't exit immediately, let Strapi handle it
});

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    console.log('📝 Registering Strapi application...');
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🚀 Bootstrapping Strapi application...');
    
    // Validate critical environment variables
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      console.log('✅ Running in production mode');
      
      // Check for DATABASE_URL
      if (!process.env.DATABASE_URL) {
        console.error('❌ ERROR: DATABASE_URL is not set!');
        console.error('❌ Please add a PostgreSQL service in Railway.');
        console.error('❌ The app may fail to start without a database.');
      } else {
        console.log('✅ DATABASE_URL is set');
      }
      
      // Check for APP_KEYS (warn but don't fail)
      if (!process.env.APP_KEYS) {
        console.warn('⚠️  WARNING: APP_KEYS is not set. Using temporary keys (not secure for production).');
      } else {
        console.log('✅ APP_KEYS is set');
      }
    }
    
    console.log('✅ Bootstrap completed successfully');
  },
};
