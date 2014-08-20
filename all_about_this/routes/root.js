// Home page
exports.index = function(request, response){
  response.render('root/index', { title: 'All About This' });
};
