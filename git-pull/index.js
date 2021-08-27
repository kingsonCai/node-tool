// 本程序的作用是在当前目录遍历下一层所有的目录，执行指定的命令，默认是检出git的master分支并拉取代码
// 执行的命令可以根据自己的需求定制，比如合并代码
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// 执行命令
let cmd = process.argv[2] || 'git checkout master && git pull';
let dirs = process.argv[3]? process.argv[3].split(',') : null

// 没有指定目录则选择所有目录
dirs = dirs || fs.readdirSync('.').
    filter(d=> d.indexOf('.') !== 0 && fs.statSync(d).isDirectory());

(async function(){
    for(let d of dirs) {
        console.log('*****************************************************')
        console.log('dir:', d);
        try{
            const {stdout,stderr} = await exec(`cd ${d} && ${cmd} && cd ..`);
            stderr && console.error('stderr:', stderr);
            stdout && console.log('stdout:', stdout);
        }catch(err){
            console.log('exec err:', err.message);
        }
    }
})()
