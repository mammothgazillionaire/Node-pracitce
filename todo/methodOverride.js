// module.exports = function(key){
//   key = key || "_method";
//   return function methodOverride(req, res, next) {
//     var method;
//     req.originalMethod = req.originalMethod || req.method;
    
//     // req.body
    
//     if (req.body && typeof req.body === 'object' && key in req.body) {
//       method = req.body[key].toLowerCase();
//       delete req.body[key];
//     }
    
//     // check X-HTTP-Method-Override
    
//     if (req.headers['x-http-method-override']) {
//       method = req.headers['x-http-method-override'].toLowerCase();
//     }
    
//     // replace
    
//     if (supports(method)) req.method = method.toUpperCase();
//     next();
//   };
// };

