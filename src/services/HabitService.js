import { DatabaseConnection } from '../database/DatabaseConnection';

const table = "habit"
const db = DatabaseConnection.getConnection()

export default class HabitService {

    static addData(habit) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (
                    title,
                    description,
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                    saturday,
                    sunday,
                    goaldays,
                    currentday,
                    progress, 
                    repeat,
                    timetoremaind,
                    notificationidentifier,
                    date)
                values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [
                        habit.title,
                        habit.description,
                        habit.monday,
                        habit.tuesday,
                        habit.wednesday,
                        habit.thursday,
                        habit.friday,
                        habit.saturday,
                        habit.sunday,
                        habit.goaldays,
                        habit.currentday,
                        habit.progress,
                        habit.repeat,
                        habit.timetoremaind,
                        habit.notificationidentifier, 
                        habit.date],
                    (_, { insertId, rows }) => {
                        resolve(insertId)
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


    static updateById(habit) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set 
                title = ?,
                description = ?,
                monday = ?,
                tuesday = ?,
                wednesday = ?,
                thursday = ?,
                friday = ?,
                saturday = ?,
                sunday = ?,
                goaldays = ?,
                currentday = ?,
                progress = ?,
                repeat = ?,
                timetoremaind = ?, 
                notificationidentifier = ?,
                date = ? 
                where id = ?;`, [
                    habit.title,
                    habit.description,
                    habit.monday,
                    habit.tuesday,
                    habit.wednesday,
                    habit.thursday,
                    habit.friday,
                    habit.saturday,
                    habit.sunday,
                    habit.goaldays,
                    habit.currentday,
                    habit.progress,
                    habit.repeat,
                    habit.timetoremaind,
                    habit.notificationidentifier,
                    habit.date,
                    habit.id
                ], () => {
                    resolve(habit.id)
            }), (sqlError) => {
                console.log(sqlError);
            }
        }, (txError) => {
            console.log(txError);
        }));
    }

    static updateNewGoal(habitId, newProgress) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`update ${table} set 
                progress = ?
                where id = ?;`, [
                    newProgress,
                    habitId
                ], () => {
                    resolve(habitId)
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