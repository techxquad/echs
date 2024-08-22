
const polyclinicQuestions = {
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



function polyclinicGetData() {


    empanelledData.forEach(hospital => {
        Object.keys(hospital).forEach(key => {

            if (key !== 'Q24' && key !== 'Q26' && key !== 'Q12' && key !== 'Q1' && key !== 'Q10' &&
                key !== 'Q28_a' && key !== 'Q28_b' && key !== 'Q28_c' && key !== 'Q28_d' &&
                key !== 'created_at' && key !== 'feedback_id' && key !== 'language' &&
                key !== 'status' && key !== 'updated_at') {

                if (!counts[key]) {
                    counts[key] = {};
                }

                // Initialize the count if not already done
                if (!counts[key][hospital[key]]) {
                    counts[key][hospital[key]] = 0;
                }

                // Increment the count for the specific value
                counts[key][hospital[key]]++;

                // If the key is related to time (you need to specify which keys those are)
                if (key === 'timeKey1' || key === 'timeKey2') {  // Replace with actual keys representing time
                    if (!counts['time']) {
                        counts['time'] = 0;
                    }
                    counts['time']++;
                }
            }
        });
    });


    createDiv(polyclinicQuestions);
    polyclinicGraph();

    // change button visiablity
    exportdata = document.getElementById("export");
    downloaddata = document.getElementById("download");
    exportdata.style.display = "block";
    downloaddata.style.display = "block";

    // var canvases = document.querySelectorAll("canvas");
    // canvases.forEach(function (canvas) {
    //     canvas.classList.add("bg-white", "shadow", "m-2", "p-2");
    // });


}

function polyclinicGraph() {

    Object.keys(counts).forEach(key => {

        if (key === 'Q3' || key === 'Q5' || key === 'Q6' || key === "Q2" || key == "Q9" || key == "Q14" || key == "Q23" || key == "Q25") {
            if (key === 'Q3' || key === 'Q5' || key === 'Q6') {
                createDonutChart(
                    document.getElementById(key).getContext('2d'),
                    polyclinicQuestions[key],
                    Object.values(counts[key]),
                    // ['rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
                    ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)'],
                    ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],
                    Object.keys(counts[key])
                );

            } else {
                createPieChart(
                    document.getElementById(key).getContext('2d'),
                    polyclinicQuestions[key],
                    [counts[key].yes, counts[key].no],
                    // ['rgba(54,162,235,0.2)', 'rgba(255,205,86,0.2)'],
                    ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)'],
                );
            }

        }
        else {
            createLineChart(
                document.getElementById(key).getContext('2d'),
                polyclinicQuestions[key],
                Object.keys(counts[key]),
                counts[key],
                // ['rgba(255,99,132,0.2)', 'rgba(255,159,64,0.2)', 'rgba(255,205,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(54,162,235,0.2)'],
                ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)']
            );
        }

    })

}

