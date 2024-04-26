


// Three function that change the tooltip when user hover / move / leave a cell

// define what happens on mouse over event
function mouseover(event, d) {
    // get pointer position
    const xy = d3.pointer(event, svg.node())

    d3.select("#tooltip")
        .style("opacity", 1)
        .html(`Node:${d.name}<br>Correlation: ${d.Correlation}`)
        .style("left", (xy[0]) + "px")
        .style("top", (xy[1]-50) + "px");
};

// define what happens when the mouse leaves the svg
function mouseleave(event, d) {
    d3.select("#tooltip")
        .style("opacity", 0)
  };


// function to calculate the node radius
function calcRadius(nodeScale, correlation){
    const radius = nodeScale(Math.abs(correlation))
    return radius
};


// Function to update forceCollide after node radius change
function updateForceCollide(simulation, d, nodeScale) {
    // Update the radius accessor function of forceCollide
    // simulation.force("collide", d3.forceCollide(function(d){
    //             return radius; //d.Correlation
    //         })
    //         .strength(0.8));

   // Update the radius accessor function of forceCollide
   simulation.force("collide", d3.forceCollide(function(d){
    return nodeScale(Math.abs(d.Correlation)); //d.Correlation
    })
    .strength(0.8));

};

// update simulation
function restartSimulation(simulation){
    simulation.alpha(1).restart();
}


// create function to convert nodes to their original values on 'unclick'
function resetNodeCorrelations(graphData, origNodes, d, circles, nodeScale, simulation){
    console.log("### RUN resetNodeCorrelation ###")

    // for each circle svg...
    circles.each(function(d) {
        
        const newCorr = origNodes.filter(node => node.name == d.name)[0].Correlation

        // adjust correlation in graphData.nodes
        graphData.nodes.filter(node => node.name === d.name)[0].Correlation = newCorr

        const radius = calcRadius(nodeScale, newCorr)

        // update circle radius size to be that same as initally specified
        updateCircles.call(this, radius, newCorr);
    })
    
    // update simulation to reflect new node sizes
    updateForceCollide(simulation, d, nodeScale);
};


// repeatable fx to update correlation
function updateCircles(radius, correlation){

    // update circle size & fill color
    d3.select(this)
    .attr("r", radius)
    .attr("fill", function(d){
        return correlation < 0 ? "grey":"#0C5E98";
    });
};

// function to update the simulation value
function updateSimulation(){
 // todo
};


// function update node corr
function updateNodeCorr(nodes, nodeName, newCorr){
    nodes.filter(node => node.name === nodeName)
         .forEach(node => {
            node.Correlation = newCorr;
        });
    return nodes
};


// updateNodeRadiusToLinkCorr
//
// Define a function to update node radii based on link correlation
function updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation) { // updateNodeRadii

    // get all relevant links
    const relevantLinks = graphData.links.filter(link => link.source === d.name)

    // extract corrrelation values into an array
    const correlationArray = relevantLinks.map(link => link.correlation)

    circles.each(function(e) {

        // size selected node
        if (d.name === e.name){
            
            // find the new correlation value
            const newCorr = origNodes.filter(node => node.name === d.name)[0].Correlation

            // update correlation value in graphData.nodes
            //graphData.nodes.filter(node => node.name === d.name)[0].Correlation = newCorr
            graphData.nodes = updateNodeCorr(graphData.nodes, d.name, newCorr)

            // get node radius
            const radius = calcRadius(nodeScale, newCorr)

            // update the circle sizes
            updateCircles.call(this, radius, newCorr);
        }

        // size all other nodes
        else {
            // for non-selected nodes, update with correlation value
            const connectedLinks = graphData.links.filter(l => l.source === d.name && l.target === e.name);
            
            // new corr is extracted from the set of links
            const newCorr = connectedLinks[0].correlation
            
            // get node radius
            const radius = calcRadius(nodeScale, newCorr)

            // update circles
            updateCircles.call(this, radius, newCorr)

            // update node corr
            graphData.nodes = updateNodeCorr(graphData.nodes, e.name, newCorr);
            
            // // Find the index of the node with name 'e.name'
            // const index = graphData.nodes.findIndex(node => node.name === e.name)

            // //update node corr
            // graphData.nodes[index].Correlation = newCorr
        };

        // update simulation to reflect new node sizes
        updateForceCollide(simulation, d, nodeScale);
    });

    // restart simulation to apply changes (update node radii sizes)
    restartSimulation(simulation);
};


function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
};




