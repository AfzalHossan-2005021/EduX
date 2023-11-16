export default function delete_topic_query(e_id){
    return(
        `DELETE FROM "Exams"
        WHERE "e_id" = ${e_id}`
    );
}