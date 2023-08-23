import { getConnection } from 'oracledb';
import { createPool } from 'generic-pool';

const pool = createPool({
    create: async () => {
        const connection = await getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_URL
        });
        return connection;
    },
    destroy: async (connection) => {
        await connection.close();
    }
});

export default pool;