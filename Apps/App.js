function meteoriteToEntity(meteorite) {
	var date = new Date(Cesium.defined(meteorite.year) ? meteorite.year : "");	// the year may not be defined in the dataset
	var year = date.getFullYear();
	var mass = Cesium.defined(meteorite.mass) ? Number(meteorite.mass) : 10;	// the mass may not be defined in the dataset

	return new Cesium.Entity({
		id: meteorite.id,
		name: meteorite.name,
		description: '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
		'<tr><th>' + "ID" + '</th><td>' + meteorite.id + '</td></tr>' +
		'<tr><th>' + "Mass" + '</th><td>' + meteorite.mass + '</td></tr>' +
		'<tr><th>' + "Longitude" + '</th><td>' + Number(meteorite.reclong).toFixed(5) + '</td></tr>' +
		'<tr><th>' + "Latitude" + '</th><td>' + Number(meteorite.reclat).toFixed(5) + '</td></tr>' +
		'<tr><th>' + "Year" + '</th><td>' + year + '</td></tr>' +
		'</tbody></table>',
		position: new Cesium.ConstantPositionProperty(Cesium.Cartesian3.fromDegrees(Number(meteorite.reclong), Number(meteorite.reclat))),
		billboard: {
			image: 'SampleData/Meteor2D.png',
			scale: Math.log10(mass) / 6
		},
		properties: {
			fall: meteorite.fall,
			mass: mass,
			nametype: meteorite.nametype,
			recclass: meteorite.recclass,
			year: year
		}
	});
}

var viewer = new Cesium.Viewer('cesiumContainer', {
	animation: false,
	timeline: false,
	shouldAnimate: true
});
viewer.scene.frameState.creditDisplay.destroy();

// Load meteorite landing data
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://data.nasa.gov/resource/y77d-th95.json');
xhr.responseType = 'json';
xhr.send();
xhr.onload = function() {
	var meteorites = xhr.response;

	// Convert to Entities
	for (var i = 0; i < meteorites.length; i++)
		viewer.entities.add(meteoriteToEntity(meteorites[i]));
}
