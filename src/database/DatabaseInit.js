import { DatabaseConnection } from './DatabaseConnection';

var db = null

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        try {
            this.InitDb()    
        } catch (error) {
            alert(error)
        }
    }
    InitDb() {
        var sql = [
            `create table if not exists habit (
                id integer primary key autoincrement,
                title text,
                description text,
                monday integer,
                tuesday integer,
                wednesday integer,
                thursday integer,
                friday integer,
                saturday integer,
                sunday integer,
                goaldays integer,
                currentday integer,
                progress integer,
                repeat text,
                timetoremaind datetime,
                date datetime,
                notificationidentifier text
            );`,

            `create table if not exists user (
                id integer primary key autoincrement,
                name text,
                email text,
                password text,
                date datetime
            );`,

            `create table if not exists goal (
                id integer primary key autoincrement,
                habit integer,
                title text,
                description text,
                currentprogress integer,
                date datetime
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