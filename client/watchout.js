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

var Obstacle = function () {

  this.fill = '#ff6600';
  this.r = 10;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;

};

var Player = function() {this.fill = '#ff6600';
  this.fill = 'purple';
  this.r = 10;
  this.x = gameOptions.width / 2;
  this.y = gameOptions.height / 2;  
}

var obstacleRange = d3.range(50).map(function(item) { return new Obstacle() });

var svg = d3.select('.board').append('svg')
            .attr('height', gameOptions.height)
            .attr('width', gameOptions.width)
            .style('padding', 30)
            .style('background-color', '#003366')

var dragmove = function(d) {
  console.log('hello')
  d3.select('#player')
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
}

var drag = d3.behavior.drag()
             .on('drag', dragmove)

var player = svg.selectAll('circle')
                .data([new Player()])
                .enter()
                .append('circle')
                .attr('cx', function(d) { return d.x })
                .attr('cy', function(d) { return d.y })
                .attr('r', function(d) { return d.r })
                .attr('id', 'player')
                .attr('class', 'draggableCircle')
                .style('fill', function(d) { return d.fill })
                .call(drag);

var currentScore = d3.select('.current').selectAll('span')
                     .text(gameStats.current);

var highScore = d3.select('.highscore').selectAll('span')
                  .text(gameStats.highscore);

var obstacles = svg.selectAll('circle')
                   .data(obstacleRange)
                   .enter()
                   .append('circle')
                   .attr('cx', function(d) { return d.x })
                   .attr('cy', function(d) { return d.y })
                   .attr('r', function(d) { return d.r })
                   .style('fill', function(d) { return d.fill });   

setInterval(function() {
  var range = d3.range(obstacleRange.length).map(function(d) { return { x: Math.random() * gameOptions.width, y: Math.random() * gameOptions.height } });
  
  var x = obstacles
            .data(range)
            .transition()
            .duration(1000)
            .attr('cx', function(d) { return d.x })
            .attr('cy', function(d) { return d.y })

}, 2000)