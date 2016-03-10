	
	var testStr="this is test modules";
	exports.teststr=testStr;
	if (module===require.main) 
		{
			console.log("this is a mainModule");
		};
		// console.log(__);

