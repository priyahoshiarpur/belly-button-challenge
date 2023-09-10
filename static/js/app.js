// coulor of Belly Button Biodiversity Dashboard
document.body.style.backgroundColor = 'aliceblue';

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log
 
d3.json(url).then(function(data) {

  console.log(data.names[2]);

  //Create DDL from names list - working code option 1
  let myddl = d3.select('select');
  data.names.forEach(nameber => myddl.append('option').attr('value',nameber).text(nameber));
  

  let dropdown = d3.select("#selDataset");//selects by html id
  dropdown.on("change", function() {
    userChoice = this.value; //captures the userChoice
    console.log(userChoice);
    const userChoiceIndex = (element) => element == userChoice;
    console.log(userChoiceIndex);
    nameIndex = data.names.findIndex(userChoiceIndex);
    console.log(nameIndex);
    d3.select('.panel-body').html("");
    //run the following functions with the new nameIndex
    dInfo(nameIndex);
    barChart(nameIndex);
    bubbleChart(nameIndex);
    bbWash(nameIndex);
  });

  //set default for nameIndex to 0 NEED TO KEEP VAR - doesn't work with LET
  
  var nameIndex=(typeof nameIndex === 'undefined')? 0:nameIndex;
  console.log(nameIndex)

  //DEMOGRAPHIC INFO VISUAL
  //this displays the id, ethnicity, gender, age, location, bellybutton type and wash frequency for the default or selected Test Subject ID
  function dInfo(nameIndex) {
    let demoInfo = data.metadata[nameIndex];
    console.log(demoInfo)
    Object.entries(demoInfo).forEach(([key,value])=> {
    let addDemoData = d3.select('.panel-body').append('h5');
    addDemoData.text(`${key}:  ${value}`)
  })};
  dInfo(nameIndex);

  //BAR CHART VISUAL
  function barChart(nameIndex) {
    let barx = data.samples[nameIndex].sample_values.slice(0, 10).reverse(); // sample_values
    let bary = data.samples[nameIndex].otu_ids.slice(0, 10).reverse(); // otu_ids, use this to build string for chart
    let barystr = [] // use this for bar chart
    bary.forEach(pear => barystr.push(`OTU_${pear}`));
    let barz = data.samples[nameIndex].otu_labels.slice(0, 10).reverse(); // otu_labels
    console.log(barx);
    console.log(bary);
    console.log(barz);
  
    let trace1 = {
      x: barx,
      y: barystr,
      text: barz,
      type: 'bar',
      orientation: 'h',
    };
    let data1 = [trace1];
  
    let layout1 = {
      showlegend: false,
      height: 400,
      width: 500,
      xaxis: { title: "OTU count" },
      margin: { t: 50, r: 25, l: 75, b: 35 },
      paper_bgcolor: "aliceblue",
      font: { color: "light blue", family: "Arial" }
    };
  
    Plotly.newPlot("bar", data1, layout1);
  }
  barChart(nameIndex);

  //BUBBLEPLOT VISUAL
  //this plots all of the Operational Taxonomic Units (otu_id) on the x axis and by marker color
  //count(sample_value) on the y axis and by marker size
  //shows the types of bacteria found (otu_labels) for the default or selected Test Subject ID

  function bubbleChart(nameIndex) {
    let bubblex = [data.samples[nameIndex].otu_ids];
    console.log(bubblex)
    let bubbley = [data.samples[nameIndex].sample_values];
    console.log(bubbley)
    let bubblez = [data.samples[nameIndex].otu_labels];
    console.log(bubblez)
  
   let trace2 = {
      x: bubblex[0],
      y: bubbley[0],
      xlimit: 4000,
      text: bubblez[0],
      mode: 'markers',
      marker: {
        size: bubbley[0],
        color: bubblex[0],
        colorscale: 'Portland'
      }
    };
    let data2 = [trace2];

    let layout2 = {
      title: {text: `ID_${data.names[nameIndex]} OTU Counts`,font: { size: 24 } },
      showlegend: false,
      margin: { t: 75, r: 25, l: 50, b: 35 },
      paper_bgcolor: "aliceblue",
      font: { color: "darkblue", family: "Arial" },
      xaxis: {title:"OTU_ID"},
      yaxis: {title: "OTU count"}
    };
 
  Plotly.newPlot('bubble', data2, layout2)};
  bubbleChart(nameIndex);


  //GAUGECHART VISUAL
  //this plots the average number of times that the default or selected Test Subject washed their belly button per week (wfreq)
  function bbWash(nameIndex) {
    let gaugechartinfo = data.metadata[nameIndex].wfreq;
    console.log(gaugechartinfo)

    let data3 = [
      {
      type: "indicator",
      mode: "gauge+number",
      value: gaugechartinfo,
      title: { text: "Belly Button Washing Frequency<br><sup>Scrubs per Week</sup>", font: { size: 24 } },
      gauge: {
        axis: { range: [null, 9], tick0: 0, dticks: 8, tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
 
          // color scheme 
          { range: [0, 1], color: "#F3F6D6"},
          { range: [1, 2], color: "#EFF3C9"},
          { range: [2, 3], color: "#ECF1BD"},
          { range: [3, 4], color: "#E5E9B1"},
          { range: [4, 5], color: "#CED77B"},
          { range: [5, 6], color: "#B7CF83"},
          { range: [6, 7], color: "#A9D08E"},
          { range: [7, 8], color: "#A2CD85"},
          { range: [8, 9], color: "#6CA644"},
          ],
        }
      }
    ];
  
    let layout3 = {
      width: 500,
      height: 400,
      margin: { t: 100, r: 25, l: 25, b: 25 },
      paper_bgcolor: "aliceblue",
      font: { color: "darkblue", family: "Arial" }
    };
  
  Plotly.newPlot('gauge', data3, layout3)};
  bbWash(nameIndex)

});
