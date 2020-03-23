//const {Credentials} = require("uport-credentials")
//console.log(Credentials.createIdentity()); 


// create_issuers.js
const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");
const uport = require("uport-credentials");
const { did, privateKey } = uport.Credentials.createIdentity();
console.log(did, privateKey);

const app = {
    id: "CITY_ID",
    name: "The City of uPortlandia",
    url: {
      stage: "https://uportlandia.uport.space/city",
      prod: "https://uportlandia.uport.me/city"
    },
    profileImage: "src/images/city-logo.png"
};

async function uploadAppImage (filePath) {
    const profileImage = fs.readFileSync(filePath);
    const result = await ipfsAdd(profileImage);
    return `/ipfs/${result}`;
}

async function ipfsAdd (data) {
    const formData = new FormData();
    formData.append("file", data);
    const resp = await fetch("https://ipfs.infura.io:5001/api/v0/add?pin=true", {
      method: "post",
      body: formData
    });
    if(resp.ok) {
      return (await resp.json()).Hash;
    }
    const err = resp.text();
    throw new Error(err);
}

async function createIssuer (app, env) {
    const profileImage = await uploadAppImage(app.profileImage);
    const profile = {
        name: app.name,
        url: app.url[env],
        profileImage: {
        "/": profileImage
        }
    };

    //console.log(profile) //https://uportlandia.uport.space/city/ipfs/Qmd5mTSERUJKGQjhRuJTktv5yURtcuwE9VcoTYPbTzNQub

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
    // console.log(credentials) 

    const jwt = await credentials.createVerification({
        sub: did,
        claim: profile
      });
    const buffer = Buffer.from(jwt);
    const hash = await ipfsAdd(buffer);
    const data = {
        did,
        key: privateKey,
        vc: [ `/ipfs/${hash}` ]
    };
    return {
        [app.id]: data
    };
}

createIssuer(app, 'stage')

/*
const Credentials = require("uport-credentials").Credentials;
// console.log(Credentials.createIdentity);  // [Function]

const RPC_URL = "https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c";

//setup Credentials object with newly created application identity.
const credentialsDmeo = new Credentials({
    appName: 'Login Example',
    did: 'did:ethr:0xda0aa90ff65663fdda8e40d2f5b81a6c43068884',
    privateKey: '67f25fd8337257c0771990a9da2523207428c4d2689bc0fbd9d42dc2330c2af6',
    ethrConfig: {
        rpcUrl: RPC_URL
    }
})
console.log('Credentials:', credentialsDmeo); 
*/