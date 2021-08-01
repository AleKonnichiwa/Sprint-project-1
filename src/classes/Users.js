class Users {
    constructor( id, username, password, fullname, phone, email, address, isAdmin) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.isAdmin = isAdmin;
    }
}

let arrayUsers = [ new Users (1,'admin', '1234', 'Administrador', '452020', 'gonzalez.ma.arg@gmail.com', 'Falsa 123', true),
                    new Users (2,'gustavo', 'lalala', 'Gustavo', '452121', 'gustavo@gmail.com', 'San Martin 2022', false),
                    new Users (3,'javier', 'trulala', 'Javier', '452222', 'Javier@gmail.com', 'San Fernanado 47', false)];


console.log('Informacion de usuarios cargada');
module.exports = { arrayUsers };

