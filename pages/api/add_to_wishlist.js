const oracledb = require("oracledb");
import pool from "../../middleware/connectdb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const connection = await pool.acquire();
    const { u_id, c_id } = req.body;
    try {
      const result = await connection.execute(
        `BEGIN
                    :code := ADD_TO_WISHLIST(:u_id, :c_id);
                    commit;
                END;`,
        {
          u_id: u_id,
          c_id: c_id,
          code: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100 },
        },
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      res.status(200).json(result.outBinds);
    } catch (error) {
      console.error("Error enrolling:", error.message);
      res.status(500).json({ message: "An error occurred during enrollment." });
    } finally {
      pool.release(connection);
    }
  } else {
    res.status(400).json({ message: "This method is not allowed." });
  }
}
