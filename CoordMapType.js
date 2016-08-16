function CoordMapType(tileSize) {
    this.tileSize = tileSize;
}

CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var tile = ownerDocument.createElement("div");
    var label = ownerDocument.createElement("span");

    label.innerHTML = coord;
    label.style.display = "inline-block";
    label.style.padding = "5px";
    label.style.backgroundColor = "rgba(0,0,0,0.2)";

    tile.appendChild(label);
    tile.style.width = this.tileSize.width + "px";
    tile.style.height = this.tileSize.height + "px";
    tile.style.fontSize = 12;
    tile.style.borderStyle = 'dashed';
    tile.style.borderWidth = "1px";
    tile.style.borderColor = "lightgray";

    return tile;
};