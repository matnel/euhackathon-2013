
function lineChart(data, div, answer){

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.int1); })
    .y(function(d) { return y(d.int2); });

var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.int1 = d.answer;
    d.int2 = d.amount;
  });

  x.domain(d3.extent(data, function(d) { return d.int1; }));
  y.domain(d3.extent(data, function(d) { return d.int2; }));

  x.domain(data.map(function(d) { return d.int1; }));
  y.domain([0, d3.max(data, function(d) { return d.int2; })]);
  //lineChart([{answer:1, amount:30}, {answer:3, amount:29}, {answer:8, amount:5}}, "#plot-slide", this.props.correct);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      svg.append("text")      // text label for the x axis
        .attr("x", width )
        .attr("y",  height - 10 )
        .style("text-anchor", "middle")
        .text("Amount");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Users");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  svg.selectAll("dot")		
        .data(data)										
    .enter().append("circle")								
    .filter(function(d) { return d.int1 == answer })    // <== This line
        .style("fill", "red")                        // <== and this one
        .attr("r", 3.5)										
        .attr("cx", function(d) { return x(d.int1); })		 
        .attr("cy", function(d) { return y(d.int2); });
// });

return svg;
}