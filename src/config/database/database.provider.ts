import { connections } from "src/migrations/orm.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { FACTU_CONNECTION, DATA_SOURCE } from "src/constants";

export const databaseProviders = () => {
    return connections.map((connection) => ({
        provide: `DATA_SOURCE_${connection.name}`,
        useFactory: async () => connection
    }))
}

export const factuDataSourceProvider = {
    provide: DATA_SOURCE,
    useFactory: (connection: DataSourceOptions) => {
        const dataSource = new DataSource(connection);
        dataSource.initialize()
        return dataSource;
    },
    inject: [`DATA_SOURCE_${FACTU_CONNECTION}`]
}
