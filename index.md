---
layout: with_map
title: Home
---

SilkMarker
==========

[SilkMarker][silkmarker] extends the Google Map API's GMarker and adds support
for dynamically-created markers based on the [Silk Icon set][silk] by Mark
James.

You use it by specifying a baseMarker, which acts as an underlay, and an
overlayIcon, which is the icon to place on the underlying marker.

A [guide][marker_guide] from the [Beginning Google Maps Applications][bgma] blog
was used when outlining the class.

Example
-------

<div id="map" style="width: 300px; height: 200px;">Map to be replaced. Hopefully.</div>

The code to add this marker:

	var marker = new SilkMarker(new GLatLng(44.46201924941167, -93.15387010574341));
	map.addOverlay(marker);


License
-------

SilkMarker is released under the MIT License

Copyright 2009 [Carleton College][carleton]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[silkmarker]: http://bcochran.github.com/silkmarker/
[carleton]: http://apps.carleton.edu/opensource/
[silk]: http://www.famfamfam.com/lab/icons/silk/
[marker_guide]: http://googlemapsbook.com/2007/03/06/clickable-labeledmarker/
[bgma]: http://googlemapsbook.com