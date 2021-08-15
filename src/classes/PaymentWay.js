class PaymentWay {
    constructor( id, description) {
        this.id = id;
        this.description = description;
    }
}

let arrayPaymentWay = [ new PaymentWay(1, 'EFECTIVO'), 
                        new PaymentWay(2, 'TARJETA')];

module.exports = { arrayPaymentWay };


