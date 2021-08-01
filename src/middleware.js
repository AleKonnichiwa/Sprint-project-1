const { arrayInfo } = require("./info");
const { statuses } = require("./info");


// 1. User o mail y clave son validos.
// 2. Si con index
// 3. Si es admin con id de usuario

function information(req, res, next) {
    
}

// Funciones de middleware
function usuario(req, res, next) {
    id = parseInt(req.query.index);
    console.log(req.query);
    //TODO: Por el momento solo trabajamos con el indice del usuario
    //index = usuarios.findIndex(elemento => elemeno.id == id);
    index = id;
    user = user[index];
    console.log(index);
    if (!user) {
        res.status(404).send({ resultado: `Usuario no logueado o inexistente`});
    } else {
        req.userIndex = index;
        req.user = user;
        next();
    }
}

module.exports = { isLoginUser }