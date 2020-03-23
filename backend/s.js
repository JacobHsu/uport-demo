const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

const Credentials = require("uport-credentials").Credentials; // const { Credentials } = require('uport-credentials');
const RPC_URL = "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c";

const app = express()
app.use(cors());
app.use(bodyParser.json());
//console.log(Credentials.createIdentity()); 

//setup Credentials object with newly created application identity.
const credentialsDmeo = new Credentials({
    appName: 'Login Example',
    did: 'did:ethr:0x8bf97e8e7edc246454d89386e7bdcea5b091e775',
    privateKey: 'abfc7c3b671cd12c0e537f115838f0a7879014d6e4e46c734520ec2ea5adfcd9',
    ethrConfig: {
        rpcUrl: RPC_URL
    }
})
// console.log('Credentials:', credentialsDmeo); 

// const ISSUERS = JSON.parse(process.env.ISSUERS); // setup.js

const getCredentials = (serviceId) => {
  // if(!ISSUERS[serviceId])
  //   throw new Error("Invalid serviceId");
  return new Credentials({
    did: 'did:ethr:0x1915ad2a0574ff1207d5845a052f44448db034a0' ,// ISSUERS[serviceId].did,
    privateKey: 'c3a48bc340a1c000aa9a2b0978e88249ff8dc94629c986f5d50cd751855d50cd75185fc8aa4', //ISSUERS[serviceId].key,
    ethrConfig: {
      rpcUrl: RPC_URL
    }
  });
}

app.get("/api/ping", (req, res) => {
    console.log(111);
    res.send("OK");
});

app.post("/api/request_disclosure", async (req, res) => {
    console.log("/api/request_disclosure--")
    console.log(req.body); 
    
    const {
      serviceId,
      requested=["name"],
      verified=[],
      notifications=false,
      callbackUrl,
      expiresIn=600
    } = req.body;
    const credentials = getCredentials(serviceId);
    //console.log(credentials); 

    // res.json(req.body);
    // {"serviceId":"CITY_ID","requested":["name"],"verified":["Uportlandia City ID"],"notifications":true,"callbackUrl":"https://api.uport.space/chasqui/topic/rpCCO_FhI","expiresIn":120}

    // https://developer.uport.me/credentials/requestverification#request-verifications
    const jwt = await credentials.createDisclosureRequest({
      requested,
      verified,
      notifications,
      callbackUrl,
      accountType: "none"//,
      // vc: ISSUERS[serviceId].vc
    }, expiresIn);
    res.json({ jwt });

    // eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1ODQ5NTQ5MDYsImV4cCI6MTU4NDk1NTAyNiwicmVxdWVzdGVkIjpbIm5hbWUiXSwidmVyaWZpZWQiOlsiVXBvcnRsYW5kaWEgQ2l0eSBJRCJdLCJwZXJtaXNzaW9ucyI6WyJub3RpZmljYXRpb25zIl0sImNhbGxiYWNrIjoiaHR0cHM6Ly9hcGkudXBvcnQuc3BhY2UvY2hhc3F1aS90b3BpYy9yUTEtMVpSUzkiLCJhY3QiOiJub25lIiwidHlwZSI6InNoYXJlUmVxIiwiaXNzIjoiZGlkOmV0aHI6MHgxOTE1YWQyYTA1NzRmZjEyMDdkNTg0NWEwNTJmNDQ0NDhkYjAzNGEwIn0.izYqn7MHuPmLrpwGM5GxMKDVzaCuWQG1g1wHAWnqG_WrSJ37YJC338GQloPgrgUrZkYwzaSxiURTmEvA88-eHQA

});

app.get('/', (req, res) => res.send('Hello world!'))

const port = process.env.PORT || 3001
app.listen(port, () => 
    console.log(`Server is listening on port ${port}.`)
)