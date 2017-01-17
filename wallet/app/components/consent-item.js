import Ember from "ember";

export default Ember.Component.extend({
  web3: Ember.inject.service(),
  consentLib: Ember.inject.service('consent-lib'),

  consent: null,

  init() {
    this._super();
    this.watchUpdates(this.get("consent"));
  },

  rejected: function(errorMsg) {
    console.error(errorMsg);
    alert("Updating consent failed: " + errorMsg);
  },

  watchUpdates: function (consent) {
    let web3 = this.get("web3").instance();
    let contract = this.get("consentLib").initialize(web3).getConsentContract();
    let event = contract.ConsentUpdated();

    event.watch((error, result) => {
      if (!error) {
        if (result.args.id.toString(10) === consent.id) {
          if (result.args.updated === true && consent.state !== 0) {
            this.set("consent.state", result.args.state.toString(10));
          }
          if (result.args.state.toString(10) === "5") {
            event.stopWatching();
          }
        }
      } else {
        console.error(error);
        event.stopWatching();
      }
    });
  },

  updateConsent: function(state) {
    let web3 = this.get("web3").instance();
    let contract = this.get("consentLib").initialize(web3).getConsentContract();
    let gasPrice = 50000000000;
    let gas = 500000;

    return new Ember.RSVP.Promise((resolve, reject) => {
      contract.updateConsent(web3.toHex(this.get("consent.owner")), web3.toHex(this.get("consent.requester")), web3.toHex(this.get("consent.id")), state, {
        gas: gas,
        gasPrice: gasPrice
      }, (error, result) => {
        if (error !== null) {
          this.rejected(error);
          reject();
        } else {
          let event = contract.ConsentUpdated();
          event.watch((error, result) => {
            if (!error) {
              if (result.args.id.toString(10) === this.get("consent.id") && result.args.state.toString(10) === state.toString()) {
                if (result.args.updated === true) {
                  this.set("consent.state", result.args.state.toString(10));
                  this.$(".acceptConsent").hide();
                  this.$(".rejectConsent").hide();
                  event.stopWatching();
                  resolve();
                } else {
                  event.stopWatching();
                  this.rejected("Consent could not be updated according to contract specification");
                  reject();
                }
              }
              // else wait for event for this consent
            } else {
              this.rejected(error);
              event.stopWatching();
              reject();
            }
          });
        }
      });
    });
  },

  actions: {
    acceptConsent: function() {
      return this.updateConsent(1);
    },
    rejectConsent: function() {
      return this.updateConsent(3);
    }
  }
});
