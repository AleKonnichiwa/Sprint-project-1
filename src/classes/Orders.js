class Orders {
    constructor( id, creationDate, productIds, statusId, paymentWayId, userId) {
        this.id = id;
        this.creationDate = creationDate;
        this.productIds = productIds;
        this.statusId = statusId;
        this.paymentWayId = paymentWayId;
        this.userId = userId;
    }
}

let arrayOrders = [];

module.exports = { arrayOrders };