const oracledb = require('oracledb');
import pool from "../../middleware/connectdb"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const connection = await pool.acquire();
        const { email, password } = req.body;
        try {
            const result = await connection.execute(
                `BEGIN
                    :message := CHECK_USER(:email, :password);
                END;`,
                {
                    email: email,
                    password: password,
                    message: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 }
                },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            res.status(200).json(result.outBinds);
        } catch (error) {
            res.status(500).json({ message: 'An error occurred.' });
        } finally {
            pool.release(connection);
        }
    }
    else {
        res.status(400).json({ message: 'This method is not allowed.' })
    }
}