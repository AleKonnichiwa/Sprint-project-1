// Requires

const express = require('express');
const morgan = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Delilah Resto',
        version: '1.0.0'
      }
    },
    apis: ['./src/app.js'],
  };

  
const swaggerDocs = swaggerJsDoc(swaggerOptions);

  //Importacion de archivos particulares

  const {arrayProducts} = require('./classes/Products');
  const {arrayStatus} = require('./classes/Status');
  const {arrayOrders} = require('./classes/Orders');
  const {arrayPaymentWay} = require('./classes/PaymentWay');

  let { loggedUserId, arrayUsers, loggedUserIsAdmin } = require('./classes/Users');

  //Inicializacion del server
    const app = express();
    
    app.use(express.json());
    app.use(morgan('dev'));

    
// Funciones de middleware
const isAdmin = (req, res, next) => {
    if (loggedUserIsAdmin != true) {
        res.status(401).send({ resultado: `Usuario no es admin`});
    } else {
        next();
    }
};
const isLogged = (req, res, next) => {
    if (loggedUserId == null) {
        res.status(401).send({ resultado: `Usuario no logueado`});
    } else {
        next();
    }
};

/**
 * @swagger 
 * /login:
 *    post:
 *       summary: "Verificar si usuario es válido."
 *       description: "Se verifica el usuario/email y contraseña."
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Created user object"
 *         required: true
 *         schema:
 *            type: "object"
 *            properties:
 *                username:
 *                    type: string
 *                password:
 *                    type: string
 *       responses:
 *         200:
 *           description: "Sesión iniciada"
 *         401:
 *           description: "Usuario no válido"
 *         500:
 *           description: "Error en campos"         
 */
 app.post('/login', function (req, res) {
    // Deslogueo
    loggedUserId = null;
    loggedUserIsAdmin = false;

    // Ambos campos son obligatorios
    if(req.body.username == null || req.body.password == null) {
        res.status(500).send({ result: `Los campos username y password son obligatorios.`});
        return;
    }

    let index = arrayUsers.findIndex( e => e.username == req.body.username || e.email == req.body.username);
    
    // Si el usuario no existe, el password no es válido o el usuario no está activo
    if(index == -1 || arrayUsers[index].password != req.body.password || arrayUsers[index].isActive == false){
        res.status(401).send({ result: `El usuario y/o password son inválidos.` });       
        return;
    }
    
    // Si pasó validación, guardo el Id del usuario.
    loggedUserId = arrayUsers[index].id;
    loggedUserIsAdmin = arrayUsers[index].isAdmin;

    res.status(200).send({ result: `Sesión iniciada`, user: arrayUsers[index]});
});

/**
* @swagger 
* /login:
*    get:
*       summary: "Verificar sesión."
*       description: "Indica si hay sesión iniciada."
*       responses:
*         200:
*           description: "Sesión iniciada."      
*         401:
*           description: "Sesión no iniciada."    
*/
app.get('/login', function (req, res) {
    if(loggedUserId != null) {
        let index = arrayUsers.findIndex( e => e.id == loggedUserId);
        res.status(200).send({ result: `Sesión iniciada`, user: arrayUsers[index]}); 
    } else {
        res.status(401).send({result: `Sesión finalizada.`});
    }
});

/**
* @swagger 
* /logout:
*    post:
*       summary: "Cierra sesión."
*       description: "Cierra sesión."
*       responses:
*         200:
*           description: "Sesión cerrada"        
*/
app.post('/logout', function (req, res) {
    // Deslogueo
    loggedUserId = null;
    loggedUserIsAdmin = false;

    res.status(200).send({result: `Sesión finalizada.`});
});


    /**
   * @swagger 
   * /user:
   *    post:
   *       summary: "Crear usuario."
   *       description: "Se crea usuario."
   *       parameters:
   *       - in: "body"
   *         name: "body"
   *         required: true
   *         schema:
   *            type: "object"
   *            properties:
   *                username:
   *                    type: string
   *                password:
   *                    type: string
   *                fullname:
   *                    type: string
   *                email:
   *                    type: string
   *                address:
   *                    type: string
   *                phone:
   *                    type: string
   *                isAdmin:
   *                    type: boolean
   *       responses:
   *         200:
   *           description: "Usuario creado"
   *         500:
   *           description: "Error en campos"         
   */
    app.post('/user', function(req, res) {
        let index = arrayUsers.findIndex( e => e.username == req.body.username || e.email == req.body.email);

        //Todos los campos son obligatorios
        if(req.body.username == null || req.body.password == null || req.body.fullname == null || req.body.phone == null || req.body.email == null || req.body.address == null || req.body.isAdmin == null) {
            res.status(500).send({ result: `Todos los campos son obligatorios.`});
        } else if (index != -1 ) {
            res.status(500).send({ result: `El usuario o e-mail ya existen.`});
        } else {
            let user = req.body;
            let newId = Math.max.apply(Math, arrayUsers.map(function(o) { return o.id; })) + 1;
            user.id = newId;
            user.isActive = true;
            arrayUsers.push(user);
            res.status(200).send({result: `Su usuario ha sido creado.`, user: user});
        }

    })

        /**
   * @swagger 
   * /order:
   *    post:
   *       summary: "Crear orden."
   *       description: "Se crea orden."
   *       parameters:
   *       - in: "body"
   *         name: "body"
   *         required: true
   *         schema:
   *            type: "object"
   *            properties:
   *                productIds:
   *                    type: array
   *                    items: 
   *                        type: integer
   *                paymentWayId:
   *                    type: integer
   *       responses:
   *         200:
   *           description: "Orden creada"
   *         500:
   *           description: "Error en campos"
   *         401 :
   *           description: "Usuario no logueado"          
   */
    app.post('/order', isLogged, function(req, res) {
       
        //Todos los campos son obligatorios
        if(req.body.productIds == null || req.body.paymentWayId == null) {
            res.status(500).send({ result: `Todos los campos son obligatorios.`});
        } else {
            let order = req.body;
            let newId = ( arrayOrders.length == 0 ? 1 : Math.max.apply(Math, arrayOrders.map(function(o) { return o.id; })) + 1);
            order.id = newId;
            order.creationDate = new Date();
            order.userId = loggedUserId;
            order.statusId = 1;
            arrayOrders.push(order);
            res.status(200).send({result: `Su orden ha sido creada.`, order: order});
        }

    })

/**
* @swagger 
* /order:
*    get:
*       summary: "Ver Historial."
*       description: "Se ve historial. Si es Admin ve historial completo."
*       responses:
*         200:
*           description: "Ordenes pedidas"
*         404 :
*           description: "Usuario no puede ver ordenes"          
*/
app.get('/order', isLogged, function(req, res) {
    let orderResult;
    if(loggedUserIsAdmin) {
        orderResult = arrayOrders;
    } else {
        orderResult = arrayOrders.filter(x => x.userId == loggedUserId );
    }
    if(orderResult.length == 0){
        res.status(404).send({ result: `No hay Ordenes para este Usuario` });
    } else {
        res.status(200).send({ result: `Ordenes Pedidas`, orders: orderResult});
    }

})

    /**
* @swagger 
* /order:
*    put:
*       summary: "Modificar orden."
*       description: "Si es Admin, modifica estado de orden"
*       parameters:
*       - in: "body"
*         name: "body"
*         required: true
*         schema:
*            type: "object"
*            properties:
*                orderId:
*                    type: integer
*                statusId:
*                    type: integer
*       responses:
*         200:
*           description: "Ordenes modificada"
*         404 :
*           description: "ID inexistente"          
*/
app.put('/order', isAdmin, function(req, res) {
    let index = arrayOrders.findIndex( e => e.id == req.body.orderId);   
    
    if(index == -1){
        res.status(404).send({ result: `No existe orden con ID requerido.` });
    }

    arrayOrders[index].statusId = req.body.statusId;
    res.status(200).send({ result: `Estado modificado`, orders: arrayOrders[index]});

})
    /**
* @swagger 
* /product:
*    post:
*       summary: "Crear producto."
*       description: "Si es Admin, crea un producto"
*       parameters:
*       - in: "body"
*         name: "body"
*         required: true
*         schema:
*            type: "object"
*            properties:
*                name:
*                    type: string
*                description:
*                    type: string
*                price:
*                    type: number
*                photoUrl:
*                    type: string
*       responses:
*         200:
*           description: "Producto creado"
*         500 :
*           description: "Faltan campos obligatorios"         
*/
app.post('/product', isAdmin, function(req, res) {

        //Todos los campos son obligatorios
        if(req.body.name == null || req.body.description == null || req.body.price == null || req.body.photoUrl == null) {
            res.status(500).send({ result: `Todos los campos son obligatorios.`});
        } else {
            let product = req.body;
            let newId = Math.max.apply(Math, arrayProducts.map(function(o) { return o.id; })) + 1;
            product.id = newId;
            arrayProducts.push(product);
            res.status(200).send({result: `Su producto ha sido creado.`, product: product});
        }

})
    /**
* @swagger 
* /product:
*    put:
*       summary: "Modificar producto."
*       description: "Si es Admin, modifica estado producto"
*       parameters:
*       - in: "body"
*         name: "body"
*         required: true
*         schema:
*            type: "object"
*            properties:
*                id:
*                    type: integer
*                name:
*                    type: string
*                description:
*                    type: string
*                price:
*                    type: number
*                photoUrl:
*                    type: string
*       responses:
*         200:
*           description: "Producto modificado"
*         404 :
*           description: "ID inexistente"          
*/
app.put('/product', isAdmin, function(req, res) {
    let index = arrayProducts.findIndex( e => e.id == req.body.id);   
    
    if(index == -1){
        res.status(404).send({ result: `No existe producto con ID requerido.` });
    }

    arrayProducts[index] = req.body;
    res.status(200).send({ result: `Producto modificado`, product: arrayProducts[index]});

})
    /**
* @swagger 
* /product:
*    delete:
*       summary: "Eliminar producto."
*       description: "Si es Admin, elimina producto"
*       parameters:
*       - in: "body"
*         name: "body"
*         required: true
*         schema:
*            type: "object"
*            properties:
*                id:
*                    type: integer
*       responses:
*         200:
*           description: "Producto eliminado"
*         404 :
*           description: "ID inexistente"          
*/
app.delete('/product', isAdmin, function(req, res) {
    let index = arrayProducts.findIndex( e => e.id == req.body.id);   
    
    if(index == -1){
        res.status(404).send({ result: `No existe producto con ID requerido.` });
    }

    arrayProducts.splice(index, 1);
    res.status(200).send({ result: `Producto eliminado` });

})
// Listen

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    app.listen(5000, function() {
        console.log('Escuchando el puerto 5000!');
    });

