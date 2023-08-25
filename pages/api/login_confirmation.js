const oracledb = require('oracledb');

async function get_emai_password() {
    const connection = await oracledb.getConnection({
        user: "EDUX",
        password: '2122',
        connectString: "localhost/ORCLPDB"
    });

    const result = await connection.execute(
        `SELECT "u"."email","u"."password","u"."u_id"
        FROM "Users" "u"`,
        [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    await connection.close();
    console.log(result);
    return result.rows;
}

export default async function handler(req, res) {
    try {
        const result = await get_emai_password();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
    
}
