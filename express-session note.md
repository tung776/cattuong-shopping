Warning The default server-side session storage, MemoryStore, is purposely not designed for a production environment. 
It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

For a list of stores, see compatible session stores.

================================================

Cảnh báo: Mặc định session sẽ được lưu trữ trên bộ nhớ phía server, Đây là mục đích được thiết kế không dành cho môi trường
ứng dụng thực tế. Nó sẽ gây tổn hao bộ nhớ trong hầu hết các trường hợp. Nó chỉ có ý nghĩa cho việc debug và phát triển ứng dụng.
Có một danh sách các module giúp lưu session tương thích: 
https://github.com/expressjs/session#compatible-session-stores
1.  connect-session-sequelize A session store using Sequelize.js, 
    which is a Node.js / io.js ORM for PostgreSQL, MySQL, SQLite and MSSQL.
2.  connect-session-knex A session store using Knex.js, which is a SQL query builder 
    for PostgreSQL, MySQL, MariaDB, SQLite3, and Oracle.
3.  connect-mongo A MongoDB-based session store.
4.  .....
========================================================================================

Trong ứng dụng này chúng ta đang sử dụng mongo như là cơ sở dữ liệu. Nên connect-mongo là lựa chọn chính xác 
https://www.npmjs.com/package/connect-mongodb




================================================