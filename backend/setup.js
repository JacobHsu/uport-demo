const { argParse, getInput } = require("./helpers");
const { config } = require("../setup_config");
const createIssuers = require("./create_issuers");

async function prerequisites() {
    console.log("Before you proceed:\n");
    console.log("    - save valid AWS credentials in ~/.aws/credentials.",
      "The [default] profile will be used for the setup."
    );
    console.log("    - change setup_config.js to suit your application\n");
    await getInput(" [Ctrl-C] to cancel; To continue with the setup, press [Enter]");
    console.log();
}

// https://docs.aws.amazon.com/zh_tw/systems-manager/latest/userguide/ssm-agent.html
// https://docs.aws.amazon.com/zh_cn/systems-manager/latest/APIReference/API_PutParameter.html
// putParameter()

async function saveIssuerSecrets(env) {
    
    const paramName = config.ssmParam.issuers.replace("${opt:stage}", env)
    const keyId = '12345'; //await getKeyId();
    
    // Create issuer apps
    const issuerData = await createIssuers(env);
    console.log("Issuers created: ");
    console.table(issuerData);
    await getInput("[Ctrl-C] to cancel. To save this to SSM, press [Enter]");
  
    // Save secrets to SSM  
    // await putParameter(
    //     paramName,
    //     JSON.stringify(issuerData),
    //     keyId
    // );

    // Read Server.js  const ISSUERS = JSON.parse(process.env.ISSUERS); did: ISSUERS[serviceId].did,
}

async function setup() {
    const args = argParse();
  
    // Prerequisites
    //await prerequisites();

    // Save issuer secrets in SSM
    await saveIssuerSecrets(args.env);

}


setup();