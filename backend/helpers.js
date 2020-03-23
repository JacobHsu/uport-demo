const readline = require("readline");
const args = require("commander");

module.exports.argParse = function argParse() {
    // 初始化自定義參數對象，設置“關鍵字”和“描述”
    args.option("--env <n>", "env").parse(process.argv);
    if(!args.env) {
      console.error("--env missing");
      process.exit(1);
    }
    if(!["stage", "prod"].find(s => s === args.env)) {
      console.error("--env must be one of stage, prod ")
      process.exit(1);
    }
    return args;
}

module.exports.getInput = async function getInput(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise((resolve, reject) => {
      rl.question(message, response => {
        rl.close();
        resolve(response);
      });
    });
}