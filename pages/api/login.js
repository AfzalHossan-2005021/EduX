const oracledb = require('oracledb');
import secureLocalStorage from "react-secure-storage";
import pool from "../../middleware/connectdb"

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const connection = await pool.acquire();
        const { email, password } = req.body;
        try {
            const result = await connection.execute(
                `BEGIN
                    :user_id := CHECK_USER(:email, :password);
                END;`,
                {
                    email: email,
                    password: password,
                    user_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
                },
                { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
            let message = '';
            let success = false;
            const u_id = result.outBinds.user_id

            if(u_id == -1){
                message = "Invalid password"
                success = false
            }
            else if (u_id == -2){
                message = "User is not registered"
                success = false
            }
            else{
                message = "Valid user"
                success = true
            }
            res.status(200).json({success, message, u_id});
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