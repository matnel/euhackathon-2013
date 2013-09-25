

function barPlot(data, container, answer){

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

if( data.length > 10 ) {
  xAxis.tickValues(
    d3.range(0 , 100, 10)
  );
}

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select( container ).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.tsv("data3.tsv", type, function(error, data) {
  //data = [{alpha: "a", amount: 3}, {alpha: "b", amount: 10}, {alpha: "c", amount: 4}]
  x.domain(data.map(function(d) { return d.answer; }));
  y.domain([0, d3.max(data, function(d) { return d.amount; })]);
//  lineChart([{answer:1, amount:30}, {answer:3, amount:29}, {answer:8, amount:5}}, "#plot-slide", this.props.correct);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Users");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.answer); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.amount); })
      .attr("height", function(d) { return height - y(d.amount); });
      

svg.selectAll(".bar")    
        .data(data)                      // <== This line
        .style("fill", function(d, i){return d.answer == answer?"#0299E6":"#FF0202";});     

//});

function type(d) {
  d.amount = +d.amount;
  return d;
}

  return svg;
}