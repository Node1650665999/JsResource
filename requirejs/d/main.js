//define('mod1',[],function(){
//	return 9;
//});	

require(['../t/mod1','require'],function(mod1,require){
	console.log(mod1+1);					//		2
//	var u = require.toUrl('../test.css');    //		d/test.css
//	console.log(u);
});