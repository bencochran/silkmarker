/*
 * Project: SilkMarker
 * Author: Ben Cochran
 * http://bcochran.github.com/silkmarker/
 * 
 * This class extends the Google Map API's GMarker and adds support of
 * dynamically-created markers based on the Silk Icon set by Mark James.
 *
 * You use it by specifying a baseMarker, which acts as an underlay, and an
 * overlayIcon, which is the icon to place on the underlying marker.
 *
 * See also:
 * http://www.famfamfam.com/lab/icons/silk/
 * http://googlemapsbook.com/2007/03/06/clickable-labeledmarker/
 *
 * --------------------- 
 *
 * Copyright 2009 Carleton College
 * 
 * SilkMarker is released under the MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

function SilkMarker(latlng, options) {
	options = options ? options : {};
	this.latlng = latlng;
	this.overlayIcon = options.overlayIcon || 'star';
	this.baseMarker = options.baseMarker || 'square';
	this.clickable = options.clickable || true;
	
	/* To do here:
	   - make the GIcon use the baseMarker provided
	   - Figure out a way to set iconOffset based on the given marker
	      ... how? dunno. Maybe it would be best to try and design the
	          baseMarkers so they all require the same offset
	   - allow changing the base url for the marker and icon
	*/
	
	// Create the GIcon for the baseMarker	
	var icon = new GIcon(G_DEFAULT_ICON);
    icon.image = "http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png";
	
	/*
	var icon = new GIcon();
	icon.image = "http://bencochran.com/SilkMarker/silkmarker/markers/"+this.baseMarker+".png";
	icon.shadow = "http://bencochran.com/SilkMarker/silkmarker/markers/"+this.baseMarker+"_shadow.png";
	icon.iconSize = new GSize(12, 20);
	icon.shadowSize = new GSize(22, 20);
	icon.iconAnchor = new GPoint(6, 20);
	icon.infoWindowAnchor = new GPoint(5, 1);
	*/
	
	// Total guess and check for this marker. Need to keep track of optimal
	// placement when designing base markers.
	this.iconOffset = new GSize(-7, -32);
	
	options.icon = icon;
		
	GMarker.call(this, latlng, options)
	// or GMarker.apply(this, Array(latlng, options))
}

/* We have to supply a dummy latlng to be able to create the GMarker */
SilkMarker.prototype = new GMarker(new GLatLng(0,0))

SilkMarker.prototype.initialize = function(map) {
	// Initialize GMarker
	GMarker.prototype.initialize.apply(this, arguments);
	
	/* To do here:
	   - deal with transparency (ie6 ?)
	   - make the event listener stuff happen
	*/
	var img = document.createElement("img");
	img.src = "http://bencochran.com/SilkMarker/silkmarker/icons/"+this.overlayIcon+".png";
	img.style.position = "absolute";
	map.getPane(G_MAP_MARKER_PANE).appendChild(img);
	
	this.img = img;
	this.map = map;
}

SilkMarker.prototype.redraw = function(force) {
	// Redraw GMarker
	GMarker.prototype.redraw.apply(this, arguments);

	if (!force) return;

	var p = this.map.fromLatLngToDivPixel(this.latlng);
	var z = GOverlay.getZIndex(this.latlng.lat());
	
    this.img.style.left = (p.x + this.iconOffset.width) + "px";
    this.img.style.top = (p.y + this.iconOffset.height) + "px";
    this.img.style.zIndex = z + 1; // in front of the marker
}

SilkMarker.prototype.remove = function() {
	this.img.parentNode.removeChild(this.img);
    this.img = null;
    
	// Remove GMarker
	GMarker.prototype.remove.apply(this, arguments);
}