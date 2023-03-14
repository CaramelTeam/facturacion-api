// import dotenv from 'dotenv/config';
import 'dotenv/config'
// import { ENV_PATH } from 'src/constants/index';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// dotenv.config({ path: ENV_PATH });

const migrationsFilesPath: string = process.env.NODE_ENV === 'production' ? '/tables/**/*.js' : '/tables/**/*.ts';
const DEFAULT_DB_PORT = 3310
const DEFAULT_DB_MIGRATIONS_TABLE = 'typeorm_migrations'
const LOAD_ENTITIES_FROM = ['dist/**/*.entity.js']

const LOAD_TYPEORM_SUBSCRIBER = ['dist/**/*.subscriber.js']
const LOAD_MIGRATIONS_FROM = [__dirname + migrationsFilesPath]
console.log('LOAD_MIGRATIONS_FROM', LOAD_MIGRATIONS_FROM);


export const connections: TypeOrmModuleOptions [] = [
    {
        type: 'mysql',
        name: process.env.APP_DB_CONNECTION,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: +process.env.DB_PORT || DEFAULT_DB_PORT,
        entities: LOAD_ENTITIES_FROM,
        logging: process.env.DB_LOGGING === 'false' ? false : true,
        synchronize: false,
        migrationsRun: false,
        migrations: LOAD_MIGRATIONS_FROM,
        migrationsTableName: process.env.DB_MIGRATIONS_TABLE || DEFAULT_DB_MIGRATIONS_TABLE,
        subscribers: LOAD_TYPEORM_SUBSCRIBER
    }
]
