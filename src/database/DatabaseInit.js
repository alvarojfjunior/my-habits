import { DatabaseConnection } from './DatabaseConnection';

var db = null

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        this.InitDb()
    }
    InitDb() {
        var sql = [
            // `DROP TABLE if exists user;`,
            // `DROP TABLE if exists habit;`,
            `create table if not exists habit (
                id integer primary key autoincrement,
                title text,
                description text,
                progress integer,
                days integer,
                mon blob,
                tue blob,
                wed blob,
                thu blob,
                sat blob,
                sun blob
                finished blob,
                date text
            );`,

            `create table if not exists user (
                id integer primary key autoincrement,
                name text,
                email text,
                password text,
                date text
            );`,
        ];
        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("Database ready");
            }
        );
    }

}