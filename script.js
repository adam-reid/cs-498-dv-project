var height = 450;
var width = 720;
var margin = 40;

var overviewData;
var largeData;
var smallData;

var overviewColumns;
var largeColumns;
var smallColumns;

var svg = d3.select("svg")

svg
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");

function removeAll() {
    d3.selectAll("svg > *").remove();
}

function overview() {
    removeAll();
    document.getElementById("info").innerHTML = "From 1999 to 2017, transportation in the United States " +
    "has seen a decrease in transportation fatalities. While not linear, there are myriad reasons as " +
    "to why the decrease has occurred -- some of these being improvements in automation, safety, " +
    "training, or decreased usage of the mode of transportation. This is an overview of all " +
    "of the data provided by the Bureau of Traffic Statistics.";

    document.getElementById("overview").disabled = true;
    document.getElementById("large").disabled = false;
    document.getElementById("small").disabled = false;

    process(overviewData, overviewColumns);
}

function large() {
    removeAll();
    document.getElementById("info").innerHTML = "Among the categories in the data set, four of them " +
    "regularly have counts that exceed 1000 per year - Passenger Car Occupants, Truck Occupants, " +
    "Pedestrians, and Motorcyclists. These four categories alone comprise <em><u>85%</u></em> of annual " +
    "transportation fatalities, while only comprising approximately 11% of the categories available.";

    document.getElementById("overview").disabled = false;
    document.getElementById("large").disabled = true;
    document.getElementById("small").disabled = false;

    process(largeData, largeColumns);
}

function small() {
    removeAll();
    document.getElementById("info").innerHTML = "The remaining categories comprise approximately 15% " +
    "of annual transportation fatalities. There are 31 categories that have fewer than 1000 fatalities " +
    "annually. This means that the ~89% of transportation modes categorized here make up only ~15% of the " +
    "annual transportation fatalities, and <em>the 11% of categories not here account for 85%</em> of the annual " +
    "transportation fatalities.";

    document.getElementById("overview").disabled = false;
    document.getElementById("large").disabled = false;
    document.getElementById("small").disabled = true;

    process(smallData, smallColumns);
}

function process(data, cols) {
    var keys = cols.slice(1); // skip year column

    // Prep the data
    var xarray = data.map(d => {return d.Year; });
    var yarray = data.map(d => {return d.total;});

    // Find y limit
    var ymax = d3.max(yarray)
    var exp = Math.log10(ymax);
    var pow = Math.floor(exp);
    var norm = Math.pow(10, pow);
    var yupper = Math.ceil(ymax/norm)*norm;

    // Create domains
    var xdomain = xarray;
    var ydomain = [0, yupper];
    var cdomain = keys;

    // Create ranges
    var xrange = [0, width];
    var yrange = [height, 0];

    // Create scales
    var xscale = d3.scaleBand().domain(xdomain).paddingInner(0.1).paddingOuter(0.1).range(xrange);
    var yscale = d3.scaleLinear().domain(ydomain).range(yrange);
    var cscale = d3.schemeCategory10;//.schemePaired;

    // X-Tick format
    var tick_format = d3.format("~s");

    // Set up left axis
    d3.select("svg")
        .append("g")
        .attr("transform", "translate("+margin+","+margin+")")
        .call(d3.axisLeft(yscale).tickFormat(tick_format))
        .transition().duration(1000).delay(1250).attr("font-size", "16")
        .transition().duration(1000).attr("font-size", "10");

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

    var bardata = d3.select("svg").append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("dy", ".75em");

    // Set up legends
    var legend = d3.select("svg").append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice())//.reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width + 350 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .transition().duration(1000).delay(250).ease(d3.easeSin)
        .style("fill", function(d, i) { return cscale[i%cscale.length]; });

    legend.append("text")
        .attr("x", width + 350 - 50)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .transition().duration(1000).delay(250).ease(d3.easeSin)
        .text(d => { return d; });


    // Set up the main chart.
    var chart = d3.select("svg")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .append("g")
        .selectAll("g")
        .data(stack)
        .enter().append("g")
        .style("fill", function(d, i) { return cscale[i%cscale.length]; })
        .selectAll("rect")
        .data(d => { return d; })
        .enter().append("rect")
        .attr("width", xscale.bandwidth)
        .attr("x", d => { return margin + xscale(d.data.Year); })
        .style("fill", function(d, i) {
            var j = 0;

            for (j = 0; j < stack.length; j++) {
                if (stack[j][i][0] == d[0] && stack[j][i][1] == d[1]) {
                    break;
                }
            }

            return cscale[j%cscale.length];
        })
        .attr("y", height + margin);

    // Set up initial transition
    chart.transition()
        .duration(1000)
        .delay(250)
        .ease(d3.easeBackOut)
        .attr("height", d => { return yscale(d[0]) - yscale(d[1]); })
        .attr("y", d => { return margin + yscale(d[1]); });

    // Set up Mouse events
    var inspect = 0;

    chart.on("mouseover", function(d, i) {
            tooltip.transition().duration(250).style('opacity', .9);

            tooltip.html(d[1] - d[0])
                .style('left', (d3.event.pageX - 35 + 'px'))
                .style('top', (d3.event.pageY - 30 + 'px'));

            d3.select(this).style("opacity", .5);

            var j = 0;

            for (j = 0; j < stack.length; j++) {
                if (stack[j][i][0] == d[0] && stack[j][i][1] ==d[1]) {
                    break;
                }
            }

            legend
                .attr("font-weight", function(nd, ni) {
                    return (j == ni) ? "bold" : "normal"; })
                .style("fill", function(nd, ni) {
                    return (j == ni) ? cscale[j%cscale.length] : "black"; })
                .attr("font-size", function(nd, ni) {
                    return (j == ni) ? 14 : 10; });
        })
        .on('mouseout', function(d) {
            tooltip.transition().duration(250).style('opacity', 0);
            d3.select(this).style("opacity", 1);

            // only mouse out if not already in a selection
            if (inspect == 0) {
                legend
                .attr("font-weight", "normal")
                .style("fill", "black")
                .attr("font-size", "10");
            }

        })
        .on('click', function(d, i) {
            inspect = (inspect + 1) % 2;

            var j = 0;

            for (j = 0; j < stack.length; j++) {
                if (stack[j][i][0] == d[0] && stack[j][i][1] ==d[1]) {
                    break;
                }
            }

            // Transition main chart
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
                    else if (stack[j][ni] == nd)
                        return margin + yscale(nd[1] - nd[0]);
                    else
                        return height + margin;
                });

            // Add labels
            if (inspect == 1) {
                var barinfo = stack[j].map(nd => { return {"Year": nd.data.Year, "value": nd[1] - nd[0]}; } );

                bardata.selectAll("text")
                    .data(barinfo)
                    .enter()
                    .append("text")
                    .attr("class","label")
                    .attr("x", nd => { return margin + xscale.bandwidth()/2 + xscale(nd.Year); })
                    .attr("y", nd => { return margin + yscale(nd.value) - 10; })
                    .style("fill", nd => { return cscale[j%cscale.length]; })
                    .text(nd => { return nd.value; });
            } else {
                bardata.selectAll("text").transition().delay(1000).remove();
            }

            // Update Legend
            legend
                .attr("font-weight", function(d, i) { return (i == j && inspect == 1) ? "bold" : "normal";})
                .style("fill", function(d, i) { return (i == j && inspect == 1) ? cscale[j%cscale.length] : "black";})
                .transition().duration(250)
                .attr("font-size", function(d, i) { return (i == j && inspect == 1) ? "14" : "10";});
        });

    legend
        .on("mouseover", function(d, i) {
            if (inspect == 1)
                return; // do nothing.

            d3.select(this)
                .attr("font-weight", "bold")
                .style("fill", cscale[i%cscale.length])
                .transition().duration(250)
                .attr("font-size", "14");

            chart.style("opacity", function(c, ci) { return stack[i][ci] == c ? 0.5 : 1; });
        })
        .on('mouseout', function(d) {
            if (inspect == 1)
                return; // do nothing.

            d3.select(this)
                    .transition().delay(250)
                    .attr("font-weight", "normal")
                    .style("fill", "black")
                    .attr("font-size", "10");

            chart.style("opacity", "1");
        })
        .on('click', function(d, j) {
            inspect = (inspect + 1) % 2;

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
                    else if (stack[j][ni] == nd)
                        return margin + yscale(nd[1] - nd[0]);
                    else
                        return height + margin;
                });

            // Add labels
            if (inspect == 1) {
                var barinfo = stack[j].map(nd => { return {"Year": nd.data.Year, "value": nd[1] - nd[0]}; } );

                bardata.selectAll("text")
                    .data(barinfo)
                    .enter()
                    .append("text")
                    .attr("class","label")
                    .attr("x", nd => { return margin + xscale.bandwidth()/2 + xscale(nd.Year); })
                    .attr("y", nd => { return margin + yscale(nd.value) - 10; })
                    .style("fill", nd => { return cscale[j%cscale.length]; })
                    .text(nd => { return nd.value; });
            } else {
                bardata.selectAll("text").transition().delay(1000).remove();
            }

            legend
                .attr("font-weight", function(d, i) { return (i == j && inspect == 1) ? "bold" : "normal";})
                .style("fill", function(d, i) { return (i == j && inspect == 1) ? cscale[j%cscale.length] : "black";})
                .transition().duration(250)
                .attr("font-size", function(d, i) { return (i == j && inspect == 1) ? "14" : "10";});
        });
}

async function init() { // Allow for loading
    data = await d3.csv("https://adam-reid.github.io/cs-498-dv-project/table_02_04q418.csv", function(d, i, columns) {
        for(i = 0; i < columns.length; i++)
            d[columns[i]] = +d[columns[i]];

        delete d["TOTAL fatalities"];
        return d;
    }).then(function(data) {
        overviewData = data;

        var allColumns = Object.keys(overviewData[0]);

        overviewColumns = allColumns.slice(0,1).concat(allColumns.slice(1, 34));
        smallColumns = overviewColumns.slice(0, 1).concat(overviewColumns.slice(7));
        largeColumns = overviewColumns.slice(0, 5).concat(overviewColumns.slice(34));

        smallData = data.map(function(d, i) {
            return Object.keys(d)
                .filter(key => smallColumns.includes(key))
                .reduce((obj, key) => {
                    obj[key] = d[key];
                    return obj;
                  }, {});
            });

        largeData = data.map(function(d, i) {
            return Object.keys(d)
                .filter(key => largeColumns.includes(key))
                .reduce((obj, key) => {
                    obj[key] = d[key];
                    return obj;
                  }, {});
            });

        overviewData = overviewData.map(d => {
            d.total = Object.values(d).reduce((a,b) => a + b, 0) - d.Year;
            d.average = d.total / (overviewColumns.length - 1);

            return d;
        })

        smallData = smallData.map(d => {
            d.total = Object.values(d).reduce((a,b) => a + b, 0) - d.Year;
            d.average = d.total / (smallColumns.length - 1);
            return d;
        })

        largeData = largeData.map(d => {
            d.total = Object.values(d).reduce((a,b) => a + b, 0) - d.Year;
            d.average = d.total / (largeColumns.length - 1);
            return d;
        })

        overview();
    }).catch(function(error, rows) {
        console.log("An error occurred.");
    });
}
