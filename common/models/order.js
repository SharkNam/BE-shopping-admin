'use strict';
const _ = require('lodash')
const app = require('../../server/server')
//chua lay duoc req body, ko lam gi duoc
module.exports = function (Order) {
    Order.observe("after save", async ctx => { //hook khi 1 record dc luu, befo
        const ModelOrderItem = app.models.OrderItem
        const products = _.get(ctx, 'options.req.body.products', []) //chay theo duong dan, neu ko co tra ve undefine
        //lodash thay the cho if neu dung if phai dung & nhieu lan
        const instance = ctx.instance; //order ins

        await products.forEach(async prod => {
            await ModelOrderItem.create({ //1 dong
                orderId: instance.__data.id, //instance.id - instance.__data.id,
                productId: prod.productId,
                quantily: prod.quantily
            })
        })
    })
    /**
     * @todo sau khi thuc hien post order --> lay duoc chi tiet 1 cai order
     * bao gom accountId, id products kem quantily
     * 
     */

    /**
     * @todo khi thuc hien Get/orders/id --> lay duoc chi tiet 1 cai order
     * bao gom accountId, id, products kem quantily
     */

    //lay gia tri output : remote
    Order.afterRemote("findById", async ctx => {
        const result = ctx.result;
        // const products = await result.products.find(); lay nhung ko co so luong
        const ModelOrderItem = app.models.OrderItem
        const orderItems = await ModelOrderItem.find({ where: { orderId: result.__data.id } })

        const productList = [];
        for (let i = 0; i < orderItems.length; i++) {
            const item = orderItems[i];
            const detailItem = await item.product.get()
            productList.push({
                ...detailItem.__data, quantily: item.__data.quantily
            })
        }
        // console.log(productList)
        const totalPrice = productList
            .map(prod => prod.price * prod.quantily)
            .reduce((a, b) => a + b, 0);
        result.__data.productList = productList;
        result.__data.totalPrice = totalPrice;
    })
};
