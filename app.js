var express = require("express"),
	app		= express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get("/", function(req, res){
	res.render("index");
});

app.listen(3000, process.env.IP, function(){
	console.log("server listening on PORT 3000");

});