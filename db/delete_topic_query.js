export default function delete_topic_query(t_id){
    return(
        `DELETE FROM "Topics"
        WHERE "t_id" = ${t_id}`
    );
}