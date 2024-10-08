// const hospitalArray = [
// // { ID: 1, Color: "Red", q1: 4, q2: 1, q3: 4, q4: "yes", q5: 5 },
// // { ID: 2, Color: "Blue", q1: 3, q2: 3, q3: 5, q4: "yes" },
// // { ID: 3, Color: "Green", q1: 1, q2: 3, q3: 5, q4: "yes" },
// // { ID: 4, Color: "Yellow", q1: 4, q2: 1, q3: 3, q4: "no" },
// // { ID: 5, Color: "Purple", q1: 5, q2: 4, q3: 5, q4: "yes" },
// // { ID: 6, Color: "Orange", q1: 4, q2: 1, q3: 3, q4: "no" },
// // { ID: 7, Color: "Pink", q1: 1, q2: 5, q3: 4, q4: "yes" },
// // { ID: 8, Color: "Brown", q1: 3, q2: 5, q3: 1, q4: "no" }


//     { ID: 1, Color: "Red", q1: 4, q2: 1, q3: 4, q4: "yes", q5: 3, q6: 2, q8: 1, q9: 4 },
//     { ID: 2, Color: "Blue", q1: 3, q2: 3, q3: 5, q4: "yes", q5: 5, q6: 4, q8: 3, q9: 2 },
//     { ID: 3, Color: "Green", q1: 1, q2: 3, q3: 5, q4: "yes", q5: 4, q6: 1, q8: 2, q9: 5 },
//     { ID: 4, Color: "Yellow", q1: 4, q2: 1, q3: 3, q4: "no", q5: 1, q6: 3, q8: 4, q9: 3 },
//     { ID: 5, Color: "Purple", q1: 5, q2: 4, q3: 5, q4: "yes", q5: 2, q6: 5, q8: 3, q9: 1 },
//     { ID: 6, Color: "Orange", q1: 4, q2: 1, q3: 3, q4: "no", q5: 4, q6: 2, q8: 5, q9: 3 },
//     { ID: 7, Color: "Pink", q1: 1, q2: 5, q3: 4, q4: "yes", q5: 5, q6: 1, q8: 4, q9: 2 },
//     { ID: 8, Color: "Brown", q1: 3, q2: 5, q3: 1, q4: "no", q5: 3, q6: 4, q8: 2, q9: 5 }


// ];
const counts = {};

// Register the ChartDataLabels plugin
Chart.register(ChartDataLabels);

function createDiv(questionsDiv) {
    let graphDiv = ''
    for (const key in questionsDiv) {
        if (counts.hasOwnProperty(key)) {
            graphDiv += '<div class="col-md-4"> <canvas class="bg-white shadow m-2 p-2" id="' + key + '" width="400" height="400"></canvas> </div>'
        }
    }
    document.getElementById('graphs').innerHTML = graphDiv;
    // console.log(graphDiv);
}

// Function to create a Line chart
function createLineChart(ctx, label, x_label, data, backgroundColor, borderColor, chartTitle) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_label, // Set x-axis labels
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 4,
                fill: false,
                tension: 0.1, // Controls the curve of the line
                pointRadius: 6, // Increase this value to make the data points larger
                pointHoverRadius: 8
            }]
        },
        options: {
            plugins: {

                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 15 // You can adjust the size as needed
                    }
                },
                legend: {
                    display: false // Hides the legend, removing the rectangle button
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Feedback Star',
                        font: {
                            size: 15// Font size for the x-axis label
                        } // Label for x-axis
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Person', // Label for y-axis
                        font: {
                            size: 15 // Font size for the x-axis label
                        }
                    },
                    beginAtZero: true
                }
            }
        },
    });
}

// Function to create a bar chart
function createBarChart(ctx, label, data, backgroundColor, borderColor) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
            datasets: [{
                label: label,
                backgroundColor: ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)'],
                // borderColor: borderColor,
                borderWidth: 1,
                data: data
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to create a donut chart
function createDonutChart(ctx, label, data, backgroundColor, borderColor, labels, chartTitle) {

    function sortTimeIntervals(a, b) {
        const order = [
            "Upto 15 mins",
            "15 - 30 mins",
            "30 - 60 mins",
            "01 - 02 hrs",
            "Above 01 hr",
            "Above 02 hrs"
        ];

        return order.indexOf(a) - order.indexOf(b);
    }

    // Combine labels and data into an array of objects
    const combinedData = labels.map((label, index) => ({
        label: label,
        value: data[index]
    }));

    // Sort the combined data array based on the time intervals
    combinedData.sort((a, b) => sortTimeIntervals(a.label, b.label));

    // Extract the sorted labels and data
    const sortedLabels = combinedData.map(item => item.label);
    const sortedData = combinedData.map(item => item.value);



    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sortedLabels,
            datasets: [{
                label: label,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 5,
                data: sortedData
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    color: ['white'],
                    backgroundColor: ["#00000060"],

                    formatter: (value, context) => {
                        let sum = 0;
                        const dataArr = context.chart.data.datasets[0].data;
                        dataArr.forEach(data => {
                            sum += data;
                        });
                        const percentage = ((value / sum) * 100).toFixed(2) + "%";
                        return percentage;
                    },
                    font: {
                        weight: 'bold',
                        size: 15
                    }
                },
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 15 // You can adjust the size as needed
                    }
                }
            }
        }
    });
}


function createPieChart(ctx, label, data, backgroundColor, borderColor, chartTitle) {


    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                label: label,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 5,
                data: data
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    color: ['white'],
                    backgroundColor: ["#00000060"],
                    formatter: (value, context) => {
                        let sum = 0;
                        const dataArr = context.chart.data.datasets[0].data;
                        dataArr.forEach(data => {
                            sum += data;
                        });
                        const percentage = ((value / sum) * 100).toFixed(2) + "%";
                        return percentage;
                    },
                    font: {
                        weight: 'bold',
                        size: 15
                    }
                },
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 15 // You can adjust the size as needed
                    }
                }
            }
        }
    });
}




// export data to excle
function exportData(data, questions, name = "Raw Data") {
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        console.error("Data must be an array of objects.");
        return;
    }

    // Show the loading spinner
    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.style.display = "block";

    // Create a promise to handle the export process
    const exportPromise = new Promise((resolve) => {
        // Proceed with the export process
        const columnsToRemove = ["feedback_id", "status", "updated_at", "language"]; // Replace with actual column names you want to remove

        // Extract headers from the first object's keys, excluding unwanted columns
        const headers = Object.keys(data[0]).filter(header => !columnsToRemove.includes(header));

        // Map headers to their corresponding values in the questions object
        const mappedHeaders = ["Serial No.", ...headers.map(header => questions[header] || header)];

        // Map data to an array of arrays format, including headers, and add serial numbers
        const aoaData = [
            mappedHeaders, // first row for mapped headers
            ...data.map((obj, index) => [
                index + 1, // Serial number
                ...headers.map(header => obj[header])
            ]) // subsequent rows for data
        ];

        // Create worksheet from aoaData
        const ws = XLSX.utils.aoa_to_sheet(aoaData);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");

        // Export the workbook to an Excel file
        XLSX.writeFile(wb, name + ".xlsx");

        // Resolve the promise after a short delay
        setTimeout(() => resolve(), 2000); // Adjust the delay as needed
    });

    // Handle the promise to hide the loading spinner
    exportPromise.then(() => {
        loadingSpinner.style.display = "none";
    }).catch((error) => {
        console.error("Error exporting data:", error);
        loadingSpinner.style.display = "none"; // Hide spinner even if there's an error
    });
}




// download div 
function downloadPDF() {
    // Get the div content
    // var printContents = document.querySelector('canvas').innerHTML;

    var graphDiv = document.getElementById('graphs');
    var printContents = graphDiv.innerHTML;

    // Create a new window
    var printWindow = window.open('', '', 'height=600,width=800');

    // Prepare the new window document
    printWindow.document.write('<html><head><title>Print Graph</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<div id="print-content">' + printContents + '</div>');
    printWindow.document.write('<script>document.getElementById("print-content").style.display="block";</script>');
    printWindow.document.write('</body></html>');

    // Close the document to trigger the browser to render the content
    printWindow.document.close();

    // Wait for the content to fully load before printing
    printWindow.onload = function () {
        printWindow.focus(); // Ensure the print window is in focus
        printWindow.print(); // Trigger the print dialog
    };
}

// Optionally, wait for the canvas to be fully drawn before printing
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    // Example drawing code, replace with your actual drawing logic
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(10, 10, 150, 100);
}