// define strength scale
// var strengthScale = d3.scaleLinear([d3.min(graphData.links, function(d) {return d.value;}),
//                                     d3.max(graphData.links, function(d) {return d.value;})],
//                                     [-100, 100]); // add strength scale


// work on node-specific forces
// l[0] is the source [IMPORTANT], not sure how to implement reference by string (l['source'])
// for (let i = 0; i < graphData.links.length - 1; i++){
//     console.log(i)
//     let l = graphData.links[i]
//     console.log("l:", l, l['source'], l['target'])
//     let sourceNode = graphData.nodes.find(function(node) {return node.name === l['source'];})
//     let targetNode = graphData.nodes.find(function(node) {return node.name === l['target'];})
//     let forceStrength = strengthScale(l['value'])

//     console.log("source:", sourceNode, "target:", targetNode, "forceStrength:", forceStrength)
//     // console.log(graphData.nodes.find(function(node) {return node.name === l[0];}));
//     // console.log("raw strength:", l['value'], "scaled strength:", strengthScale(l['value'])) 
//     //console.log("test access of nodes:", graphData.nodes.find(function(node) {return node.name === 'GBDC';}))
//     //console.log("node 0:", graphData.nodes[0], "node 1:", graphData.nodes[1])
//    // try to get sim force running with a single example, then advance to iterative process
//     simulation.force("charge", isolate(d3.forceManyBody()
//                                          .strength(forceStrength),
//                                                     sourceNode,
//                                                     targetNode)
//                                 );
                        //isolate(d3.forceManyBody().strength(100), graphData.nodes[0], graphData.nodes[1]))
                    
    // simulation.force(graphData.nodes[i].id.concat(graphData.nodes[j].id), 
    //                      isolate(d3.forceManyBodyReuse().strength(-30), graphData.nodes[i], graphData.nodes[j])
    
    //simulation.force(graphData.nodes[l.source])
//};

// ##### ORIGINAL EXAMPLE ######
// data.nodes contains all nodes
// for(let i = 0; i < graphData.nodes.length - 1; i++){
//     for(let j = i + 1; j < graphData.nodes.length; j++){
//         console.log("i", i, "j", j)
//         simulation.force(graphData.nodes[i].id.concat(graphData.nodes[j].id), 
//                          isolate(d3.forceManyBodyReuse().strength(-30), graphData.nodes[i], graphData.nodes[j]));
//     }
// }

// function isolate(force, nodeA, nodeB) {
//     let initialize = force.initialize;
//     force.initialize = function() { initialize.call(force, [nodeA, nodeB]); };
//     return force;
// }


// (below text and nodes)
    // .on("mouseover", (event, d) => {
    //     // Create or select the tooltip div
    //     //let tooltip = d3.select("#graph-container").selectAll(".tooltip").data([d]);
    //     console.log("d:", d)
    //     let tooltip = d3.select("g").data([d]);//.attr("class", "tooltip");
    //     console.log("tooltip:", tooltip)
    //     tooltip = tooltip.enter()
    //                      .append("div")
    //                      .attr("class", "tooltip")
    //                      .merge(tooltip);

    //     console.log("tooltip2:", tooltip)

    //     // Update tooltip content and position
    //     tooltip
    //         .html(`Value: ${d.Correlation}`)
    //         .style("left", (event.pageX + 10) + "px")
    //         .style("top", (event.pageY - 20) + "px")
    //         .style("opacity", 1);
    //         })

    // .on("mouseout", () => {
    //     d3.select(".tooltip")
    //     //.attr("class", "node")
    //         .style("opacity", 0);
    // });
    
//textsAndNodes = textsAndNodes.filter(function(d){ return d.Correlation >= corrMinValue })


/// -------------------------------------------- ///
//   // Add an event listener to the range slider
//   const rangeSlider = document.getElementById("corrRange");
//   const corrMinimumDisplay = document.getElementById("corrMinValue");

//     // Function to update node visibility based on the slider value
//     function updateNodeVisibility(corrMinvalue) {
//     graphData.nodes.attr("display", d => (d.Correlation >= corrMinvalue) ? "block" : "none");
//   }

//   rangeSlider.addEventListener("input", function() {
//     const corrMinValue = +this.value; // Convert the value to a number
//     corrMinimumDisplay.textContent = corrMinValue;
//     updateNodeVisibility(corrMinValue);
//   }
// );

// ----------------------------------------------- //
// not completely sure what this code was intended to do
    // graphData.nodes.forEach(function(d){
    //     //console.log("node name:", node.name, "d.name:", d.name)
    //     //console.log("existing corr:", d.Correlation, "new corr:", nodes.filter(node => node.name === d.name)[0].Correlation)
    //     console.log("d:", d, d.name, "test:", origNodes.filter(node => node.name === d.name)[0].Correlation)
    //     d.Correlation = origNodes.filter(node => node.name === d.name)[0].Correlation
    //     console.log(d.Correlation, d)

    //     // probably not going to work... 'this' doesn't exist to select
    //     d3.select(this)
    //       .attr("r", nodeScale(Math.abs(d.Correlation)))
    //       // set fill depending on the new correlation value (linkCorr)
    //       .attr("fill", function(d){
    //             return linkCorr < 0 ? "grey":"#0C5E98";
    //         });
    //})
// };


// ------------------------------------------------------------- //
// --------------------------------------------------------------------------

// Call the function to update node radii initially
//updateNodeRadii();

//     .on("click", function(event, d) {
//     updateNodeSizes(d);
//     });

// // Define a function to update node positions based on selected node
// function updateNodeSizes(selectedNode) {
//     const selectedLinks = links.filter(link => link.source === selectedNode.name || link.target === selectedNode.name);
//     circles.each(function(d) {
        
//         console.log("d:", d)

//         if (d.name !== selectedNode.name) {
//             const relatedLinks = selectedLinks.filter(link => link.source === d.id || link.target === d.id);
//             const correlationValue = relatedLinks.length > 0 ? relatedLinks[0].correlation : 0;
            
//             // create temp node scale

//             // Update node position based on correlation value
//             d3.select(this)
//                 .attr("r", function(d){
//                     return nodeScale(Math.abs(d.correlation));
//                     });
//         }
//     });
// }


// update correlation function
// function updateCorrelation(event, d){
//     console.log("event:", event, "d:", d)
//     // array.forEach(element => {   
//     // });

// }

// Define a function to update the visualization based on correlation threshold
// function updateVisualization(correlationThreshold) {
//     // Filter nodes based on the correlation threshold
//     nodes = nodes.filter(function(node) {
//         console.log('update vis fx:', node.Correlation, "corr threshold:", correlationThreshold, "logic:", node.Correlation < correlationThreshold)
//         return node.Correlation < correlationThreshold;
//     });

    // Update your visualization to display only the filtered nodes
    // Your visualization update code goes here
    // For example, you might update the node positions or remove nodes from the visualization
//}

// --------------------------------------------------------------------------


// function clicked(event, d, limit = 1) {
//         var circle = d3.select(this).select("circle");
        
//         // check if the node is selected
//         var isSelected = circle.attr("class") === "selectedNode"
        
//         // collect selected nodes
//         const selectedNodes = d3.selectAll("circle.selectedNode");
        
//         // make sure the number of selected nodes is less than the limit
//         const underNodeClassCapacity = selectedNodes.size() < limit;

//         // Toggle node color //
        
//         // If not selected and under capacity limit, turn it on
//         if (underNodeClassCapacity) {
//             circle.attr("class", "selectedNode");
//             //selectedNodes.attr("class", "node");
//         }

//         // if node is selected and clicked again, turn it off
//         else if (isSelected) {
//             circle.attr("class", "node");
//         };
// };


// function clicked(event, d, limit = 1) {
//         var circle = d3.select(this).select("circle");
        
//         // check if the node is selected
//         var isSelected = circle.attr("class") === "selectedNode"
        
//         // collect selected nodes
//         const selectedNodes = d3.selectAll("circle.selectedNode");
        
//         // make sure the number of selected nodes is less than the limit
//         const underNodeClassCapacity = selectedNodes.size() < limit;

//         // Toggle node color //
        
//         // If not selected and under capacity limit, turn it on
//         if (underNodeClassCapacity) {
//             circle.attr("class", "selectedNode");
//             //selectedNodes.attr("class", "node");
//         }

//         // if node is selected and clicked again, turn it off
//         else if (isSelected) {
//             circle.attr("class", "node");
//         };
// };


// ----------
// filter nodes based on slider
// var nodes = nodes.filter(function(node) {
//     console.log("inside filter:", node.Correlation <= slider.value)
//     return node.Correlation <= slider.value;
// });


//     // Function to update node visibility based on the slider value
//     function updateNodeVisibility(corrMinvalue) {
//     graphData.nodes.attr("display", d => (d.Correlation >= corrMinvalue) ? "block" : "none");
//   }


    //.on("click", updateNodeRadiusToLinkCorr) // this was working

    // // NEW //
    // .selectAll("g")
    // .call(drag)
    // .on("click", clicked)
    // //.on("click", updateCenter)
    // .on("mouseover", mouseover)
    // //.on("mousemove", mousemove)
    // .on("mouseout", mouseleave);