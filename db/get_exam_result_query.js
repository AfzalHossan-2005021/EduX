export default function get_exam_question_query(STUDENT_ID, EXAM_ID) {
  return `SELECT
        ( "Exams"."marks" ) full_mark,
        "Exams"."question_count",
        ( "Takes"."marks" ) obtained_mark,
        ( "Takes"."marks" ) correct_answer,
        ( "Exams"."marks" - "Takes"."marks" ) wrong_answer,
        "Takes"."status" 
    FROM
        "Takes"
        JOIN "Exams" ON "Takes"."e_id" = "Exams"."e_id" 
    WHERE
        "Takes"."s_id" = '${STUDENT_ID}'
        AND "Takes"."e_id" = '${EXAM_ID}'`;
}
