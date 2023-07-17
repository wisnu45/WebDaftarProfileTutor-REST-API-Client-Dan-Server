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
  getMessages( {description, tutor_id} ) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE (Tutor) SET description = ? WHERE Tutor.tutor_id = ?";
      db.query(query, [description, tutor_id], (error, result, fields) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
};


// UPDATE (User) SET firstname = 'Did it' WHERE User.user_id = 2;
