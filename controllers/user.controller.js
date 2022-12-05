const database = require('../context/database')
const fakeDb = require('../context/fakeDb')

const users = fakeDb.users

const userController = {

    getOne : (req, res) => {
        database.getOne(req.params.id, (user) => {
            console.log(user);
            if (user) {
                res.status(200).json(user)
            }
            else
            {
                res.sendStatus(400)
            }
        })
        
    },

    getAll : (req, res) => {
        database.getAll((data) => {
            res.status(200).json(data)
        })
    },

    create : (req, res) => {
        const user = req.body
        if (user.nom && user.prenom && user.email && user.password) {

            database.create(user.prenom, user.nom, user.email, user.password, (result) => {
                if (result) {
                    res.sendStatus(200)
                }
                else{
                    res.sendStatus(400)
                }
            })  
        }
        else{
            res.sendStatus(400)
        }
        
    },

    update : (req, res) => {
        const user = req.body
        if (user.id && user.nom && user.prenom && user.email && user.password){

            database.update(user.id, user.prenom, user.nom, user.email, user.password, (result) => {
                if (result) {
                    res.sendStatus(200)
                }
                else{
                    res.sendStatus(400)
                }
            })   
        }
        else
        {
            res.sendStatus(400)
        }
    },
    
    delete : (req, res) => {
        database.delete(req.params.id, (result) => {
            res.sendStatus(result ? 200 : 400)
        })
        
    },

    changePassword : (req, res) => {
        const body = req.body
        if (body.id && body.password && body.confirmPassword) {
            const user = users.find(u => u.id == body.id)
            if (user) {
                if (body.password === body.confirmPassword) {
                    user.password = body.password
                    res.status(200).json(users)
                }
                else{
                    res.sendStatus(400)
                }
            }
            else{
                res.sendStatus(400)
            }
        }
        else{
            res.sendStatus(400)
        }
    }

}

compteur = users.length + 1

module.exports = userController