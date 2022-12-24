//import * as d3 from "https://cdn.skypack.dev/d3@7.6.1";

/**
* Adapted from David Lengweiler at 
* https://beta.observablehq.com/@mbostock/d3-force-directed-graph
*/

const data = {
  "nodes": [

    /**
     * Nodes Legens
     *    1-10: Single Nodes TOP
     *    100-199: Single Nodes BOTTOM
     *    200-299: Multi Nodes Nodes TOP
     *    300-399: Multi Nodes BOTTOM
    **/

    // SINGLE NODES
/*     // left top
    {"id": 1, "x":10 , "y":12, "type": "doc"},
    {"id": 2, "x":25 , "y":10, "type": "doc"},
    {"id": 3, "x":21 , "y":45, "type": "db"},
    
    // right top
    {"id": 4, "x":60 , "y":25, "type": "db"},
    {"id": 5, "x":68 , "y":15, "type": "doc"},
    {"id": 6, "x":79 , "y":41, "type": "graph"},
    {"id": 7, "x":88 , "y":12, "type": "doc"},

    // left bottom
    {"id": 100, "x":10 , "y":65, "type": "db"},
    {"id": 101, "x":12 , "y":79, "type": "doc"},
    {"id": 102, "x":30 , "y":68, "type": "graph"},
    {"id": 103, "x":35 , "y":82, "type": "doc"},
    
    // right bottom
    {"id": 104, "x":80 , "y":75, "type": "graph"},
    {"id": 105, "x":85 , "y":68, "type": "doc"},
    {"id": 106, "x":97 , "y":67, "type": "db"},
    
    {"id": 107, "x":61 , "y":82, "type": "graph"},
    {"id": 108, "x":57 , "y":95, "type": "db"},
    {"id": 109, "x":85 , "y":89, "type": "doc"},
    {"id": 110, "x":80 , "y":80, "type": "db"},
    {"id": 111, "x":88 , "y":90, "type": "db"}, */


    // MULTI NODES
    // left top
    {"id": 201, "x":10 , "y":12, "type": "doc"},
    {"id": 202, "x":25 , "y":10, "type": "doc"},
    {"id": 203, "x":21 , "y":45, "type": "db"},

    {"id": 208, "x":10 , "y":12, "type": "graph"},
    {"id": 209, "x":25 , "y":10, "type": "doc"},
    {"id": 210, "x":21 , "y":15, "type": "db"},

    // right top
    {"id": 204, "x":60 , "y":25, "type": "db"},
    {"id": 205, "x":68 , "y":15, "type": "doc"},
    {"id": 206, "x":79 , "y":41, "type": "graph"},
    {"id": 207, "x":88 , "y":12, "type": "doc"},

    // left bottom
    {"id": 300, "x":10 , "y":65, "type": "db"},
    {"id": 301, "x":12 , "y":79, "type": "doc"},
    {"id": 302, "x":30 , "y":68, "type": "graph"},
    {"id": 303, "x":35 , "y":82, "type": "doc"},
    
    // right bottom
    {"id": 304, "x":80 , "y":75, "type": "graph"},
    {"id": 305, "x":85 , "y":68, "type": "doc"},
    {"id": 306, "x":97 , "y":67, "type": "db"},
    
    {"id": 307, "x":61 , "y":82, "type": "graph"},
    {"id": 308, "x":57 , "y":95, "type": "db"},
    {"id": 309, "x":85 , "y":89, "type": "doc"},
    {"id": 310, "x":80 , "y":80, "type": "db"},
    {"id": 311, "x":88 , "y":90, "type": "db"},

   /*  {"id": 312, "x":80 , "y":75, "type": "graph"},
    {"id": 313, "x":97 , "y":67, "type": "db"}, */
  ],
  "links": [
    // left top
    {"source": 201, "target": 202, "value": 2, "strength": 0.3},
    {"source": 202, "target": 203, "value": 2, "strength": 0.3},
    {"source": 203, "target": 201, "value": 2, "strength": 0.3},
    
    {"source": 208, "target": 209, "value": 2, "strength": 0.3},
    {"source": 208, "target": 210, "value": 2, "strength": 0.3},
    
    // right top
    {"source": 204, "target": 205, "value": 2, "strength": 0.3},
    {"source": 205, "target": 206, "value": 2, "strength": 0.3},
    {"source": 206, "target": 207, "value": 2, "strength": 0.3},
    
    // left bottom
    {"source": 300, "target": 301, "value": 2, "strength": 0.3},
    {"source": 301, "target": 302, "value": 2, "strength": 0.3},
    {"source": 302, "target": 303, "value": 2, "strength": 0.3},
    
    // right bottom
    {"source": 304, "target": 305, "value": 2, "strength": 0.3},
    {"source": 305, "target": 306, "value": 2, "strength": 0.3},
    
    {"source": 307, "target": 309, "value": 2, "strength": 0.3},
    {"source": 308, "target": 309, "value": 2, "strength": 0.3},
    {"source": 309, "target": 310, "value": 2, "strength": 0.3},
    {"source": 310, "target": 311, "value": 2, "strength": 0.3},

    //{"source": 312, "target": 313, "value": 2, "strength": 0.3},
  ]
}


let graph = data;


let hidden = []
let active;

const jsonize = (obj) => {
   json = "";
   for (const key in obj) {
      json += ` <strong>${key}:</strong> ${JSON.stringify(obj[key]).replaceAll("\"", "")}`;
   }
   return json;
}

const width = 100
const height = 100
const svg = d3
   .select("#chart-area")
   .append("svg")
   .attr("width", width)
   .attr("height", height)
   .attr("viewBox", `0 0 ${width} ${height}`)


let nodes = data.nodes;
let links = data.links;

 var nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
  nodeGroup, // given d in nodes, returns an (ordinal) value for color
  nodeGroups, // an array of ordinal values representing the node groups
  nodeTitle, // given d in nodes, a title string
  nodeFill = "transparent", // node stroke fill (if not using a group color encoding)
  nodeStroke = "transparent", // node stroke color
  nodeStrokeWidth = 1.5, // node stroke width, in pixels
  nodeStrokeOpacity = 1, // node stroke opacity
  nodeRadius = 5, // node radius, in pixels
  nodeStrength = -height*6,
  linkSource = ({source}) => source, // given d in links, returns a node identifier string
  linkTarget = ({target}) => target, // given d in links, returns a node identifier string
  linkStroke = "white", // link stroke color
  linkStrokeOpacity = 0.6, // link stroke opacity
  linkStrokeWidth = 0.3, // given d in links, returns a stroke width in pixels
  linkStrokeLinecap = "round", // link stroke linecap
  linkStrength,
  imageHeight = 10,
  forceStrength = -50,
  colors = d3.schemeTableau10, // an array of color strings, for the node groups
  invalidation // when this promise resolves, stop the simulation
 
 
 // Compute values.
  const N = d3.map(nodes, nodeId).map(intern);
  const LS = d3.map(links, linkSource).map(intern);
  const LT = d3.map(links, linkTarget).map(intern);
  if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
  const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
  const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
  const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);

  // Replace the input nodes and links with mutable objects for the simulation.
  nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
  links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

  // Compute default domains.
  if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

  // Construct the scales.
  const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

  // Construct the forces.
  const forceNode = d3.forceManyBody().strength(4)
  const forceLink = d3.forceLink(links).id(({index: i}) => N[i]).distance(14);
  if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
  if (linkStrength !== undefined) forceLink.strength(linkStrength);

  const simulation = d3.forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", d3.forceManyBody().strength(forceStrength))
    //.force('collision', d3.forceCollide().radius(function(d){return d.radius/2;}))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("radial", d3.forceRadial(120, width / 2, height / 2).strength(0.01))
    .force("collide", d3.forceCollide().radius(5))
    .force("link", forceLink)
    .force("charge", d3.forceManyBody().strength(forceStrength))
    //.force('collision', d3.forceCollide().radius(function(d){return d.radius/2;}))
    .force("x", d3.forceX().x(d => d.x).strength(0.065))
    .force("y", d3.forceY(height / 2).strength(0.15))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);


  const link = svg.append("g")
    .attr("stroke", linkStroke)
    .attr("stroke-opacity", linkStrokeOpacity)
    .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
    .attr("stroke-linecap", linkStrokeLinecap)
    .selectAll("line")
    .data(links)
    .join("line");

  if (W) link.attr("stroke-width", ({index: i}) => W[i]);

 const group = svg.append("g")
      .attr("fill", nodeFill)
      .attr("stroke", nodeStroke)
      .attr("stroke-opacity", nodeStrokeOpacity)
      .attr("stroke-width", nodeStrokeWidth)
      .selectAll("circle")
      .data(nodes)
      .join("g")
      .call(drag(simulation));

  const node = group
    .append("circle")
    .attr("r", nodeRadius)

  node.exit().remove()
  
  const image = group.append("svg:image")
        .attr("xlink:href", getImage)
        .attr("x", function(d) { return -imageHeight/4;})
        .attr("y", function(d) { return -imageHeight/4;})
        .attr("height", imageHeight/2 )
        .attr("width", imageHeight/2 )

  image.exit().remove()
  
  if (G) node.attr("fill", ({index: i}) => color(G[i]));
  if (T) node.append("title").text(({index: i}) => T[i]);

  // Handle invalidation.
  if (invalidation != null) invalidation.then(() => simulation.stop());

  function intern(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
  }

  function ticked() {    
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
    
    image
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
 
  }

  function drag(simulation) {    
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

function getImage(d) { 
    var n = data.nodes.filter( n => n.id === d.id)[0]
    // console.log(n)
    if( n.type === 'doc'){
      return "assets/images/hero/document.svg";
    }else if( n.type === 'db' ){
      return "assets/images/hero/database.svg";
    }else if( n.type === 'graph'){
      return "assets/images/hero/oval-circle.svg";
    }
    return "assets/images/hero/document.svg";
}