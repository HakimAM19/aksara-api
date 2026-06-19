// import mysql from "mysql2/promise";

// const db = mysql.createPool({

//   host: process.env.DB_HOST,

//   user: process.env.DB_USER,

//   password: process.env.DB_PASSWORD,

//   database: process.env.DB_NAME,

//   port: process.env.DB_PORT,

// });

// export default db;

import mysql from "mysql2/promise";

const db = mysql.createPool(process.env.DATABASE_URL);

export default db;
