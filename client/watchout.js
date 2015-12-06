var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  collisions: 0,
  current: 0,
  highscore: 30
};

var Obstacle = function (index) {

  this.index = 'ob' + index;
  this.fill = '#ff6600';
  this.r = 10;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;

};

var Player = function() {

  this.index = 'player';
  this.fill = 'purple';
  this.r = 10;
  this.x = gameOptions.width / 2;
  this.y = gameOptions.height / 2;  
}

var obstacleRange = d3.range(gameOptions.nEnemies).map(function(item, index) { return new Obstacle(index) });
// obstacleRange.unshift(new Player());

var svg = d3.select('.board').append('svg')
            .attr('height', gameOptions.height)
            .attr('width', gameOptions.width)
            .style('padding', 30)
            .style('background-color', '#003366');

var dragmove = function(d) {
  d3.select('#player')
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
}

var drag = d3.behavior.drag()
             .on('drag', dragmove);

var currentScore = d3.select('.current').selectAll('span')
                     .text(gameStats.current);

var highScore = d3.select('.highscore').selectAll('span')
                  .text(gameStats.highscore);

// create all circles
svg.selectAll('image')
   .data(obstacleRange)
   .enter()
   .append('image')
   .attr('width', 20)
   .attr('height', 20)
   .attr('x', function(d) { return d.x })
   .attr('y', function(d) { return d.y })
   .attr("xlink:href","shuriken.png")
   .attr('class', 'obstacle');

// make one of the circles our player
var player = svg.selectAll('circle')
   .data([new Player()])
   .enter()
   .append('circle')
   .attr('cx', function(d) { return d.x })
   .attr('cy', function(d) { return d.y })
   .attr('r', function(d) { return d.r })
   .attr('id', function(d) { return d.index })
   .attr('class', 'draggableCircle')
   .style('fill', function(d) { return d.fill })
   .call(drag);

var scoreCounter = function() {
  gameStats.current++;
  d3.selectAll('.current').select('span').text(gameStats.current);
};

var timerID = setInterval(scoreCounter, 150);


setInterval(function() {
    
    var range = d3.range(obstacleRange.length).map(function(d) { return { x: Math.random() * gameOptions.width, y: Math.random() * gameOptions.height } });

    var collisions = {}

    svg.selectAll('.obstacle')
       .data(range)
       .transition()
       // .ease('eleastic')
       .duration(1000)
       .tween('text', function (d) {

         var X = d3.interpolate(this.x.animVal.value, d.x);
         var Y = d3.interpolate(this.y.animVal.value, d.y);
         var id = this.id;
         var score = 0;

         return function (t) {
           var playerX = svg.selectAll('#player').attr('cx');
           var playerY = svg.selectAll('#player').attr('cy');
           var a = playerX - X(t);
           var b = playerY - Y(t);
           var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
           if (c <= svg.selectAll('#player').attr('r')) {
             //preventing pass through collisions
             if (!collisions[id]) {
               collisions[id] = true;
               //increment collisions
               gameStats.collisions++;
               //update our collision prop in gameStats
               d3.selectAll('.collisions').select('span').text(gameStats.collisions);
             }
             //comparing current score to high score - reset high score if need be
             d3.selectAll('.highscore').select('span').text(gameStats.highscore > gameStats.current ? gameStats.highscore : gameStats.current);
             //clearing our interval counter on collision
             clearInterval(timerID);
             //resetting our current score in gameStats to zero
             gameStats.current = 0;
             d3.selectAll('.current').select('span').text(0);
             //reset our score counter
             timerID = setInterval(scoreCounter, 150);
           }
         }
       })
       .attr('x', function(d) { return d.x })
       .attr('y', function(d) { return d.y })
}, 1500)
