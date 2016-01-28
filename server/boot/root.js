module.exports = function(server) {
  var gm = require('gm').subClass({imageMagick: true});
  require('gm-buffer');
  var fs=require('fs');
  var str;
  var index;
  fs.readFile("public/pirello.html", "utf-8", function(err,data){
    //console.log(err);
    //console.log(data);
    str=data;
  } );

  fs.readFile("public/index.html", "utf-8", function(err,data){
    //console.log(err);
    //console.log(data);
    index=data;
  } );
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', function(req, res) {res.send(index)});
  router.get('/png/:id', function(req, res) {



    server.models.sentence.findById(req.params.id).then(function (data) {
      //console.log("hello");
      res.setHeader("Content-type","image/png");
      gm('public/pirellone.jpg')
        .font("/Users/iridium/Downloads/divano/public/fonts/PressStart2P.ttf")
        .fill('#ffff99')
        .fontSize(60)
        .drawText(0, -450, data.row1, 'Center')
        .drawText(0, -340, data.row2, 'Center')
        .drawText(0, -230, data.row3, 'Center')
        .drawText(0, -120, data.row4, 'Center')
        .buffer(function (err, stdout) {
          res.end(stdout);
        });
    }).catch(function (err) {
      res.send(404);
    });





  });

  router.get('/html/:id', function(req, res) {



      var ris = str.replace(/<image>/g, "/png/"+req.params.id);
      res.send(ris);
    });










    server.use(router);
};
