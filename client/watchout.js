var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  current: 100,
  highscore: 300
};

var Obstacle = function (index) {

  this.index = 'ob' + index;
  this.fill = '#ff6600';
  this.r = 10;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;

};

// Obstacle method that constantly reports it's location and compares it to the player location
// add call(thisMethod) to obstacle creation

var Player = function() {

  this.index = 'player';
  this.fill = 'purple';
  this.r = 10;
  this.x = gameOptions.width / 2;
  this.y = gameOptions.height / 2;  
}

var obstacleRange = d3.range(3).map(function(item, index) { return new Obstacle(index) });
obstacleRange.unshift(new Player());

var svg = d3.select('.board').append('svg')
            .attr('height', gameOptions.height)
            .attr('width', gameOptions.width)
            .style('padding', 30)
            .style('background-color', '#003366')

var dragmove = function(d) {
  d3.select('#player')
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
}

var drag = d3.behavior.drag()
             .on('drag', dragmove)

var currentScore = d3.select('.current').selectAll('span')
                     .text(gameStats.current);

var highScore = d3.select('.highscore').selectAll('span')
                  .text(gameStats.highscore);

// create all circles
svg.selectAll('circle')
   .data(obstacleRange)
   .enter()
   .append('circle')
   .attr('class', 'obstacle')
   .attr('cx', function(d) { return d.x })
   .attr('cy', function(d) { return d.y })
   .attr('r', function(d) { return d.r })
   .attr('id', function(d) { return d.index })
   .style('fill', function(d) { return d.fill })

// make one of the circles our player
var player = svg.selectAll('circle')
                .data([new Player()]) 
                .attr('class', 'draggableCircle')
                .call(drag)
                .exit();

// var x = setInterval(function() {

  //iterate and find the original positions
 
  // var originalPositions = [];
  // for (var i = 1; i < obstacleRange.length; i++) {
  //   originalPositions.push({x: obstacleRange.attr('cx'), y: obstacleRange.attr('cy')})
  // } 
var startingPoints = obstacleRange.map(function(d) { return { x: d.x, y: d.y }});
  
  setInterval(function() {
    
    var range = d3.range(obstacleRange.length).map(function(d) { return { x: Math.random() * gameOptions.width, y: Math.random() * gameOptions.height } });

    svg.selectAll('.obstacle')
            .data(range)
            .transition()
            .ease('eleastic')
            .duration(1000)
            .tween('text', function (d) {
              var X = d3.interpolate(this.cx.animVal.value, d.x);
              var Y = d3.interpolate(this.cy.animVal.value, d.y);

              return function (t) {
                var playerX = svg.selectAll('#player').attr('cx');
                var playerY = svg.selectAll('#player').attr('cy');

                var a = playerX - X(t);
                var b = playerY - Y(t);
                var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));


                if (c <= svg.selectAll('#player').attr('r')) {
                  console.log('you\'re hit');
                }

              }
            })
            // .call(movePosition, Math.random() * gameOptions.width, Math.random() * gameOptions.height)
            .attr('cx', function(d) { return d.x })
            .attr('cy', function(d) { return d.y })

}, 1000)