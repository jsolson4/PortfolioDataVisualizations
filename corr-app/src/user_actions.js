
import * as d3 from 'd3';
import 'd3-force-boundary';
import './ticker_styles.css';

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


// Mouseleave event
export function mouseleave(event, d) {
  d3.select("#tooltip")
    .classed("visible", false); // Remove the visible class to hide the tooltip
}


export function dragStart(event, d, simulation) {
  
  //console.log("simulation:", simulation)
  // If simulation exists, set alpha target and restart
  //if (simulation) {
  //simulation.alphaTarget(0.3).restart();
  //}
  
  // If the event is not active, fix the node's position
  if (!event.active) {
    simulation.alphaTarget(0.5).restart();
    console.log("drag started.", "event active:", event.active)
    d.fx = d.x;
    d.fy = d.y;
  }
}

export function drag(event, d) {
  console.log("dragging")
  console.log("event x, y:", event.x, ",", event.y)
  d.x = event.x;
  d.y = event.y;
  console.log("d fx, fy:", d.fx, ",", d.fy)
  console.log("Dragging. event.active:", event.active);
};


// 'updated version'
// export function dragEnded(event, d, simulation) {

//   console.log("dragEnd")

//   if (simulation) {
//     simulation.alphaTarget(0);
//   }

//   // If the node has been dragged, reset the fixed position
//   if (event.active) {
//     d.fx = null;
//     d.fy = null;
//   }

//   // If the node is fixed, change its color
//   if (d.fixed === true) {
//     d3.select(event.currentTarget)
//       .select("circle")
//       .style("fill", "#D72862");
//   }
// }

export function dragEnded(event, d, simulation) {
  
  // if node has been dragged, activate pin response
  if (event.active){
    simulation.alphaTarget(0)
  };

  // Reset fixed position
  d.fx = null;
  d.xy = null;    
  console.log("Drag ended:", d);
  // // if d is selected, change color. 
  // if (d.fixed === true) {
  //     d3.select(this)
  //     .select("circle")
  //     .style("fill", "#D72862")
  // }
};

// export function clicked(event, d) {
//   // Log the click event
//   console.log("clicked");

//   // Select the circle element within the current node
//   const circle = d3.select(this).select("circle");

//   // Log the selected circle element (for debugging purposes)
//   console.log("circle:", circle);

//   // Check if the node is already selected (red fill color)
//   const isSelected = circle.attr("fill") === "#D72862";

//   // Toggle the node color based on its current state
//   circle.attr("fill", isSelected ? "steelblue" : "#D72862");
// };


