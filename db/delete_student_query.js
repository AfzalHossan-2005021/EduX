export default function delete_student_query(s_id){
    return(
        `DELETE FROM "Students"
        WHERE "s_id" = ${s_id}`
    );
}