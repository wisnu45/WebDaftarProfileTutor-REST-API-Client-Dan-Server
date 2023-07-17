/* Written by
 * Evan Lalopoulos <evan.lalopoulos.2017@my.bristol.ac.uk>
 * Harrison Boyns <hb17757.2017@my.bristol.ac.uk>
 * A project for Web Technologies
 * University of Bristol, May 2018
 * Copyright (C) - All Rights Reserved
 * Unauthorized copying of this file is strictly prohibited
 */
 
const db = require("../db");

//Wrap query in promise to avoid callbacks
module.exports = {
  getTutorsBySubject(subjectId) {
    return new Promise((resolve, reject) => {
      //  TODO: denormalize db for review stats
      const query =
      "SELECT U.user_id, U.firstname, U.lastname, T.tutor_id, T.location, SUBSTRING(T.description, 1, 120) AS description, " +
      "S.name AS subject, T.rate, R1.totalreviews, R1.totalrating FROM Tutor AS T " +
      "JOIN User AS U ON T.user_id = U.user_id " +
      "JOIN TutorSubject AS TS ON T.tutor_id = TS.tutor_id " +
      "JOIN Subject AS S ON S.subject_id = TS.subject_id " +
      "JOIN " +
      "(SELECT tutor_id, COUNT(*) AS totalreviews, AVG(rating) AS totalrating FROM review " +
      "GROUP BY tutor_id) AS R1 " +
      "ON T.tutor_id = R1.tutor_id " +
      "WHERE S.subject_id = ?;"

      db.query(query, [subjectId],(error, result, fields) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  getAllTutors() {
    return new Promise((resolve, reject) => {
      const query =
      "SELECT U.user_id, U.firstname, U.lastname, T.tutor_id, T.location, SUBSTRING(T.description, 1, 120) AS description, " +
      "S.name AS subject, T.rate, R1.totalreviews, R1.totalrating FROM Tutor AS T " +
      "JOIN User AS U ON T.user_id = U.user_id " +
      "JOIN TutorSubject AS TS ON T.tutor_id = TS.tutor_id " +
      "JOIN Subject AS S ON S.subject_id = TS.subject_id " +
      "JOIN " +
      "(SELECT tutor_id, COUNT(*) AS totalreviews, AVG(rating) AS totalrating FROM review " +
      "GROUP BY tutor_id) AS R1 " +
      "ON T.tutor_id = R1.tutor_id ";

      db.query(query,(error, result, fields) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};
