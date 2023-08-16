const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.resolve(__dirname, "db.sqlite");

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        throw err;
    }
});


module.exports = db;