import { Module, Global } from '@nestjs/common';
import { databaseProviders, factuDataSourceProvider } from './database.provider';


@Global()
@Module({
    providers: [...databaseProviders(), factuDataSourceProvider],
    exports: [...databaseProviders(), factuDataSourceProvider],
})
export class DatabaseModule { }