import { z } from 'zod';

export const NodeEnv = z.enum(['development', 'production']);
type NodeEnv = z.infer<typeof NodeEnv>;

export const environmentVariablesSchema = z.object({
  NODE_ENV: NodeEnv,
  NODE_PORT: z.string().transform((v) => {
    const num = Number(v);
    if (isNaN(num)) throw new Error(`Invalid number for NODE_PORT: ${v}`);
    return num;
  }),
  POSTGRES: z.string(),
  STORAGE_ENDPOINT: z.string(),
  STORAGE_ACCESS: z.string(),
  STORAGE_SECRET: z.string(),
  STORAGE_SSL: z.string().transform((val) => {
    if (val.toLowerCase() === 'true') return true;
    if (val.toLowerCase() === 'false') return false;
    throw new Error(`Invalid boolean value for STORAGE_SSL: ${val}`);
  }),

  STORAGE_PORT: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error(`Invalid number for STORAGE_PORT: ${val}`);
    return num;
  }),
  STORAGE_BUCKET: z.string(),
  JWT: z.string(),
});

export type EnvironmentVariables = z.infer<typeof environmentVariablesSchema>;

export function envValidate(config: Record<string, unknown>) {
  try {
    const validatedConfig = environmentVariablesSchema.parse(config);
    return validatedConfig;
  } catch (error) {
    throw new Error(
      `Invalid environment variables: ${(error as Error).message}`,
    );
  }
}
