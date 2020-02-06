const { connectDb, executeSql, closeDb } = require('./sql.js');

const test = async () => {
    conn = await connectDb();
		row_data = await executeSql(
			conn,
			`UPDATE auth_code
            SET acode_status = 'active'
            WHERE acode_phone = '+6281382614513' ORDER BY acode_id LIMIT 1;`
        );
        closeDb(conn)
}
test()
