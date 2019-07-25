const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    connectionLimit : 10,
    user: 'test',
    password: 'test',
    port: '3306',
    database: 'test'
  });

  const dbQuery = (query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            console.log("Connected!");
            connection.query(query, (err, result, fields) => {
                if (err) return reject(err);
                connection.release();
                return resolve(result);
              });
          });
    }); 
  };

exports.getUsers = async (req, res) => {
    const query = `SELECT * FROM users`;
    try {
        const users = await dbQuery(query);
        res.status(200).send({ status: 200, response: users });
    } catch (error) {
        res.status(400).send({ status: 400, response: 'Connection error' });
    }
};

exports.getUser = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM users WHERE id=${id}`;
    try {
        const user = await dbQuery(query);
        res.status(200).send({ status: 200, response: user });
    } catch (error) {
        res.status(400).send({ status: 400, response: 'Connection error' });
    }
};

