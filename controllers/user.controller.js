const fakeDb = require('../context/fakeDb')

const users = fakeDb.users

const userController = {

    getOne : (req, res) => {
        const user = users.find(u => u.id == req.params.id)
        if (user) {
            res.status(200).json(user)
        }
        else
        {
            res.sendStatus(400)
        }
    },

    getAll : (req, res) => {
        res.status(200).json(users)
    },

    create : (req, res) => {
        const user = req.body
        if (user.nom && user.prenom && user.email && user.password) {
            users.push(
                {
                    id : compteur,
                    nom : user.nom,
                    prenom : user.prenom,
                    email : user.email,
                    password : user.password
                }
            )
            compteur++
            res.status(200).json(users)
        }
        else{
            res.sendStatus(400)
        }
        
    },

    update : (req, res) => {
        const user = req.body
        if (user.id && user.nom && user.prenom && user.email && user.password){
            const originalUser = users.find(u => u.id == user.id)
            if (originalUser) {
                users.splice(users.indexOf(originalUser), 1, 
                {
                    id : user.id,
                    nom : user.nom,
                    prenom : user.prenom,
                    email : user.email,
                    password : user.password
                })
                res.status(200).json(users)
            }
            else{
                res.sendStatus(400) 
            }
        }
        else
        {
            res.sendStatus(400)
        }
    },
    
    delete : (req, res) => {
        const user = users.find(u => u.id == req.params.id)
        if (user) {
            const index = users.indexOf(user)
            users.splice(index,1)
            res.status(200).json(users)
        }
        else{
            res.sendStatus(400)
        }
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