
const polyclinicQuestions = {
    'Q1': 'Waiting time at registration counter.',
    'Q2': 'Time taken for doctor’s consultation post registration.',
    'Q3': 'Time taken to obtain medicines from pharmacy post doctor’s consultation.',
    'Q4': 'Availability of medicines in the dispensary.',
    'Q5': 'Time taken to provide medicines not available in the dispensary.',
    'Q6': 'If all the medicines are not available in the dispensary, awareness about provision of medicines through Authorised Local Chemist (ALC) and convenience in receiving same.',
    'Q7': 'Time taken in settlement of medicine claims.',
    'Q8': 'Time taken to receive lab investigation reports of investigations carried out in the Polyclinic.',
    'Q9': 'Conduct/ Behaviour of doctors.',
    'Q10': 'Conduct/ Behaviour of ECHS Staff.',
    'Q11': 'Conduct/ Behaviour of OIC ECHS Polyclinic.',
    'Q12': 'Suggestions/ Complaint for ECHS Polyclinic. (max 200 words)',
    'Q13': 'Personal Particulars:-',
    'Q13_a':"ECHS Card Number:",
    'Q13_b':"Name as per ECHS card (optional)",
    'Q13_c':"Date of visit",
    'Q13_d':"Mobile number (optional)"
    
}

const polyclinicShortQuestions = {
   
    'Q1': "Waiting time at registration counter.",
    'Q2': "Doctor consultation time post-registration.",
    'Q3': "Pharmacy wait time post-consultation.",
    'Q4': "Medicine availability in dispensary.",
    'Q5': "Time for unavailable medicine provision.",
    'Q6': "ALC awareness and convenience.",
    'Q7': "Medicine claim settlement time.",
    'Q8': "Lab report receipt time.",
    'Q9': "Doctor's conduct/behavior.",
    'Q10': "ECHS staff conduct/behavior.",
    'Q11': "OIC ECHS conduct/behavior.",
    'Q12': "Polyclinic suggestions/complaints.",
    'Q13': "Personal particulars.",
    'Q13_a':"ECHS Card Number:",
    'Q13_b':"Name as per ECHS card ",
    'Q13_c':"Date of visit",
    'Q13_d':"Mobile number "



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
                    Object.keys(counts[key]),
                    polyclinicQuestions[key]
                );

            } else {
                createPieChart(
                    document.getElementById(key).getContext('2d'),
                    polyclinicQuestions[key],
                    [counts[key].yes, counts[key].no],
                    // ['rgba(54,162,235,0.2)', 'rgba(255,205,86,0.2)'],
                    ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)'],
                    ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],

                    polyclinicQuestions[key]
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
                ['rgba(255,99,132,1)', 'rgba(255,159,64,1)', 'rgba(255,205,86,1)', 'rgba(75,192,192,1)', 'rgba(54,162,235,1)'],
                ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],
                polyclinicQuestions[key]
            );
        }

    })

}

