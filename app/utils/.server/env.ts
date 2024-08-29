import * as v from 'valibot';

const envSchema = v.object({
  // Node
  NODE_ENV: v.optional(v.picklist(['development', 'production'])),

  // Secrets
  AUTH_SESSION_SECRET: v.string(),
  PREFS_SESSION_SECRET: v.string(),

  // Static password
  MANAGER_PASSWD: v.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends v.InferInput<typeof envSchema> {}
  }
}
