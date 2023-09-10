export default function get_instructor_info_query(USER_ID){
    return(
        `SELECT "Courses"."c_id", "Courses"."title", "Courses"."description"
        FROM "Courses" WHERE "Courses"."i_id" = '${USER_ID}'`
    );
}