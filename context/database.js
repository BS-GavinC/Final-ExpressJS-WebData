const sql = require('mssql')

const sqlConfig = {
    user : "sa",
    password : "Test123=",
    database : "expressDB",
    server : "localhost\\SQLEXPRESS",
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const database = {

    getAll : (next) => {
        sql.connect(sqlConfig, (err) => {
            if(err) console.log(err);
                
            const request = new sql.Request()
    
            request.query('SELECT * FROM users', (err, data) => {
                
                if(err) console.log(err);
    
                next(data.recordset)
            })
        })
    },

    getOne : (id, next) => {
        sql.connect(sqlConfig, (err) => {
            if(err) console.log(err);
                
            const request = new sql.Request()

            request.input('id', sql.Int, parseInt(id))
    
            request.query('SELECT * FROM users WHERE id = @id', (err, data) => {
                
                if(err) console.log(err);
    
                next(data.recordset[0])
            })
        })
    },

    create : (firstname, lastname, email, password, next) => {
        sql.connect(sqlConfig, (err) => {
            if(err) console.log(err);
                
            const request = new sql.Request()

            request.input('firstname', sql.VarChar, firstname)
            request.input('lastname', sql.VarChar, lastname)
            request.input('email', sql.VarChar, email)
            request.input('password', sql.VarChar, password)
    
            request.query('INSERT INTO users VALUES (@firstname, @lastname, @email, @password)', (err, data) => {
                
                if(err) console.log(err);
    
                next(data.rowsAffected[0])
            })
        })
    },

    update : (id, firstname, lastname, email, password, next) => {
        sql.connect(sqlConfig, (err) => {
            if(err) console.log(err);
                
            const request = new sql.Request()

            request.input('id', sql.Int, parseInt(id))
            request.input('firstname', sql.VarChar, firstname)
            request.input('lastname', sql.VarChar, lastname)
            request.input('email', sql.VarChar, email)
            request.input('password', sql.VarChar, password)
    
            request.query('UPDATE users SET firstname = @firstname, lastname = @lastname, email = @email, password = @password WHERE id = @id', (err, data) => {
                
                if(err) console.log(err);
    
                next(data.rowsAffected[0])
            })
        })
    },

    delete : (id, next) => {
        sql.connect(sqlConfig, (err) => {
            if(err) console.log(err);
                
            const request = new sql.Request()

            request.input('id', sql.Int, parseInt(id))
    
            request.query('DELETE from users WHERE id = @id', (err, data) => {
                
                if(err) console.log(err);
    
                next(data.rowsAffected[0])
            })
        })
    }



}

module.exports = database