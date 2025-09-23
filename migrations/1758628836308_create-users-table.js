/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createType("user_role",["admin","user"])
    
    pgm.createTable('users',{
       id :  {
        type : 'varchar',
        primaryKey : true
       },
       username : {
        type : 'varchar',
        notNull : true
       },
       password : {
        type : 'varchar',
        notNull : true
       },
       role : {
        type : "user_role",
        default : "user",
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
