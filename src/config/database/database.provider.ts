import { connections } from '../../migrations/orm.config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { FACTU_CONNECTION, FACTU_DATA_SOURCE } from '../../constants/index';

export const databaseProviders = () => {
    return connections.map((connection) => ({
        provide: `DATA_SOURCE_${connection.name}`,
        useFactory: async () => connection
    }))
}

export const factuDataSourceProvider = {
    provide: FACTU_DATA_SOURCE,
    useFactory: (connection: DataSourceOptions) => {
        const dataSource = new DataSource(connection)
        dataSource.initialize()
        return dataSource
    },
    inject: [`DATA_SOURCE_${FACTU_CONNECTION}`]
}
