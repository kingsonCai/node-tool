const mergeReq = require('../index')();

for(let i=0; i<100; i++) {
    let ctx = {request:{query:{a:1}}, path:'/test', method:'get'};
    mergeReq(ctx, async function(){
        await sleep(10000);
        return ctx.body = 'success';
    }).then(()=> {
        console.log('ctx.body:', ctx.body);
    })
}

async function sleep(t) {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve();
        },t)
    })
}