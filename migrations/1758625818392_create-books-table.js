/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('books',{
        id : {
            primaryKey : true,
            type : "varchar"
        },
        title : {
            type : "varchar",
            notNull : true
        },
        author : {
            type : "varchar",
            notNull : true
        },
        year : {
            type : "integer",
            notNull : true
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
