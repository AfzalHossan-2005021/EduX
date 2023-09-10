export default function get_lecture_content_query(STUDENT_ID, COURSE_ID, TOPIC_ID, LECTURE_ID){
    return(
        `SELECT "Lectures"."description", "Lectures"."video_link"
        FROM "Enrolls" 
        JOIN "Courses" ON "Enrolls"."c_id" = "Courses"."c_id"
        JOIN "Topics" ON "Topics"."c_id" = "Courses"."c_id"
        JOIN "Lectures" ON "Lectures"."t_id" = "Topics"."t_id"
        WHERE "Enrolls"."s_id" = '${STUDENT_ID}'
        AND "Courses"."c_id" = '${COURSE_ID}'
        AND "Topics"."t_id" = '${TOPIC_ID}'
        AND "Lectures"."l_id" = '${LECTURE_ID}'`
    );
}