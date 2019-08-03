var height = 400;
var width = 900;
var margin = 50;

var svg = d3.select("svg")
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

async function init() { // Allow for loading
    var data = await d3.csv("https://adam-reid.github.io/cs-498-dv-project/table_02_04q418.csv", function(d, i, columns) {
        for(i = 0; i < columns.length; i++)
            d[columns[i]] = +d[columns[i]];

        d.total = d["TOTAL fatalities"];
        delete d["TOTAL fatalities"];

        return d;
    }).then(function(data) {

        var keys = data.columns.slice(1);

        // Prep the data
        var xarray = data.map(function(d) {return d.Year; });
        var yarray = data.map(function(d) {return d.total; });

        // Find y limit
        var ymax = d3.max(yarray)
        var yupper = Math.ceil(ymax/10000)*10000;

        // Create domains
        var xdomain = xarray;
        var ydomain = [0, yupper];

        // Create ranges
        var xrange = [0, width];
        var yrange = [height, 0];

        // Create scales
        var xscale = d3.scaleBand().domain(xdomain).paddingInner(0.1).paddingOuter(0.1).range(xrange);
        var yscale = d3.scaleLinear().domain(ydomain).range(yrange);
        var colors = d3.scaleLinear().domain([0, d3.max(xarray)]).range(['#26BBD2', '#C61C6F']);

        // X-Tick format
        var tick_format = d3.format("~s");

        // Set up left axis
        d3.select("svg")
            .append("g")
            .attr("transform", "translate("+margin+","+margin+")")
            .call(d3.axisLeft(yscale).tickFormat(tick_format));

        // Set up bottom axis.
        d3.select("svg")
            .append("g")
            .attr("transform", "translate("+margin+","+(height+margin)+")")
            .call(d3.axisBottom(xscale));

        // Set up tool tip.
        var tooltip = d3.select('body')
            .append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0);

        // Set up the chart.
        var chart = d3.select(".chart")
            .selectAll("rect")
            .data(data)
            .enter().append("rect")
            .style("fill", function(d, i) { return colors(d.Year); })
            .attr("width", xscale.bandwidth)
            .attr("x", function(d) { return margin + xscale(d.Year); })
            .attr("y", height + margin);

        // Set up initial transition
        chart.transition()
            .duration(1000)
            .delay(250)
            .ease(d3.easeBackOut)
            .attr("height", function(d) {return height - yscale(d.total); })
            .attr("y", function(d) { return margin + yscale(d.total); });

        // Set up Mouse events
        var inspect = 0;

        chart.on("mouseover", function(d) {
                tooltip.transition().duration(250).style('opacity', .9);

                tooltip.html(d.total)
                    .style('left', (d3.event.pageX - 35 + 'px'))
                    .style('top', (d3.event.pageY - 30 + 'px'));
                d3.select(this).style("opacity", .5);
            })
            .on('mouseout', function(d) {
                tooltip.transition().duration(250).style('opacity', 0);
                d3.select(this).style("opacity", 1);
            })
            .on('click', function(d, i) {
                inspect = (inspect + 1) % 2;

                chart.transition()
                    .duration(1500)
                    .attr("height", function(nd, ni) {
                        if (inspect == 0 || i == ni)
                            return height - yscale(nd.total);
                        else
                            return 0;
                    })
                    .attr("y", function(nd, ni) {
                        if (inspect == 0 || i == ni)
                            return margin + yscale(nd.total);
                        else
                            return height + margin;
                    });
            });


    }).catch(function(error, rows) {
        console.log("An error occurred.");
    });

    document.getElementById("info").innerHTML = "From 1999 to 2017, transportation in the United States " +
        "has seen a decrease in transportation fatalities. While not linear, there are myriad reasons as " +
        "to why the decrease has occurred -- some of these being improvements in automation, safety, " +
        "training, or decreased usage of the recorded mode of transportation.";
}
