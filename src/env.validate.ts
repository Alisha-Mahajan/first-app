import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvSchema } from './env-schema';

export function envValidator(config: Record<string, unknown>) {
  const validationConfig = plainToClass(EnvSchema, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validationConfig, {
    skipMissingProperties: false,
    skipNullProperties: false,
    skipUndefinedProperties: false,
    // to avoid listing of properties listed to it
    validationError: { target: false },
  });

  if (errors.length > 0) {
    throw new Error(
      `Missing or improper env config used resulting in errrors: ${errors.toString()}`,
    );
  }
  return validationConfig;
}
