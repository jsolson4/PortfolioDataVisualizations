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
