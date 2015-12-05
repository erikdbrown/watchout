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

var Player = function (x, y, axis) {

  this.fill = '#ff6600';
  this.x = x;
  this.y = y;
  // this.axis = axis;
  this.r = 30;

}

//Player.prototype methods

var players = [new Player(200, 300), new Player(150, 400), new Player(300, 450)];

var svg = d3.select('.board').append('svg')
            .attr('height', gameOptions.height)
            .attr('width', gameOptions.width);
(console.log(svg))


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
                   .style('fill', function(d) { return d.fill });




