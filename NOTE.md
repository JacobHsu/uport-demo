
http://localhost:3001/api/request_disclosure

client
C:\rd\uport-demo\src\sagas\credentials.js

requestDisclosure(action) {

src\server.js

server.js
```js
app.post("/api/request_disclosure", async (req, res) => {
```


${env} 有 prod stage

## Debug

> Error: EthrDIDResolver requires a provider configuration for at least one network

[EthrDIDResolver requires a provider configuration for at least one network #194](https://github.com/uport-project/uport-credentials/issues/194)

 try the [configuration block mentioned in the readme](https://github.com/uport-project/uport-credentials#uport-credentials-library)?

 Starting with version 1.3.0 you are required to specify either a Resolver instance or a valid configuration object for `ethr-did-resolver`

 ```js
// Error: EthrDIDResolver requires a provider configuration for at least one network
const RPC_URL = "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c";

const credentials = new uport.Credentials({
    appName: app.name,
    did,
    privateKey,
    ethrConfig: {
        rpcUrl: RPC_URL
    }
});
 ```
