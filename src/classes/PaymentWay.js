class PaymentWay {
    constructor( id, description) {
        this.id = id;
        this.description = description;
    }
}

let arrayPaymentWay = [ new Status(1, 'EFECTIVO'), 
                        new Status(2, 'TARJETA')];

module.exports = { arrayPaymentWay };


