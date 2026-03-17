var api   = require('./api.js').app;
var users = require('./users.json');

// GET — citește toți userii
api.get('/users', function(request, response) {
  response.json(users);
});

// PUT — adaugă user nou
api.put('/users', function(request, response) {
  users[users.length] = request.body;
  response.json('User was saved succesfully');
});

// POST — modifică user existent
api.post('/users/:index', function(request, response) {
  users[request.params.index] = request.body;
  response.json('User updated');
});

// DELETE — șterge user
api.delete('/users/:index', function(request, response) {
  users.splice(request.params.index, 1);
  response.json('User deleted');
});

api.listen(3000, function() {
  console.log('Server pornit pe portul 3000...');
});