const EventEmitter = require('events');
const handleEmitter = new EventEmitter();
handleEmitter.setMaxListeners(5000);

let map = {};

module.exports = function (options = {}) {
    return async (ctx, next) => {
        let query = ctx.request.query || {};
        let body = ctx.request.body || {};
        let params = Object.assign(query, body);
        let key = Object.keys(params).sort().map((k)=> `${k}=${params[k]}`).join('&');
        key = ctx.method + ':' + ctx.path + ':' + key;
        if(map[key]){
            return ctx.body = await new Promise((resolve)=> {
                // 响应数据
                handleEmitter.once(key, (data)=> { resolve(data);})
            })
        }
        map[key] = true;
        await next();
        handleEmitter.emit(key, ctx.body);
        map[key] = false
    };  
}
