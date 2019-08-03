var height = 450;
var width = 750;
var margin = 25;

var svg = d3.select("svg")
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

async function init() { // Allow for loading
    var data = await d3.csv("https://adam-reid.github.io/cs-498-dv-project/table_02_04q418.csv", function(d, i, columns) {
        for(i = 0; i < columns.length; i++)
            d[columns[i]] = +d[columns[i]];

        return d;
    }).then(function(data) {
        var keys = data.columns.slice(2); // skip year and totals.

        // Prep the data
        var xarray = data.map(function(d) {return d.Year; });
        var yarray = data.map(function(d) {return d["TOTAL fatalities"]; });

        // Find y limit
        var ymax = d3.max(yarray)
        var yupper = Math.ceil(ymax/10000)*10000;

        // Create domains
        var xdomain = xarray;
        var ydomain = [0, yupper];
        var cdomain = keys;

        // Create ranges
        var xrange = [0, width];
        var yrange = [height, 0];
        var crange = ['#26BBD2', '#C61C6F'];

        // Create scales
        var xscale = d3.scaleBand().domain(xdomain).paddingInner(0.1).paddingOuter(0.1).range(xrange);
        var yscale = d3.scaleLinear().domain(ydomain).range(yrange);
        var cscale = d3.schemePaired;

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

        var stack = d3.stack().keys(keys)(data);

        // Set up the chart.
        var chart = d3.select("svg")
            .attr("transform", "translate(" + margin + "," + margin + ")")
            .append("g")
            .selectAll("g")
            .data(stack)
            .enter().append("g")
            .style("fill", function(d, i) { return cscale[i%cscale.length]; })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("width", xscale.bandwidth)
            .attr("x", function(d) { return margin + xscale(d.data.Year); })
            //.style("fill", function(d, i) { return colors[i%10]; })//return colors(i%10);})//(d.key); })
            .attr("y", height + margin);

            /*.on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
              console.log(d);
              var xPosition = d3.mouse(this)[0] - 5;
              var yPosition = d3.mouse(this)[1] - 5;
              tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
              tooltip.select("text").text(d[1]-d[0]);
            });*/

        // Set up initial transition
        chart.transition()
            .duration(1000)
            .delay(250)
            .ease(d3.easeBackOut)
            .attr("height", function(d) { return yscale(d[0]) - yscale(d[1]); })
            .attr("y", function(d) { return margin + yscale(d[1]); });

        // Set up Mouse events
        var inspect = 0;

        chart.on("mouseover", function(d) {
                tooltip.transition().duration(250).style('opacity', .9);

                tooltip.html(d.data["TOTAL fatalities"])
                    .style('left', (d3.event.pageX - 35 + 'px'))
                    .style('top', (d3.event.pageY - 30 + 'px'));
                d3.select(this).style("opacity", .5);
            })
            .on('mouseout', function(d) {
                tooltip.transition().duration(250).style('opacity', 0);
                d3.select(this).style("opacity", 1);
            })
            .on('click', function(d, i, c) {
                inspect = (inspect + 1) % 2;

                var j = 0;

                for (j = 0; j < stack.length; j++) {
                    if (stack[j][i][0] == d[0] && stack[j][i][1] ==d[1]) {
                        break;
                    }
                }

                chart.transition()
                    .duration(1500)
                    .attr("height", function(nd, ni) {
                        if (inspect == 0 || stack[j][ni] == nd)
                            return yscale(nd[0]) - yscale(nd[1]);
                        else
                            return 0;
                    })
                    .attr("y", function(nd, ni) {
                        if (inspect == 0)
                            return margin + yscale(nd[1]);
                        else if (stack[j][ni] == nd) {
                            return margin + yscale(nd[1] - nd[0]);
                        }
                        else
                            return height + margin;
                    });
            });

            // Legends!
            var legend = d3.select("svg").append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width + 250 - 19)
                .attr("width", 19)
                .attr("height", 19)
                .style("fill", function(d, i) { return cscale[i%cscale.length]; })

            legend.append("text")
                .attr("x", width + 250 - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });


    }).catch(function(error, rows) {
        console.log("An error occurred.");
    });

    document.getElementById("info").innerHTML = "From 1999 to 2017, transportation in the United States " +
        "has seen a decrease in transportation fatalities. While not linear, there are myriad reasons as " +
        "to why the decrease has occurred -- some of these being improvements in automation, safety, " +
        "training, or decreased usage of the recorded mode of transportation.";
}
