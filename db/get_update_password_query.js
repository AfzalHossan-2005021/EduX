export default function get_update_password_query(u_id, password){
    return(
        `UPDATE "Users"
        SET "password" = '${password}'
        WHERE "u_id" = '${u_id}'`
    );
}