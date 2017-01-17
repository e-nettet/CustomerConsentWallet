import Ember from "ember";

export default Ember.Object.extend({

  stateStr: function () {    
    switch (parseInt(this.get("state"), 10)) {
      case 0:
        return "REQUESTED";
      case 1:
        return "GIVEN";
      case 2:
        return "REVOKED";
      case 3:
        return "REJECTED";
      case 4:
        return "DATA REQUESTED";
      case 5:
        return "DATA PROVIDED";
      default:
        return "UNKNOWN";
    }
  }.property('state')
});
