module.exports = {

    save : function(anAgreement) {

        console.log("saving an agreement", anAgreement);
    },

    delete : function(anAgreement) {
        console.log("delete ");
    },

    update : function(anAgreement) {
        console.log("update ");
    },

    findAll : function() {
        console.log("findAll ");
    },

    findOne : function(agreementID) {
        console.log("findOne ");
    }

}