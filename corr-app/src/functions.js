

import * as d3 from 'd3';
import './ticker_styles.css';

// Three function that change the tooltip when user hover / move / leave a cell

// define what happens on mouse over event
// Mouseover event
export function mouseover(event, d) {
    console.log("mouseover");

    // Get pointer position relative to the document
    //const [mouseX, mouseY] = d3.pointer(event);
    console.log(d.name, d.Correlation);

    // Select and style the tooltip
    d3.select("#tooltip")
        .html(`Security: ${d.name}<br>Correlation: ${d.Correlation}`)
        .style("left", `${d.x}px`) // Offset the tooltip slightly to the right of the cursor
        .style("top", `${d.y + 10}px`) // Offset the tooltip slightly below the cursor
        .classed("visible", true); // Add the visible class to show the tooltip
}

// export function mouseover(event, d) {
//     console.log("mouseover", event.currentTarget)
//     console.log(event)
//     console.log("d:", d)
//     // Get pointer position
//     //const xy = d3.pointer(event, svg.node());
//     const xy = d3.pointer(event, event.currentTarget);
//     console.log(d.name, d.Correlation)
//     d3.select("#tooltip")
//         .style("opacity", 1)
//         .html(`Security:${d.name}<br>Correlation: ${d.Correlation}`)
//         .style("left", (d.x) + "px")
//         .style("top", (d.y) + "px");
    
// };

// define what happens when the mouse leaves the svg
// export function mouseleave(event, d) {
//     console.log("mouse leave")
//     d3.select("#tooltip")
//         .style("opacity", 0)
//   };

// Mouseleave event
export function mouseleave(event, d) {
    d3.select("#tooltip")
      .classed("visible", false); // Remove the visible class to hide the tooltip
}


// function to calculate the node radius
export function calcRadius(nodeScale, correlation){
    const radius = nodeScale(Math.abs(correlation))
    return radius
};


// Function to update forceCollide after node radius change
export function updateForceCollide(simulation, nodeScale) {
    // Update the radius accessor function of forceCollide
    // simulation.force("collide", d3.forceCollide(function(d){
    //             return radius; //d.Correlation
    //         })
    //         .strength(0.8));

   console.log("run update force collide")
   
    // Update the radius accessor function of forceCollide
   simulation.force("collide", 
                    d3.forceCollide(function(d){
                        console.log("d:", d)
                    return nodeScale(Math.abs(d.Correlation))
                    ; //d.Correlation
    })
    .strength(0.8));

    // add reset alpha
    simulation.alpha(1).restart();

};

// update simulation
export function restartSimulation(simulation){
    simulation.alpha(1).restart();
}


// create function to convert nodes to their original values on 'unclick'
export function resetNodeCorrelations(graphData, origNodes, d, circles, nodeScale, simulation){
    
    console.log("resetNodeCorrelations")

    // for each circle svg...
    circles.each(function(d) {
        
        // converted to === from ==
        const newCorr = origNodes.filter(node => node.name === d.name)[0].Correlation

        // adjust correlation in graphData.nodes
        graphData.nodes.filter(node => node.name === d.name)[0].Correlation = newCorr

        const radius = calcRadius(nodeScale, newCorr)

        // update circle radius size to be that same as initally specified
        updateCircles.call(this, radius, newCorr);
    })
    
    // update simulation to reflect new node sizes
    updateForceCollide(simulation, nodeScale);
};


// repeatable fx to update correlation
export function updateCircles(radius, correlation){

    // update circle size & fill color
    d3.select(this)
    .attr("r", radius)
    .attr("fill", function(d){
        return correlation < 0 ? "#D9D9D9":"#0C5E98";
    });
};

// function to update the simulation value
export function updateSimulation(){
 // todo
};


// function update node corr
export function updateNodeCorr(nodes, nodeName, newCorr){
    nodes.filter(node => node.name === nodeName)
         .forEach(node => {
            node.Correlation = newCorr;
        });
    return nodes
};


// updateNodeRadiusToLinkCorr
//
// Define a function to update node radii based on link correlation
export function updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation) { // updateNodeRadii

    // get all relevant links
    console.log("begin updateNodeRadiusToLinkCorr")
    console.log("d:", d)
    console.log("circles:", circles)
    console.log("graphData:", graphData)
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
        updateForceCollide(simulation, nodeScale);
    });

    // restart simulation to apply changes (update node radii sizes)
    restartSimulation(simulation);
};


// export function dragged(event, d) {
//   d.fx = event.x;
//   d.fy = event.y;
// };



