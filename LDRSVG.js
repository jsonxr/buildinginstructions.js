var LDR = LDR || {};
LDR.SVG = LDR.SVG || {};

LDR.SVG.NS = 'http://www.w3.org/2000/svg';

// Left arrow used to go back one step:
LDR.SVG.makeLeftArrow = function() {
    var pts = "20,50 50,20 50,35 80,35 80,65 50,65 50,80";
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    var poly = LDR.SVG.makePolygon(pts);
    ret.appendChild(poly);
    return ret;
}

// Right arrow used to step forward one step. 
// Double size because it is the primarily-used button:
LDR.SVG.makeRightArrow = function () {
    var pts = "160,100 100,40 100,70 40,70 40,130 100,130 100,160";
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    var poly = LDR.SVG.makePolygon(pts);
    ret.appendChild(poly);
    return ret;
}

// Up arrow is used to return to top of the page
LDR.SVG.makeUpArrow = function() {
    var pts = "50,20 80,50 65,50 65,80 35,80 35,50 20,50";
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    var poly = LDR.SVG.makePolygon(pts);
    ret.appendChild(poly);
    return ret;
}

LDR.SVG.makeZoom = function(verticalLine) {
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    ret.appendChild(LDR.SVG.makeLine(10, 25, 40, 25));
    if(verticalLine)
	ret.appendChild(LDR.SVG.makeLine(25, 10, 25, 40));
    return ret;	
}

LDR.SVG.makeCamera = function(x, y, w) {
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');

    ret.appendChild(LDR.SVG.makeRect(x-w/3, y-w/6, w/2, w/3));
    
    var pts = (x-w/3+w/2) + "," + (y-w/10) + " " + 
	(x+w/3) + "," + (y-w/6) + " " + 
	(x+w/3) + "," + (y+w/6) + " " + 
	(x-w/3+w/2) + "," + (y+w/10);	    
    ret.appendChild(LDR.SVG.makePolygon(pts));
    
    // Leg:
    ret.appendChild(LDR.SVG.makeRect(x-w/8, y+w/6, w/10, w/4));
    
    // Tape:
    ret.appendChild(LDR.SVG.makeCircle(x-w/5, y, w/14));    
    ret.appendChild(LDR.SVG.makeCircle(x+w/24, y, w/14));
    ret.appendChild(LDR.SVG.makeLine(x-w/5, y-w/14, x+w/24, y-w/15));
    
    return ret;
}

// Fast forward and fast reverse double-arrow buttons:
LDR.SVG.makeFR = function () {
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    ret.appendChild(LDR.SVG.makeTriangle(50, 20));
    ret.appendChild(LDR.SVG.makeTriangle(80, 50));
    return ret;
}
LDR.SVG.makeFF = function () {
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    ret.appendChild(LDR.SVG.makeTriangle(20, 50));
    ret.appendChild(LDR.SVG.makeTriangle(50, 80));
    return ret;
}

// Home button:
LDR.SVG.makeHome = function () {
    var ret = document.createElementNS(LDR.SVG.NS, 'svg');
    var edgePoints = "50,20 80,50 75,50 75,80 25,80 25,50 20,50";
    ret.appendChild(LDR.SVG.makePolygon(edgePoints));
    ret.appendChild(LDR.SVG.makeRect(30, 50, 18, 30)); // Door
    ret.appendChild(LDR.SVG.makeRect(53, 50, 16, 16)); // Window
    return ret;
}
LDR.SVG.makeOptions = function () {
    var ret = document.createElement('a');
    ret.setAttribute('href', '#options');

    var svg = document.createElementNS(LDR.SVG.NS, 'svg');
    ret.appendChild(svg);

    LDR.SVG.makeGear(58, 43, 22, 18, svg);
    LDR.SVG.makeGear(35, 66, 14, 12, svg);

    return ret;
}

LDR.SVG.makePolygon = function(pts) {
    var poly = document.createElementNS(LDR.SVG.NS, 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    return poly;
}
LDR.SVG.makePolyLine = function(pts) {
    var poly = document.createElementNS(LDR.SVG.NS, 'polyline');
    poly.setAttribute('points', pts);
    return poly;
}
LDR.SVG.makeTriangle = function(sideX, pointX) {
    var pts = sideX + ",20 " + sideX + ",80" + " " + pointX + ",50";
    return LDR.SVG.makePolygon(pts);
}
LDR.SVG.makeLine = function(x1, y1, x2, y2) {
    var ret = document.createElementNS(LDR.SVG.NS, 'line');
    ret.setAttribute('x1', x1);
    ret.setAttribute('y1', y1);
    ret.setAttribute('x2', x2);
    ret.setAttribute('y2', y2);
    return ret;
}
LDR.SVG.makeRect = function(x, y, w, h) {
    var ret = document.createElementNS(LDR.SVG.NS, 'rect');
    ret.setAttribute('x', x);
    ret.setAttribute('y', y);
    ret.setAttribute('width', w);
    ret.setAttribute('height', h);
    ret.setAttribute('fill', 'none');
    return ret;
}
LDR.SVG.makeCircle = function(x, y, r) {
    var ret = document.createElementNS(LDR.SVG.NS, 'circle');
    ret.setAttribute('cx', x);
    ret.setAttribute('cy', y);
    ret.setAttribute('r', r);
    ret.setAttribute('fill', 'none');
    return ret;
}
LDR.SVG.makeGear = function(x, y, r, t, svg) {
    // Crown:
    svg.appendChild(LDR.SVG.makeGearCrown(x, y, r, r-4.5, 0.1, 0.1, t));
    // Cross axle:
    svg.appendChild(LDR.SVG.makeCrossAxleHole(x, y));
    // Circle if big enough:
    if(r > 20)
	svg.appendChild(LDR.SVG.makeCircle(x, y, r*0.55));
}
LDR.SVG.makeGearCrown = function(x, y, ro, ri, ao, ai, t) {
    var a = (2*Math.PI/t - ai - ao)/2;
    var pts = "M" + (x+ro) + " " + y + " ";
    var angles = [a, ai, a, ao];
    var radii = [ri, ri, ro, ro];
    for(var i = 0; i < t; i++) {
	var A = Math.PI*2/t*i;
	for(var j = 0; j < 4; j++) {
	    A += angles[j];
	    pts += "L" + (x+radii[j]*Math.cos(A)) + " " + (y+radii[j]*Math.sin(A)) + " ";
	}
    }
    pts += "Z";
    var ret = document.createElementNS(LDR.SVG.NS, 'path');
    ret.setAttribute('d', pts);
    ret.setAttribute('fill', 'none');    
    return ret;
}
LDR.SVG.makeCrossAxleHole = function(x, y) {
    var d = 3;
    var D = 1.5*d;
    var pts = "M" + (x+d) + " " + (y-d-D/2) +
	" v"  + d + " h"  + d + " v"  + D +
	" h-" + d + " v"  + d + " h-" + D + 
	" v-" + d + " h-" + d + " v-" + D + 
	" h"  + d + " v-" + d + " Z";
    var ret = document.createElementNS(LDR.SVG.NS, 'path');
    ret.setAttribute('d', pts);
    ret.setAttribute('fill', 'none');    
    return ret;
}