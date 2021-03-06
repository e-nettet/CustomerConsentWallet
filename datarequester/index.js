"use strict";

const Web3 = require('web3');
const ConsentLib = require('consentlib');
const Solc = require('solc');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let whisper = new ConsentLib.Whisper(web3);
let consentFlow = new ConsentLib.ConsentFlow(web3, whisper, Solc);

let email = process.argv[2];
let passphrase = process.argv[3];
let identity = whisper.newIdentity();
let address = process.argv[4];
let ttl = 100;
let priority = 100;
let consentId = consentFlow.newConsentId();
let customerEmail = process.argv[5];
let ownerEmail = process.argv[6];

web3.personal.unlockAccount(address, passphrase);
web3.eth.defaultAccount = address;

consentFlow.discoverIdentityService((err, result, idServiceAddress) => {

    setTimeout(() => consentFlow.registerWhisperId(identity, idServiceAddress, email, ttl, priority), 200);

    setTimeout(() => {
        consentFlow.lookupWhisperIds(identity, idServiceAddress, [
            ownerEmail,
            customerEmail
        ], ttl, priority, 9000).then((whisperIds) =>
            consentFlow.lookupEthAddresses(identity, whisperIds, ttl, priority, 9000)
        ).then((ethAddresses) =>
            consentFlow.requestConsent(ethAddresses.get(customerEmail), ethAddresses.get(ownerEmail), consentId)
        )
    }, 1000);
});

setTimeout(() => consentFlow.consentGiven(consentId).then((result) => consentFlow.requestData(result.args.customer, result.args.data_owner, result.args.id.toString(10))), 1000);
setTimeout(() => consentFlow.dataProvided(consentId).then((result) => console.log(result)), 1000);
