export default [
  {
    name: 'default',
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/entities/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/entities',
    },
  },
  {
    name: 'seed',
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    migrations: ['src/migrations/seed/*.ts'],
    cli: {
      migrationsDir: 'src/migrations/seed',
    },
  },
];
