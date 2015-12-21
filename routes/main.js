var app = module.parent.exports.app;
var passport = module.parent.exports.passport;
var Employees = require('../models/employees.js');
var Admins = require('../models/admins.js');

var adminAuth = function (req, res, next) {
  if(typeof req.user != "undefined"){
    next();
  }else{
    res.redirect('/');
  }
}

app.get('/login', function(req, res){
  res.render('login', { title: 'Login'});
});

app.post('/login', passport.authenticate('AdminLogin', 
  { successRedirect: '/panel',
    failureRedirect: '/login',
    failureFlash: true }));

app.get('/panel', adminAuth, function(req, res){
  var msg = req.flash('message');
  Employees.find({}, function(err, docs){
    res.render('panel', { title: 'Panel', employees: docs, flashmsg: msg});
  });
});

app.get('/panel/employees/new', adminAuth, function(req, res){
  req.flash('message', 'Sección: Nuevo empleado.');
  res.render('new', { title: 'New'});
});

app.post('/panel/employees/new', adminAuth, function(req, res){
  console.log(req.body);
  var e = new Employees({ name: req.body.name,
                        lastName: req.body.lastName,
                        email: req.body.email
                      });

    e.save(function(err, doc){
      if(!err){
        res.redirect('/panel');
      } else {
        res.end(err);
      }
    });
});

app.get('/panel/employees/delete/:id', adminAuth, function (req, res) {
  Employees.remove({_id: req.params.id}, function (err, doc) {
    if(!err){
      res.redirect('/panel');
    }else{
      res.end(err);
    }
  });
});

app.get('/panel/employees/edit/:id', adminAuth, function (req, res){ 
  Employees.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit', employee: doc});
        } else {
            res.end(err);    
        }    
    });
});

app.post('/panel/employees/edit/:id', adminAuth, function (req, res) {
  Employees.findOne({ _id: req.params.id }, function (err, doc) {
    if(!err){
      doc.name = req.body.name;
      doc.lastName = req.body.lastName;
      doc.email = req.body.email;
      doc.save(function (err, doc) {
        if(!err){
	  res.redirect('/panel');
        }else{
          res.end(err);
        }
      });
    }else{
      res.end(err);
    }
  });
});
