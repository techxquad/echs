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



const hospitalArray = [
    { ID: 1, Color: "Red", Health: 4, Medicine: 1, Cleaning: 4, paisa: "yes" },
    { ID: 2, Color: "Blue", Health: 3, Medicine: 3, Cleaning: 5, paisa: "yes" },
    { ID: 3, Color: "Green", Health: 1, Medicine: 3, Cleaning: 5, paisa: "yes" },
    { ID: 4, Color: "Yellow", Health: 4, Medicine: 1, Cleaning: 3, paisa: "no" },
    { ID: 5, Color: "Purple", Health: 5, Medicine: 4, Cleaning: 5, paisa: "yes" },
    { ID: 6, Color: "Orange", Health: 4, Medicine: 1, Cleaning: 3, paisa: "no" },
    { ID: 7, Color: "Pink", Health: 1, Medicine: 5, Cleaning: 4, paisa: "yes" },
    { ID: 8, Color: "Brown", Health: 3, Medicine: 5, Cleaning: 1, paisa: "no" }
];

const counts = {};

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
function createDonutChart(ctx, label, data, backgroundColor, borderColor) {
    new Chart(ctx, {
        type: 'doughnut',
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
            if (key !== 'ID' && key !== 'Color') {  // Skip 'ID' and 'Color' fields
                if (!counts[key]) {
                    counts[key] = key === "paisa" ? { yes: 0, no: 0 } : [0, 0, 0, 0, 0];
                }
                if (key === "paisa") {
                    counts[key][hospital[key]]++;
                } else {
                    counts[key][hospital[key] - 1]++;
                }
            }
        });
    });
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
    // Bar Charts for Health, Medicine, and Cleaning with different colors
    createLineChart(
        document.getElementById('healthChart').getContext('2d'),
        'Health',
        counts.Health,
        // ['rgba(255,99,132,0.2)', 'rgba(255,159,64,0.2)', 'rgba(255,205,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(54,162,235,0.2)'],
        ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)']
    );

    createBarChart(
        document.getElementById('medicineChart').getContext('2d'),
        'Medicine',
        counts.Medicine,
        // ['rgba(153,102,255,0.2)', 'rgba(201,203,207,0.2)', 'rgba(255,99,132,0.2)', 'rgba(255,205,86,0.2)', 'rgba(54,162,235,0.2)'],
        ['rgba(153,102,255,1)', 'rgba(201,203,207,1)', 'rgba(255,99,132,1)', 'rgba(255,205,86,1)', 'rgba(54,162,235,1)']
    );

    createBarChart(
        document.getElementById('cleaningChart').getContext('2d'),
        'Cleaning',
        counts.Cleaning,
        ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)', 'rgba(201,203,207,0.2)', 'rgba(54,162,235,0.2)'],
        ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)', 'rgba(201,203,207,1)', 'rgba(54,162,235,1)']
    );

    // Donut Chart for Paisa
    createDonutChart(
        document.getElementById('donutChart').getContext('2d'),
        'Paisa',
        [counts.paisa.yes, counts.paisa.no],
        // ['rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
        ['rgba(255,159,64,1)', 'rgba(153,102,255,1)']
    );

    // Pie Chart for Paisa
    createPieChart(
        document.getElementById('pieChart').getContext('2d'),
        'Paisa',
        [counts.paisa.yes, counts.paisa.no],
        // ['rgba(54,162,235,0.2)', 'rgba(255,205,86,0.2)'],
        ['rgba(54,162,235,1)', 'rgba(255,205,86,1)']
    );
}