const { argParse, run } = require("./helpers");
// ref: serverless.js  
// plugins: [
//   "serverless-express",
//   "serverless-scriptable-plugin",
//   "serverless-plugin-include-dependencies",
//   "serverless-offline",
//   "serverless-stack-output"
// ],
// require npm serverless , serverless-express
// yarn add serverless-plugin-include-dependencies serverless-offline serverless-stack-output --dev
async function deployAPI() {
  const args = argParse();
  //  npm install serverless -g
  await run("sls", [ "deploy", "-v", "-s", args.env ]);
}

deployAPI();
