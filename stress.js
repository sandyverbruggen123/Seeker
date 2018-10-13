// Based on
// https://codepen.io/chiunhauyou/pen/LkjvYw

var stressViz = function (p) {

  //determines the offset from the center
  var xoff1 = 0,
    xoff2 = 0,
    xoff3 = 0,
    vertices1, vertices2, vertices3;

  //variables in which the stresslevels can be stored
  var stressPerson1 = 0,
    stressPerson2 = 0,
    stressPerson3 = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.frameRate(40);
    p.strokeWeight(5);
  };

  p.draw = function () {
    //move sketch to the center of the page
    p.translate(p.width / 2, p.height / 2);
    p.background(0);

    p.fill(255, 50);
    //persoon 1
    p.stroke(255, 0, 0);
    vertices1 = [];
    for (i = 0; i < 8; i++) {
      var angle = 2 * p.PI * (i / 8);
      var r = p.map(p.noise(xoff1 + 100 * i), 0, 1, 100, 270);
      vertices1.push(r * p.cos(angle), -r * p.sin(angle));
      // mapping the stresslevel to the x offset
      // var map = p.map(stressPerson1, 0, 1, 0, 0.01);
      xoff1 += 0.0009;
    }
    amoeba(0, 0, 50, vertices1);

    //person 2
    p.stroke(0, 255, 0);
    vertices2 = [];
    for (i = 0; i < 8; i++) {
      var angle = 2 * p.PI * (i / 8);
      var r = p.map(p.noise(xoff2 + 100 * i), 0, 1, 100, 270);
      vertices2.push(r * p.cos(angle), -r * p.sin(angle));
      // mapping the stresslevel to the x offset
      // var map = p.map(stressPerson2, 0, 1, 0, 0.01);
      xoff2 += 0.01;
    }
    amoeba(0, 0, 50, vertices2);

    //person 3
    p.stroke(0, 0, 255);
    vertices3 = [];
    for (i = 0; i < 8; i++) {
      var angle = 2 * p.PI * (i / 8);
      var r = p.map(p.noise(xoff3 + 100 * i), 0, 1, 100, 270);
      vertices3.push(r * p.cos(angle), -r * p.sin(angle));
      // mapping the stresslevel to the x offset
      // var map = p.map(stressPerson3, 0, 1, 0, 0.01);
      xoff3 += 0.005;
    }
    amoeba(0, 0, 50, vertices3);
  };


  //function that draws the amoeba shape
  function amoeba(x, y, ctrl, vertices) {
    var segments = [];
    for (var i = 0; i < vertices.length; i += 2) {
      segments.push(new p5.Vector(vertices[i] - x, vertices[i + 1] - y));
    }
    segments.push(new p5.Vector(vertices[0] - x, vertices[1] - y));
    p.push();
    p.translate(x, y);
    p.beginShape();
    p.vertex(segments[0].x, segments[0].y);

    for (var i = 0; i < segments.length - 1; i++) {
      var firstAngle = segments[i].heading();
      var secondAngle = segments[i + 1].heading();

      p.bezierVertex(
        segments[i].x + ctrl * Math.sin(firstAngle),
        segments[i].y - ctrl * Math.cos(firstAngle),
        segments[i + 1].x - ctrl * Math.sin(secondAngle),
        segments[i + 1].y + ctrl * Math.cos(secondAngle),
        segments[i + 1].x,
        segments[i + 1].y
      );
    }

    p.endShape();
    p.pop();
  };
};

var myStressP5 = new p5(stressViz);