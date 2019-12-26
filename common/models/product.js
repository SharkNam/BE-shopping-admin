'use strict';

module.exports = function (Product) {
    Product.beforeRemote("find", async ctx => {

    })

    Product.afterRemote("find", async ctx => {
        const result = ctx.result;
        for (let i = 0; i < result.length; i++) { //toan bo product tra ve la 1 mang
            const prod = result[i];
            const cate = await prod.category.get();
            if (cate) result[i].__data.categoryName = cate.__data.name
        }
        ctx.result = result;
    })

    Product.afterRemote("findById", async ctx => {
        const result = ctx.result
        const category = await result.category.get();
        if (category) result.__data.categoryName = category.__data.name;
        ctx.result = result;
    })

    Product.afterRemote("create", async ctx => {
        const result = ctx.result
        const category = await result.category.get();
        if (category) result.__data.categoryName = category.__data.name;
        ctx.result = result;
    })

    Product.afterRemote("replaceById", async ctx => {
        const result = ctx.result
        const category = await result.category.get();
        // console.log(category);
        if(category) result.__data.categoryName = category.__data.name;
        ctx.result = result;
    })
};
