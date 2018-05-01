
var Agreement = require('./agreement.js');
var agreementService = require('./agreement.service.js');

module.exports = {

    save : function(req, res) {

        agreementService.save(new Agreement(11, 'ext11', 'int11'));
        console.log("save ");

    },

    delete : function(req, res) {
        console.log("delete ");
    },

    update : function(req, res) {
        console.log("update ");
    },

    findAll : function(req, res) {
        console.log("findAll ");
    },

    findOne : function(req, res) {
        console.log("findOne ");
    }

}