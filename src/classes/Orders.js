class Orders {
    constructor( id, requestTime, productIds, statusId, paymentWayId, userId) {
        this.id = id;
        this.requestTime = requestTime;
        this.productIds = productIds;
        this.statusId = statusId;
        this.paymentWayId = paymentWayId;
        this.userId = userId;
    }
}