function dragStart(event, d) {
    {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      }
  };

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
};

function dragEnded(event, d) {
  // if node has been dragged, activate pin response
  if (event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;

  // if d is selected, change color. 
  if (d.fixed == true) {
      d3.select(this)
      .select("circle")
      .style("fill", "#D72862")
  }
};

function clicked(event, d) {
      var circle = d3.select(this).select("circle");
      // Check if the node is already selected (red fill color)
      var isSelected = circle.attr("fill") === "#D72862";

      // Toggle node color
      if (isSelected) {
          // If already selected, turn it off
          circle.attr("fill", "steelblue");
      } else {
          // If not selected, turn it on
          circle.attr("fill", "#D72862");
      }
};

