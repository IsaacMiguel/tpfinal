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

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.get('/login', function(req, res){
  res.render('login', { title: 'Login'});
});

app.post('/login', passport.authenticate('AdminLogin',
  { successRedirect: '/panel',
    failureRedirect: '/login',
    failureFlash: true }));

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

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
                        email: req.body.email,
			password: req.body.password
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

app.get('/employee/search', adminAuth, function (req, res) {
  //res.render('search', { title: 'Employee Wiki' });
  // { type: 'password'}, { type:0 }
  res.render('search', { title: 'Employee Wiki' } );
});

app.post('/employee/search/:key', adminAuth, function (req, res) {
  Employees.find({ name: new RegExp(".*"+req.params.key+".*")}, function (err, docs) {
    res.json(docs);
  });
});
