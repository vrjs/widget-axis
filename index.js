/* Code adapted from https://github.com/sole/three.js-tutorials/tree/master/drawing_the_axes
*/


module.exports = function(three) {
	return {
		THREE : three, 
		make : function (options) {
			return buildAxes(this.THREE, 
				options && options.length || 250, 
				options && options.neg || false);
		}
	}
};

function buildAxes( THREE, length, neg ) {
	var axes = new THREE.Object3D();
	axes.add( buildAxis(THREE, new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
	if ( neg) axes.add( buildAxis(THREE,  new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
	axes.add( buildAxis(THREE,  new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
	if ( neg) axes.add( buildAxis(THREE,  new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
	axes.add( buildAxis(THREE,  new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
	if ( neg) axes.add( buildAxis(THREE,  new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z
	return axes;
}
function buildAxis( THREE, src, dst, colorHex, dashed ) {
	var geom = new THREE.Geometry(),mat; 
	if(dashed) {
		mat = new THREE.LineDashedMaterial({ linewidth: 20, color: colorHex, dashSize: 3, gapSize: 3 });
	} else {
		mat = new THREE.LineBasicMaterial({ linewidth: 20, color: colorHex });
	}
	geom.vertices.push( src.clone() );
	geom.vertices.push( dst.clone() );
	geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines
	var axis = new THREE.Line( geom, mat, THREE.LinePieces );
	return axis;
}