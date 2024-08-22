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
            labels: x_label,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                // borderColor: borderColor,
                borderWidth: 4,
                fill: false,
                tension: 0.1, // controls the curve of the line
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 18 // You can adjust the size as needed
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }

            }
        }

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
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                data: data
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 18 // You can adjust the size as needed
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
                borderWidth: 1,
                data: data
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: chartTitle,
                    font: {
                        size: 18 // You can adjust the size as needed
                    }
                }
            }
        }
    });
}



// export data to excle
function exportData(data, questions) {
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        console.error("Data must be an array of objects.");
        return;
    }

    // Extract headers from the first object's keys
    const headers = Object.keys(data[0]);

    // Map headers to their corresponding values in the questions object
    const mappedHeaders = headers.map(header => questions[header] || header);

    // Map data to an array of arrays format, including headers
    const aoaData = [
        mappedHeaders, // first row for mapped headers
        ...data.map(obj => headers.map(header => obj[header])) // subsequent rows for data
    ];

    // Create worksheet from aoaData
    const ws = XLSX.utils.aoa_to_sheet(aoaData);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "chart_data.xlsx");
}


// download div 
function downloadPDF() {
// var divContents = document.getElementById("downloadDiv").innerHTML;
// var originalContents = document.body.innerHTML;

// document.body.innerHTML = divContents;

// window.print();

// document.body.innerHTML = originalContents;
}