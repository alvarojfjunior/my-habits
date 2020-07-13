import { DatabaseConnection } from './DatabaseConnection';

var db = null

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        this.InitDb()
    }
    InitDb() {
        var sql = [
            `create table if not exists habit (
                id integer primary key autoincrement,
                title text,
                description text,
                monday blob,
                tuesday blob,
                wednesday blob,
                thursday blob,
                friday blob,
                saturday blob,
                sunday blob,
                goaldays integer,
                currentday integer,
                progress integer,
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

            `create table if not exists goal (
                id integer primary key autoincrement,
                habit integer,
                title text,
                description text,
                currentprogress integer,
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