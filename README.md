# uport-demo

https://uportlandia.uport.me  
uport-project/[uportlandia](https://github.com/uport-project/uportlandia)

## data

constants\config.js

http://localhost:3000/city
components\Registration\index.js

 Login with uPort 在 components\Registration\Landing.js <Card> 裡

## aws

C:\Users\jacob.hsu\.aws\credentials

```bash
[default]
aws_access_key_id = your_access_key_id
aws_secret_access_key = your_secret_access_key
```

[設定 AWS 登入資料](https://docs.aws.amazon.com/zh_tw/sdk-for-java/v2/developer-guide/setup-credentials.html)
[security_credentials](https://console.aws.amazon.com/iam/home?#/security_credentials) 存取金鑰
 
AWS Security Token Service (AWS STS) [臨時安全登入資料](https://docs.aws.amazon.com/zh_tw/IAM/latest/UserGuide/id_credentials_temp.html)

安全性、身分與合規 > [Key Management Service](https://console.aws.amazon.com/kms)

[AWS Systems Manager](https://docs.aws.amazon.com/zh_cn/systems-manager/latest/userguide/systems-manager-quick-setup.html)
管理與管控 > [Systems Manager](https://console.aws.amazon.com/systems-manager/)

利用 Parameter Store (`Aws > 管理與管控 > Systems Manager > 參數存放區`) 來儲存 credentials 和 config 等機敏性參數  (`put-parameter`、`get-parameters`)

AWS Systems Manager
> [PutParameter](https://docs.aws.amazon.com/zh_cn/systems-manager/latest/APIReference/API_PutParameter.html)

## fix yarn setup

>  Error: EthrDIDResolver requires a provider configuration for at least one network

node_scripts\create_issuers.js

```js
// https://github.com/uport-project/uport-credentials#uport-credentials-library
const RPC_URL = "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c";

    const credentials = new uport.Credentials({
      appName: app.name,
      did,
      privateKey,
      ethrConfig: {
        rpcUrl: RPC_URL //<--- Required Upgrade to uport-credentials@1.3.0
      }
    });
```

## yarn setup slsDeploy

$ ./node_modules/.bin/sls
生成  node_scripts 
.gitignore serverless.yml handler.js

`serverless.js` 對應 `serverless.yml

```js
  plugins: [
    "serverless-express",
    "serverless-scriptable-plugin",
    "serverless-plugin-include-dependencies",
    "serverless-offline",
    "serverless-stack-output"
  ],
```

`yarn add serverless-express serverless-scriptable-plugin`  
`yarn add serverless-plugin-include-dependencies serverless-offline serverless-stack-output --dev`

node_scripts\deploy_api.js

https://serverless.com/  
`npm install serverless -g` 全域安裝

```js
async function deployAPI() {
  const args = argParse();
  // npm install serverless -g
  await run("sls", [ "deploy", "-v", "-s", args.env ]);
  //await run("./node_modules/.bin/sls", [ "deploy", "-v", "-s", args.env ]);
}
```
