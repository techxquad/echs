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

const questions = {
    'Q1': 'I am q1',
    'Q2': 'I am q2',
    'Q3': 'I am q3',
    'Q4': 'I am q4',
    'Q5': 'I am q5',
    'Q6': 'I am q6',
    'Q7': 'I am q7',
    'Q8': 'I am q8',
    'Q9': 'I am q9',
    'Q10': 'I am q10',
    'Q11': 'I am q11',
    'Q12': 'I am q12',
    'Q13': 'I am q13',
    'Q14': 'I am q14',
    'Q15': 'I am q15',
    'Q16': 'I am q16',
    'Q17': 'I am q17',
    'Q18': 'I am q18',
    'Q19': 'I am q19',
    'Q20': 'I am q20',
    'Q21': 'I am q21',
    'Q22': 'I am q22',
    'Q23': 'I am q23',
    'Q24': 'I am q24',
    'Q25': 'I am q25',
    'Q26': 'I am q26',
    'Q27': 'I am q27',
    'Q28': 'I am q28'
}


function createDiv() {
    let graphDiv = ''
    for (const key in questions) {
        if (counts.hasOwnProperty(key)) {
            graphDiv += '<div class="col-md-4"> <canvas class="" id="' + key + '" width="400" height="400"></canvas> </div>'
        }
    }
    document.getElementById('graphs').innerHTML = graphDiv;
    // console.log(graphDiv);
}

// Function to create a Line chart
function createLineChart(ctx, label, data, backgroundColor, borderColor) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 4,
                fill: false,
                tension: 0.1, // controls the curve of the line
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
function createDonutChart(ctx, label, data, backgroundColor, borderColor, labels) {
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
        }
    });
}

// Function to create a pie chart
function createPieChart(ctx, label, data, backgroundColor, borderColor) {
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
        }
    });
}

function getData() {
    hospitalArray.forEach(hospital => {
        Object.keys(hospital).forEach(key => {

            if (key !== 'Q24' && key !== 'Q26' && key !== 'Q12' && key !== 'Q1' && key !== 'Q10' && key !== 'Q28_a' && key !== 'Q28_b' && key !== 'Q28_c' && key !== 'Q28_d' && key !== 'created_at' && key !== 'feedback_id' && key !== 'language' && key !== 'status' && key !== 'updated_at') {  // Skip 'ID' and 'Color' fields

            // if (!counts[key]) {
            //     counts[key] = key === "Q2" || key == "Q9" || key == "Q14" || key == "Q23" || key == "Q25" ? { yes: 0, no: 0 } : [0, 0, 0, 0, 0];
            // }
                if (!counts[key]) {
                    if (key === "Q3" || key === "Q5" || key === "Q6" || key === "Q2" || key === "Q9" || key === "Q14" || key === "Q23" || key === "Q25") {
                        if (key === "Q3")
                            counts[key] = { Upto_15_mins: 0, s: 1 };
                        if (key === "Q5")
                            counts[key] = { ipd: 0, opd: 0 };
                        if (key === "Q6")
                            counts[key] = { ipd: 0, opd: 0 };
                        else
                            counts[key] = { yes: 0, no: 0 };

                    } else {
                        counts[key] = [0, 0, 0, 0, 0];
                    }
                }


                if (key === "Q3" || key === "Q5" || key === "Q6" || key === "Q2" || key == "Q9" || key == "Q14" || key == "Q23" || key == "Q25") {
                    counts[key][hospital[key]]++;
                } else {
                    counts[key][hospital[key] - 1]++;
                }
            }
        });
    });
    createDiv();
    graph();

    // change button visiablity
    exportdata = document.getElementById("export");
    downloaddata = document.getElementById("download");
    exportdata.style.display = "block";
    downloaddata.style.display = "block";

    var canvases = document.querySelectorAll("canvas");
    canvases.forEach(function (canvas) {
        canvas.classList.add("bg-white", "shadow", "m-2", "p-2");
    });


}

function graph() {

    Object.keys(counts).forEach(key => {

        // create div for graph 



        if (counts[key].length == 5) {

            createLineChart(
                document.getElementById(key).getContext('2d'),
                questions[key],
                counts[key],
                // ['rgba(255,99,132,0.2)', 'rgba(255,159,64,0.2)', 'rgba(255,205,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(54,162,235,0.2)'],
                ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)']
            );
            // createBarChart(
            //     document.getElementById(key).getContext('2d'),
            //    questions[key],
            //     counts[key],
            //     // ['rgba(153,102,255,0.2)', 'rgba(201,203,207,0.2)', 'rgba(255,99,132,0.2)', 'rgba(255,205,86,0.2)', 'rgba(54,162,235,0.2)'],
            //     ['rgba(153,102,255,1)', 'rgba(201,203,207,1)', 'rgba(255,99,132,1)', 'rgba(255,205,86,1)', 'rgba(54,162,235,1)']
            // );
            // console.log('bar');
        } else {
            // opd 
            if (key === 'Q6') {
                createDonutChart(
                    document.getElementById(key).getContext('2d'),
                    questions[key],
                    [counts[key].ipd, counts[key].opd],
                    // ['rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
                    ['rgba(255,159,64,1)', 'rgba(153,102,255,1)'],
                    ['#f0f1f3', '#f0f1f3'],
                    ['Ipd', 'Opd']
                );
            } else {
                createPieChart(
                    document.getElementById(key).getContext('2d'),
                    questions[key],
                    [counts[key].yes, counts[key].no],
                    // ['rgba(54,162,235,0.2)', 'rgba(255,205,86,0.2)'],
                    ['rgba(54,162,235,1)', 'rgba(255,205,86,1)']
                );
            }
            // console.log("pie")
        }
    })

}


// export data to excle
function exportData(data) {
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        console.error("Data must be an array of objects.");
        return;
    }

    // Extract headers from the first object's keys
    const headers = Object.keys(data[0]);

    // Map data to an array of arrays format, including headers
    const aoaData = [
        headers, // first row for headers
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