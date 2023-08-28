const oracledb = require('oracledb');
import pool from '@/middleware/connectdb';

async function get_emai_password() {
    const connection = await pool.acquire();
    try {
        const result = await connection.execute(
            `SELECT "u"."email","u"."password","u"."u_id"
            FROM "Users" "u"`,
            [],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        return result.rows;
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    } finally {
        pool.release(connection);
    }
}

export default async function handler(req, res) {
    try {
        const result = await get_emai_password();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
    
}
