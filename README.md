##Quadkey

A simple module to convert latitude/longitude/levelOfDetail to quadkey

[quadkey?](http://msdn.microsoft.com/en-us/library/bb259689.aspx)


##Global Installation
`npm install -g quadkey`

##Get quadkey from latitude, longitude and levelOfDetail (between 1 and 23)

    var quadkey = require('./lib/quadkey');
    
    console.log(quadkey.toQuaKey(48, 25.2, 23));
