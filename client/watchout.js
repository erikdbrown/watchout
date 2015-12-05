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

var Player = function (n) {

  this.fill = '#ff6600';
  this.r = 10;
  this.x = Math.random() * gameOptions.width;
  this.y = Math.random() * gameOptions.height;
  this.id = n || 0;
  this.m = 'M' + this.x + ', ' + this.y
  this.l = 'L' + (Math.random() * gameOptions.width) + ', ' + (Math.random() * gameOptions.height)

}

var players = [new Player('hi'), new Player(), new Player()];

var svg = d3.select('.board').append('svg')
            .attr('height', gameOptions.height)
            .attr('width', gameOptions.width)
            .style('padding', 30)
            .style('background-color', '#003366')


var currentScore = d3.select('.current').selectAll('span')
                    .text(gameStats.current);

// remember to compare this to previous high score before updating.
// have to store previous high scores somewhere
var highScore = d3.select('.highscore').selectAll('span')
                  .text(gameStats.highscore);

var circles = svg.selectAll('circle')
               .data(players)
               .enter()
               .append('circle');

var playerStyles = circles
                   .attr('cx', function(d) { return d.x })
                   .attr('cy', function(d) { return d.y })
                   .attr('r', function(d) { return d.r })
                   .attr('id', function(d) { return d.id })
                   .style('fill', function(d) { return d.fill }); 

setInterval(function() {
  var range = d3.range(players.length).map(function(d) { return { x: Math.random() * gameOptions.width, y: Math.random() * gameOptions.height } });
  var x = circles
            .data(range)
            .transition()
            .duration(1000)
            .attr('cx', function(d) { return d.x })
            .attr('cy', function(d) { return d.y })
            // .transition(3000)

}, 1000)

