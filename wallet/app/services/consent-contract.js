import Ember from 'ember';

export default Ember.Service.extend({
  web3: Ember.inject.service(),
  contractAddress: '0x93F231fBeFE32D54A38690ddaA425222Cab7e957',
  abi: [ { "constant": false, "inputs": [ { "name": "customer", "type": "address" }, { "name": "data_owner", "type": "address" }, { "name": "id", "type": "bytes16" } ], "name": "requestConsent", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "bytes16" } ], "name": "id_mapping", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "data_requester", "type": "address" }, { "name": "data_owner", "type": "address" }, { "name": "id", "type": "bytes16" } ], "name": "giveConsent", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "customer_mapping", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getConsent", "outputs": [ { "name": "", "type": "address", "value": "0x20f33d4743731db02b52f1de7fb762ef3fc471e3" }, { "name": "", "type": "address", "value": "0x129d0c1d983262dcee658cacae1db7682330905a" }, { "name": "", "type": "address", "value": "0x129d0c1d983262dcee658cacae1db7682330905a" }, { "name": "", "type": "uint8", "value": "0" }, { "name": "", "type": "bytes16", "value": "0x12300000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "customer", "type": "address" } ], "name": "customerConsents", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "data_requester", "type": "address" }, { "name": "data_owner", "type": "address" }, { "name": "id", "type": "bytes16" } ], "name": "revokeConsent", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "consents", "outputs": [ { "name": "id", "type": "bytes16", "value": "0x12300000000000000000000000000000" }, { "name": "data_requester", "type": "address", "value": "0x0000000000000000000000000000000020f33d47" }, { "name": "customer", "type": "address", "value": "0x3fc471e3000000000000000000000000129d0c1d" }, { "name": "data_owner", "type": "address", "value": "0x2330905a000000000000000000000000129d0c1d" }, { "name": "state", "type": "uint8", "value": "6.8840577665331762960062340143144211974827539722152103940360052033988904091648e+76" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "given", "type": "bool" }, { "indexed": false, "name": "customer", "type": "address" }, { "indexed": false, "name": "data_owner", "type": "address" }, { "indexed": false, "name": "data_requester", "type": "address" }, { "indexed": false, "name": "id", "type": "bytes16" } ], "name": "ConsentGiven", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "customer", "type": "address" }, { "indexed": false, "name": "data_owner", "type": "address" }, { "indexed": false, "name": "data_requester", "type": "address" }, { "indexed": false, "name": "id", "type": "bytes16" } ], "name": "ConsentRevoked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "customer", "type": "address" }, { "indexed": false, "name": "data_owner", "type": "address" }, { "indexed": false, "name": "data_requester", "type": "address" }, { "indexed": false, "name": "id", "type": "bytes16" } ], "name": "ConsentRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "x", "type": "address" } ], "name": "PrintAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "x", "type": "string" } ], "name": "PrintString", "type": "event" } ],

  getConsentContract: function() {
    let web3 = this.get("web3").instance();
    let consent = web3.eth.contract(this.get("abi")).at(this.get("contractAddress"));
    return consent;
  }
});
