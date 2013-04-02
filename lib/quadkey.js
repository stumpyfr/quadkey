var MinLatitude = -85.05112878;
var MaxLatitude = 85.05112878;
var MinLongitude = -180;
var MaxLongitude = 180;

exports.toQuaKey = function(lat, lon) {
	return toQuaKey(lat, lon, 23);
}

exports.toQuaKey = function(lat, lon, levelOfDetail) {
	if (levelOfDetail < 1 || levelOfDetail > 23)
		throw "levelOfDetail needs to be between 1 and 23";

	var pixelXY = latLongToPixelXY(lat, lon, levelOfDetail);
	var tileXY = pixelXYToTileXY(pixelXY.pixelX, pixelXY.pixelY);
	return tileXYToQuadKey(tileXY.tileX, tileXY.tileY, levelOfDetail);
}

function Clip(n, minValue, maxValue)
{
    return Math.min(Math.max(n, minValue), maxValue);
}

function MapSize(levelOfDetail)
{
 	if (levelOfDetail == 23)
 		return 2147483648;
    return 256 << levelOfDetail;
}

function tileXYToQuadKey(tileX, tileY, levelOfDetail)
{
    var quadKey = "";
    for (var i = levelOfDetail; i > 0; i--)
    {
        var digit = 0;
        var mask = 1 << (i - 1);
        if ((tileX & mask) != 0)
        {
            digit++;
        }
        if ((tileY & mask) != 0)
        {
            digit++;
            digit++;
        }
        quadKey += digit;
    }
    return quadKey;
}

function pixelXYToTileXY(pixelX, pixelY)
{
    return {tileX : pixelX / 256, tileY : pixelY / 256}
}

function latLongToPixelXY(lat, lon, levelOfDetail){
    lat = Clip(lat, MinLatitude, MaxLatitude);
    lon = Clip(lon, MinLongitude, MaxLongitude);

    var x = (lon + 180) / 360; 
    var sinLatitude = Math.sin(lat * Math.PI / 180);
    var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

    var mapSize = MapSize(levelOfDetail);
    var pixelX = Clip(x * mapSize + 0.5, 0, mapSize - 1);
    var pixelY = Clip(y * mapSize + 0.5, 0, mapSize - 1);

    return {pixelX : Math.floor(pixelX), pixelY : Math.floor(pixelY)}
}
