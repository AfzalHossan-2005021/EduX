
export default function get_exam_question_query(EXAM_ID){
    return(
        `SELECT "Questions"."q_id", "Questions"."q_description",
        "Questions"."opt1", "Questions"."opt2", "Questions"."opt3", "Questions"."opt4",
        "Questions"."marks", "Questions"."right_ans", "Questions"."serial"
        FROM "Topics" JOIN "Exams" ON "Topics"."t_id" = "Exams"."t_id"
        JOIN "Questions" ON "Exams"."e_id" = "Questions"."e_id"
        WHERE "Exams"."e_id" = '${EXAM_ID}'
        ORDER BY "Questions"."serial" ASC`
    );
}