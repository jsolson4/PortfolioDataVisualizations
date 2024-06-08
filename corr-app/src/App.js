import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import 'd3-force-boundary';
import './ticker_styles.css';
import * as fx from './functions';
import * as ui from './user_actions';


console.log("test")

const CorrelationExplorer = () => {
  const [correlation, setCorrelation] = useState(0.0);

  useEffect(() => {
    const svg = d3.select("#graph-container");
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const myHeading = d3.select('#my-heading');
    const defaultHeading = "Average Pairwise Correlations";
    myHeading.text(defaultHeading);

    d3.dsv(',', '/data/ticker_corr3.csv').then(data => {
      const links = data.map(d => ({
        source: d.source,
        target: d.target,
        correlation: Math.round(+d.Correlation * 100) / 100,
        value: isNaN(d.norm_corr) ? 0 : +d.norm_corr,
      }));

      d3.dsv(',', '/data/ticker_nodes3.csv').then(data2 => {
        const nodes = data2.map(d => ({
          name: d.name,
          Correlation: +d.Correlation,
        }));
        var origNodes = structuredClone(nodes);
        var graphData = { nodes:nodes, links:links };

        console.log("graph data created:", graphData)
        console.log("graph data links:", graphData.links)
        var nodeScale = d3.scaleLinear()
          .domain(d3.extent(graphData.links, d => Math.abs(d.correlation)))
          .range([8, 75]);

        const simulation = d3.forceSimulation(graphData.nodes)
          .alpha(0.5)
          .alphaDecay(0.01) // Disable automatic alpha decay
          .alphaMin(0.1)  
          .force("charge", d3.forceManyBody().strength(4))
          .force("center", d3.forceCenter(width / 2, height / 2).strength(1))
          .force("collide", d3.forceCollide(d => nodeScale(Math.abs(d.Correlation))).strength(0.8))
          .on("tick", ticked);

        const drag = d3.drag()
          .on("start", (event, d) => ui.dragStart(event, d, simulation))
          .on("drag", ui.drag)
          .on("end", ui.dragEnded);

        const textsAndNodes = svg.selectAll("g")
          .data(graphData.nodes)
          .enter()
          .append("g")
          .call(drag) 
          .on("click", function(event, d) {
            clicked.call(this, d, origNodes, graphData, nodeScale, simulation, myHeading);
          })
          .on("mouseover", fx.mouseover)
          .on("mouseout", fx.mouseleave);

        const circles = textsAndNodes.append("circle")
          .attr("class", "node")
          .attr("r", d => nodeScale(Math.abs(d.Correlation)))
          .attr("fill", d => d.Correlation < 0 ? "#A9A9A9" : "#327FB9");

        // textsAndNodes.append("circle")
        //   .attr("class", "node")
        //   .attr("r", d => nodeScale(Math.abs(d.Correlation)))
        //   .attr("fill", d => d.Correlation < 0 ? "#A9A9A9" : "#0C5E98");

        textsAndNodes.append("text")
          .attr("class", "text")
          .text(d => d.name);

        function ticked() {
          textsAndNodes.attr("transform", d => `translate(${d.x}, ${d.y})`);
        }

        function clicked(d, origNodes, graphData, nodeScale, simulation, myHeading) {

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
            fx.updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation);
          }

          if (selectedNode.size() === 1) {
            selectedNode.attr("class", "node");
            selectedText.attr("class", "text");
          }

          const selectedNodeEndState = d3.selectAll("circle.selectedNode");

          if (circle.size() === 1 && selectedNode.size() === 1 && selectedNodeEndState.size() === 1) {
            // circles to textAndNodes
            fx.updateNodeRadiusToLinkCorr(d, circles, origNodes, graphData, nodeScale, simulation);
          }

          if (selectedNodeEndState.size() === 0) {
            myHeading.text(defaultHeading);
            // circles to textAndNodes
            fx.resetNodeCorrelations(graphData, origNodes, d, circles, nodeScale, simulation, myHeading, defaultHeading);
          }
          // DEV:add final sim reset (can delete...)
          console.log("run force collide")
          fx.updateForceCollide(simulation, nodeScale);
        }

      // // Set up interval to log simulation status
      // const interval = setInterval(() => {
        
      //   //console.log("Simulation alpha:", simulation.alpha());
      //   //console.log("Nodes positions:", graphData.nodes.map(node => ({ x: node.x, y: node.y })));
      // }, 2000); // 2000 milliseconds = 2 seconds

      // // Clean up interval on component unmount
      // return () => clearInterval(interval);

      }).catch(error => {
        console.error("Error loading file 2:", error);
      });
    }).catch(error => {
      console.log("Error:", error);
    });
  }, []);

  return (
    <div>
      <div className="left-column">
        <div className="left-column-content">
          <h2>Correlation Explorer</h2>
          <div className="slidecontainer">
            <input type="range" min="0" max="1" value={correlation} step="0.01" className="slider" id="corrRange" 
              onChange={(e) => setCorrelation(e.target.value)} />
            <p>Min. Correlation: <span id="corrMinValue">{correlation}</span></p>
          </div>
        </div>
      </div>
      <div className="right-column">
        <h2 id="my-heading" style={{ textAlign: 'center' }}>Original heading text</h2>
        <svg id="graph-container" width="1100" height="800"></svg>
        <div className="tooltip" id="tooltip"></div>
      </div>
    </div>
  );
};

export default CorrelationExplorer;
