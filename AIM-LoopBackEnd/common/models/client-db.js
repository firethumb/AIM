'use strict';

module.exports = function(Clientdb) {
    delete Clientdb.models.people.validations.email;


};
