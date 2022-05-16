const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getArrayFromDb(sql) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, []);
    return result;
  } catch (error) {
    console.log('error getArrayFromDb', error);
    throw new Error('error getArrayFromDb');
  } finally {
    conn?.end();
  }
}

async function getAllUsers() {
  const sql = 'SELECT * FROM users';
  return getArrayFromDb(sql);
}

async function addUserToDb(email, password) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO users(email, password)
    VALUES (?, ?)
    `;
    const [result] = await conn.execute(sql, [email, password]);
    return result;
  } catch (error) {
    console.log('error addUserToDb', error);
    return false;
  } finally {
    conn?.end();
  }
}

// async function findUserByEmail(email) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = `
//     SELECT * FROM users WHERE email = ?
//     `;
//     const [result] = await conn.execute(sql, [email]);
//     return result[0];
//   } catch (error) {
//     console.log('error findUserByEmail', error);
//     return false;
//   } finally {
//     conn?.end();
//   }
// }

module.exports = {
  addUserToDb,
  getArrayFromDb,
  getAllUsers,
};
