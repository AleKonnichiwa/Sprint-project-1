class Status {
    constructor( id, description) {
        this.id = id;
        this.description = description;
    }
}

let arrayStatus = [ new Status(1, 'NUEVO'), 
                    new Status(2, 'CONFIRMADO'),
                    new Status(3, 'PREPARANDO'),
                    new Status(4, 'ENVIADO'),
                    new Status(5, 'CANCELADO'),
                    new Status(6, 'ENTREGADO')];

module.exports = { arrayStatus };


