

import * as d3 from 'd3';
//import './ticker_styles.css';

// Three function that change the tooltip when user hover / move / leave a cell


// function to calculate the node radius
export function calcRadius(nodeScale, correlation){
    const radius = nodeScale(Math.abs(correlation))
    return radius
};


export function updateForceCollide(simulation, nodeScale) {
    console.log("Updating force collide");
    
    // Update the radius accessor function of forceCollide
    simulation.force("collide", d3.forceCollide().radius(d => {
        const radius = nodeScale(Math.abs(d.Correlation));
        return radius + 2; // Adding padding to avoid overlap
    }).strength(0.8));

    // Restart the simulation to apply the changes
    simulation.alpha(0.3).restart();
    //console.log("Simulation alpha:", simulation.alpha());

    return simulation;
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


// function update node corr
export function updateNodeCorr(nodes, nodeName, newCorr){
    nodes.filter(node => node.name === nodeName)
         .forEach(node => {
            node.Correlation = newCorr;
        });
    return nodes
};

// SOLUTION TO MY ISSUE WAS THAT I NEEDED TO REFRESH TEXTSANDNODES
function refreshTextsAndNodes(svg, nodes, nodeScale) {
    const textsAndNodes = svg.selectAll("g")
        .data(nodes);

    textsAndNodes.select("circle")
        .attr("r", d => nodeScale(Math.abs(d.Correlation)))
        .attr("fill", d => d.Correlation < 0 ? "#A9A9A9" : "#327FB9");

    textsAndNodes.select("text")
        .text(d => d.name);

    textsAndNodes.attr("transform", d => `translate(${d.x}, ${d.y})`);
};


export function clicked(d, origNodes, graphData, circles, nodeScale, simulation, myHeading, defaultHeading, svg) {

    const circle = d3.select(this).select("circle");
    const text = d3.select(this).select("text");

    const selectedNode = d3.selectAll("circle.selectedNode");
    const selectedText = d3.selectAll("text.selectedText");

    circle.attr("class", "selectedNode");
    text.attr("class", "selectedText");

    myHeading.text(`Correlations to ${d.name}`);
    
    if (circle.size() === 1 && selectedNode.size() === 0) {
      console.log("start resize")
      
      // circles to textsAndNodes
      updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation);
      console.log("graphData in clicked after corr update:", graphData)
    }

    if (selectedNode.size() === 1) {
      selectedNode.attr("class", "node");
      selectedText.attr("class", "text");
    }

    const selectedNodeEndState = d3.selectAll("circle.selectedNode");

    if (circle.size() === 1 && selectedNode.size() === 1 && selectedNodeEndState.size() === 1) {
      // circles to textAndNodes
      updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation);
      console.log("graphData in clicked after corr update:", graphData)
    }

    if (selectedNodeEndState.size() === 0) {
      myHeading.text(defaultHeading);
      
      // circles to textAndNodes
      resetNodeCorrelations(graphData, origNodes, d, circles, nodeScale, simulation, myHeading, defaultHeading);
    }
    // DEV:add final sim reset (can delete...)
    console.log("run force collide")
    simulation = updateForceCollide(simulation, nodeScale);

    // Refresh textsAndNodes to reflect updated data
    refreshTextsAndNodes(svg, graphData.nodes, nodeScale);

  };


  export function ticked(textsAndNodes) {
    textsAndNodes.attr("transform", d => `translate(${d.x}, ${d.y})`);
  };





//   export function updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation) {
//     console.log("Begin updateNodeRadiusToLinkCorr");
    
//     const relevantLinks = graphData.links.filter(link => link.source === d.name);
//     const correlationArray = relevantLinks.map(link => link.correlation);

//     circles.each(function(e) {
//         let newCorr;
//         if (d.name === e.name) {
//             newCorr = origNodes.find(node => node.name === d.name).Correlation;
//         } else {
//             const connectedLink = graphData.links.find(l => l.source === d.name && l.target === e.name);
//             newCorr = connectedLink ? connectedLink.correlation : 0;
//         }

//         graphData.nodes = updateNodeCorr(graphData.nodes, e.name, newCorr);
//         const radius = calcRadius(nodeScale, newCorr);
//         updateCircles.call(this, radius, newCorr);
//     });

//     simulation = updateForceCollide(simulation, nodeScale);
// };

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


// // Function to update forceCollide after node radius change
// export function updateForceCollide(simulation, nodeScale) {
//     // Update the radius accessor function of forceCollide
//     // simulation.force("collide", d3.forceCollide(function(d){
//     //             return radius; //d.Correlation
//     //         })
//     //         .strength(0.8));

//    console.log("run update force collide")
   
//     // Update the radius accessor function of forceCollide
//    simulation.force("collide", 
//                     d3.forceCollide().radius(function(d){
//                         if (d.name === 'SSSS'){
//                             console.log("d:", d)
//                             console.log("correlation:", d.Correlation)
//                             console.log("radius:", nodeScale(Math.abs(d.Correlation)))
//                         }
                        
//                     return nodeScale(Math.abs(d.Correlation))
//                     ; //d.Correlation
//     })
//     .strength(0.8));

//     // restart the simulation to apply the changes
//     simulation.alpha(0.3).restart();
//     console.log("simulation alpha:", simulation.alpha())

//     return simulation
// };

// // update simulation
// export function restartSimulation(simulation){
//     simulation.alpha(1).restart();
// }




// updateNodeRadiusToLinkCorr (original)
//
// Define a function to update node radii based on link correlation
export function updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation) {

    // get all relevant links
    console.log("begin updateNodeRadiusToLinkCorr")
    console.log("d:", d)
    console.log("circles:", circles)
    console.log("graphData:", graphData)
    const relevantLinks = graphData.links.filter(link => link.source === d.name)
    console.log("relevant links:", relevantLinks)
    
    // extract corrrelation values into an array
    //const correlationArray = relevantLinks.map(link => link.correlation)

    circles.each(function(e) {
        console.log("e:", e)
        // size selected node
        if (d.name === e.name){
            // find the new correlation value
            const newCorr = origNodes.filter(node => node.name === d.name)[0].Correlation;

            // update correlation value in graphData.nodes
            updateNodeCorr(graphData.nodes, d.name, newCorr);
            
            // get node radius
            const radius = calcRadius(nodeScale, newCorr);

            // update the circle sizes
            updateCircles.call(this, radius, newCorr);
        
        } else { // size all other nodes
        
            // for non-selected nodes, update with correlation value
            const connectedLinks = graphData.links.filter(l => l.source === d.name && l.target === e.name);
            
            // new corr is extracted from the set of links
            const newCorr = connectedLinks[0].correlation;
            
            // get node radius
            const radius = calcRadius(nodeScale, newCorr);

            // update circles
            updateCircles.call(this, radius, newCorr);

            // update node corr
            updateNodeCorr(graphData.nodes, e.name, newCorr);
            console.log("node corr post update:", graphData.nodes)
        };
    });

    // restart simulation to apply changes (update node radii sizes)
    //restartSimulation(simulation);
    updateForceCollide(simulation, nodeScale);
};


