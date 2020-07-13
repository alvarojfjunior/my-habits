import { DatabaseConnection } from './DatabaseConnection';

var db = null

export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        this.InitDb()
    }
    InitDb() {
        console.log('Vai deletar')
        var sql = [
            `DROP TABLE if exists user;`,
            `DROP TABLE if exists habit;`,
            `DROP TABLE if exists goal;`,
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