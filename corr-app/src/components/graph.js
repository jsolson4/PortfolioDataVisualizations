// src/d3Graph.js
import * as d3 from 'd3';
import 'd3-force-boundary';
import * as fx from './functions';
import * as ux from './user_actions';

export const initializeGraph = (svgSelector, dataPaths) => {
  const svg = d3.select(svgSelector);
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;
  const myHeading = d3.select('#my-heading');
  const defaultHeading = "Average Pairwise Correlations";
  myHeading.text(defaultHeading);

  d3.dsv(',', dataPaths.links).then(data => {
    const links = data.map(d => ({
      source: d.source,
      target: d.target,
      correlation: Math.round(+d.Correlation * 100) / 100,
      value: isNaN(d.norm_corr) ? 0 : +d.norm_corr,
    }));

    d3.dsv(',', dataPaths.nodes).then(data2 => {
      const nodes = data2.map(d => ({
        name: d.name,
        Correlation: +d.Correlation,
      }));

      var origNodes = structuredClone(nodes);
      var graphData = { nodes: nodes, links: links };
      var nodeScale = d3.scaleLinear()
        .domain(d3.extent(graphData.links, d => Math.abs(d.correlation)))
        .range([8, 75]);

      const simulation = d3.forceSimulation(graphData.nodes)
        .alpha(0.5)
        .alphaDecay(0.01) // Disable automatic alpha decay
        .alphaMin(0.1)
        .force("charge", d3.forceManyBody().strength(1))
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1))
        .force("collide", d3.forceCollide().radius(d => nodeScale(Math.abs(d.Correlation))).strength(0.8))
        .on("tick", () => fx.ticked(textsAndNodes));

      const drag = d3.drag()
        .on("start", (event, d) => ux.dragStart(event, d, simulation))
        .on("drag", ux.drag)
        .on("end", (event, d) => ux.dragEnded(event, d, simulation));

      const textsAndNodes = svg.selectAll("g")
        .data(graphData.nodes)
        .enter()
        .append("g")
        .call(drag)
        .on("click", function (event, d) {
          fx.clicked.call(this, d, origNodes, graphData, circles, nodeScale, simulation, myHeading, defaultHeading, svg);
        })
        .on("mouseover", ux.mouseover)
        .on("mouseout", ux.mouseleave);

      const circles = textsAndNodes.append("circle")
        .attr("class", "node")
        .attr("r", d => nodeScale(Math.abs(d.Correlation)))
        .attr("fill", d => d.Correlation < 0 ? "#A9A9A9" : "#327FB9")
        .on("mouseover", ux.mouseover)
        .on("mouseout", ux.mouseleave);

      textsAndNodes.append("text")
        .attr("class", "text")
        .text(d => d.name);

    }).catch(error => {
      console.error("Error loading nodes file:", error);
    });
  }).catch(error => {
    console.log("Error loading links file:", error);
  });
};
