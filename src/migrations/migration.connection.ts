import { connections } from './orm.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const getDataSourceOptions = () => {
    const connectionName = process.env.APP_DB_CONNECTION;
    let options = connections.find((connection) => connection.name === connectionName);
    if (!options) {
        return connections[0] as unknown as DataSourceOptions
    }
    return options as unknown as DataSourceOptions;
}

const options = getDataSourceOptions();
const dataSource = new DataSource(options);
dataSource.initialize();
export default dataSource;