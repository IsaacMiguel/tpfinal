var Employee = require('../models/employees');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tpfinal');

var e = new Employee({  name:"Cristian",
                      lastName: "Cortez",
                      email: "criscortez@gmail.com",
                      password: "cris"
                    });

e.save(function(err, doc){
    console.log(err, doc);
});
