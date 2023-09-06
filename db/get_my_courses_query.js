export default function get_my_courses(id){
    return(
        `SELECT "c_id", "i_id", "title", "description", "date", "progress"
        FROM "Courses" NATURAL JOIN "Enrolls" 
        WHERE "Enrolls"."s_id" ='${id}'`
    );
}