function optionChanged(selectedID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {

        // Data selected ID
        let selectedData = data.samples.filter(sample => sample.id.toString() === selectedID)[0];

        // Bar chart data selection
        let otu_ids = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let sample_values = selectedData.sample_values.slice(0, 10).reverse();
        let otu_labels = selectedData.otu_labels.slice(0, 10).reverse();

        // Trace for bar chart
        let barTrace = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: 'bar',
            orientation: 'h'
        };

        let barLayout = {
            title: 'Top 10 OTUs for Selected ID',
            margin: {
            }
        };

        Plotly.newPlot('bar', [barTrace], barLayout);

        // Bubble chart data selection
        otu_ids = selectedData.otu_ids;
        sample_values = selectedData.sample_values;
        otu_labels = selectedData.otu_labels;

        // Trace for bubble chart
        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                sizemode: 'diameter'
            }
        };

        let bubbleLayout = {
            title: 'Bubble Chart for Each Sample',
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' },
            showlegend: false,
        };

        Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);
    });
    displayMetadata(selectedID);

}

// Dropdown creation
function dropDown() {
    let dropdown = d3.select("#selDataset");

    // Get sample IDs for drop down
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        data.names.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });

        // First sample becomes initial value
        let initialID = data.names[0];
        optionChanged(initialID);
    });
}

// Initialize dropDown function at open
dropDown();

// displayMetadata function
function displayMetadata(selectedID) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        let metadata = data.metadata.filter(meta => meta.id.toString() === selectedID)[0];
        
        // Connect to HTML
        let meta = d3.select("#sample-metadata");
        
        // Clear data as it will need to update each time
        meta.html("");
        
        // Update demographic info each time and add it to the demographic info
        Object.entries(metadata).forEach(([key, value]) => {
            meta.append("h5").text(`${key}: ${value}`);
        });
    });
}

