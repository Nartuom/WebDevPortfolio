var express = require("express"),
	app		= express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get("/", function(req, res){
	res.render("index");
});
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("server listening on PORT 3000");

});