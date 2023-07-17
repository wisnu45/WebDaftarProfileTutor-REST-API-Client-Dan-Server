SELECT U.firstname, U.lastname, T.location, SUBSTRING(T.description, 1, 10) AS description, S.name AS subject, T.rate, R1.totalreviews, R1.totalrating FROM Tutor AS T
JOIN User AS U ON T.user_id = U.user_id
JOIN TutorSubject AS TS ON T.tutor_id = TS.tutor_id
JOIN Subject AS S ON S.subject_id = TS.subject_id
JOIN
(SELECT tutor_id, COUNT(*) AS totalreviews, AVG(rating) AS totalrating FROM review
GROUP BY tutor_id) AS R1
ON T.tutor_id = R1.tutor_id
WHERE S.subject_id = 1;

SELECT U.firstname, U.lastname, T.tutor_id, T.location, T.description,
S.name AS subject, T.rate, R1.totalreviews, R1.totalrating FROM Tutor AS T
JOIN User AS U ON T.user_id = U.user_id
JOIN TutorSubject AS TS ON T.tutor_id = TS.tutor_id
JOIN Subject AS S ON S.subject_id = TS.subject_id
JOIN
(SELECT tutor_id, COUNT(*) AS totalreviews, AVG(rating) AS totalrating FROM review
GROUP BY tutor_id) AS R1
ON T.tutor_id = R1.tutor_id
WHERE T.tutor_id = 1;
