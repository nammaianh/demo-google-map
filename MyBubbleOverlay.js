/**
 * Create a new instance of MyBubbleOverlay and put the overlay onto the map
 *
 * @param map
 * @param latLng
 * @param stars
 * @param price
 * @constructor
 */
var MyBubbleOverlay = function (map, latLng, stars, price, isBlurred) {

    this.setMap(map);

    this._latLng    = latLng;
    this._stars     = stars;
    this._price     = price;
    this._isBlurred = isBlurred == null ? false : isBlurred;

    this._elmt = null;
};

//
// Let MyBubbleOverlay class extends google.maps.OverlayView interface
//
MyBubbleOverlay.prototype = new google.maps.OverlayView();

MyBubbleOverlay.prototype._createElement = function () {

    var bubble = $("<div class='bubble'>").toggleClass("bubble-blurred", this._isBlurred);

    var stars = $("<div class='bubble-stars'>");
    var starsCount = this._stars;
    stars.append((function () {
        var starElmts = [];
        for (var i = 0; i < starsCount; ++i, starElmts.push($("<i class='bubble-star glyphicon glyphicon-star'>")));
        return starElmts;
    })());
    stars.appendTo(bubble);

    var price = $("<div class='bubble-price'>");
    price.html(this._price);
    price.appendTo(bubble);

    return bubble[0];
}

MyBubbleOverlay.prototype.onAdd = function () {

    var elmt = this._createElement();

    this._elmt = elmt;

    // Push the overlay to the overlay-layer pane
    this.getPanes().overlayLayer.appendChild(elmt);
};

MyBubbleOverlay.prototype.onRemove = function () {
    this._elmt.parentNode.removeChild(this._elmt);
    this._elmt = null;
};

MyBubbleOverlay.prototype.draw = function () {

    var projection = this.getProjection();
    var pixelLocation = projection.fromLatLngToDivPixel(this._latLng);

    // Put the element at the position calculated by pixel on the map
    var elmt = $(this._elmt);
    elmt.css({
        left:   pixelLocation.x + "px",
        top:    pixelLocation.y + "px"
    });
};
