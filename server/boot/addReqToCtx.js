//code trong thu muc boot nay chay dau tien khi app duoc khoi tao, chay theo thu tu bang chu cai
const _ = require('lodash')
module.exports = (app) => { //remote vs phase
    app.remotes()
        .phases.addBefore('invoke', 'add-request-to-context')
        .use(function (ctx, next) {
            _.set(ctx, "args.options.req", ctx.req)
            _.set(ctx, "args.options.res", ctx.req)
            next();
        })

}