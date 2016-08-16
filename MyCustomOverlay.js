/**
 * MyCustomOverlay class' constructor
 *
 * @param map
 * @param latLng
 * @param options
 * @constructor
 */
var MyCustomOverlay = function (map, latLng, options) {

    this.setMap(map);

    this._latLng    = latLng;
    this._options   = options ? options : {};

    this._elmt = null;
};

//
// Let MyCustomOverlay class extends google.maps.OverlayView interface
//
MyCustomOverlay.prototype = new google.maps.OverlayView();

MyCustomOverlay.prototype._createElement = function () {

    var elmt = document.createElement("div");
    elmt.classList.add("my-custom-marker");

    var avatar = document.createElement("img");
    avatar.src = "avatar.jpeg";
    avatar.classList.add("avatar");
    elmt.appendChild(avatar);

    return elmt;
};

MyCustomOverlay.prototype.onAdd = function () {

    var elmt = this._createElement();

    this._elmt = elmt;

    // Add the element to the overlayLayer pane
    this.getPanes().overlayLayer.appendChild(elmt);
};

MyCustomOverlay.prototype.onRemove = function () {
    this._elmt.parentNode.removeChild(this._elmt);
    this._elmt = null;
};

MyCustomOverlay.prototype.draw = function () {

    var projection = this.getProjection();
    var pixelLocation = projection.fromLatLngToDivPixel(this._latLng);

    // Put the element at the position calculated by pixel on the map
    var elmt = this._elmt;
    elmt.style.left     = pixelLocation.x + "px";
    elmt.style.top      = pixelLocation.y + "px";
};
