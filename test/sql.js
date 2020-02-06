const { createConnection } = require('mysql');

const connectionParams = {
    host: 'https://fore:suryo888@dbstaging.fore.coffee/index.php',
    user: 'roasted_latte',
    password: 'fore888',
    port: '3306',
    database: 'roasted_latte'
};
const connectDb = () => {
    const conn = createConnection(connectionParams);

    return new Promise((resolve, reject) => {
        conn.connect((err) => {
            if (err) reject(err);

            resolve(conn);
        });
    });
};

const executeSql = (conn, sql) =>
    new Promise((resolve, reject) => {
        conn.query(sql, (error, result) => {
            if (error) reject(error);

            resolve(result);
        });
    });

const closeDb = (conn) => conn.end();

module.exports = {
    connectDb,
    closeDb,
    executeSql
};