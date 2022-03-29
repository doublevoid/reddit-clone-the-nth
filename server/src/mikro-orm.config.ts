import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Options } from '@mikro-orm/core'
import { env } from "process";
const config: Options = {
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'rctn',
  type: 'mariadb',
  user: 'root',
  password: env.DB_PWD,
  migrations: {
      tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
      path: './migrations', // path to the folder with migrations
      pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
      glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: false, // allow to disable table and column dropping
      snapshot: true, // save snapshot when creating new migrations
      emit: 'ts', // migration generation mode
      generator: TSMigrationGenerator // migration generator, e.g. to allow custom formatting
  }
};
export default config;