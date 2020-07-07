import { DatabaseConnection } from '../database/DatabaseConnection';

const table = "user"
const db = DatabaseConnection.getConnection()

export default class HabitService {

    static addData(user) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (name, email, password, date) 
                values (?,?,?,?)`,
                    [user.name, user.email, user.password, user.date],
                    (_, { insertId, rows }) => {
                        resolve({...user, ...{'id':insertId}})
                    }), (sqlError) => {
                        console.log(sqlError);
                    }
            }, (txError) => {
                console.log(txError);
            }));
    }

    static deleteById(id) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }
            }, (txError) => {
                console.log(txError);

            });
    }


    static updateById(user) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set nome = ?, email = ?, password = ?, where id = ?;`, [user.nome, user.email, user.password, user.id], () => {
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findById(id) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);

        }));
    }

    static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }))
    }
}