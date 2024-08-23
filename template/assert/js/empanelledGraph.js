
const empanelledQuestions = {
    'Q1': 'Select hospital where medical facility has been availed (select from drop down menu).',
    'Q2': 'Is there Online/ Tele appointment facility available in the hospital?',
    'Q3': 'Waiting time at the registration counter.',
    'Q4': 'Conduct/ Behaviour of hospital staff at registration/ admission counter.',
    'Q5': 'Time taken for Doctor’s consultation after registration.',
    'Q6': 'Select OPD/ IPD options for feedback.',
    'Q7': 'Conduct/ Behaviour of Doctors and Nursing staff.',
    'Q8': 'Availability of all investigation facilities in the hospital.',
    'Q9': 'Whether complete treatment was cashless? ',
    'Q10': 'Details of payments made during treatment (max 200 words)',
    'Q11': 'Your satisfaction as a patient during entire treatment.',
    'Q12': 'Suggestions/ Complaint, if any (max 200 words).',
    'Q13': 'Convenience in hospital admission process.',
    'Q14': 'Availability/ allotment of correct ward/ room as per entitlement.',
    'Q15': 'Timely patient care by Doctors and Nurses.',
    'Q16': 'Conduct/ Behaviour of Doctors and Nurses.',
    'Q17': 'Availability of all testing/ investigation facilities within the hospital.',
    'Q18': 'Timely provision and quality of food.',
    'Q19': 'Hygiene and cleanliness of entitled room/ ward and toilets.',
    'Q20': 'Cleanliness and regular change of bedding and linen.',
    'Q21': 'Availability of medicines in hospital dispensary.',
    'Q22': 'Ease of discharge process post treatment.',
    'Q23': 'Whether complete treatment was cashless?',
    'Q24': 'Details of payments made during treatment, if any (max 200 words).',
    'Q25': 'Provision of ambulance facility by hospital on being referred by Polyclinic or during emergency or on discharge from hospital.',
    'Q26': 'Suggestions/ Complaint, if any (max 200 words).',
    'Q27': 'Your satisfaction as a patient during entire treatment.',
    'Q28': 'Personal Particulars:-',
    'Q28_a': 'ECHS Card Number',
    'Q28_b': 'Name as per ECHS card',
    'Q28_c': 'Date of visit',
    'Q28_d': 'Mobile number'
}


const empanelledShortQuestions = {
    'Q1': "Select hospital from dropdown.",
    'Q2': "Online/Tele appointment availability?",
    'Q3': "Registration counter waiting time.",
    'Q4': "Hospital staff conduct/behavior.",
    'Q5': "Doctor consultation time post-registration.",
    'Q6': "Select OPD/IPD for feedback.",
    'Q7': "Doctors and nurses' behavior.",
    'Q8': "Investigation facilities availability.",
    'Q9': "Was treatment completely cashless?",
    'Q10': "Payments made during treatment.",
    'Q11': "Satisfaction during entire treatment.",
    'Q12': "Suggestions/complaints (max 200 words).",
    'Q13': "Hospital admission process convenience.",
    'Q14': "Correct ward/room allotment.",
    'Q15': "Timely care by doctors/nurses.",
    'Q16': "Doctors and nurses' behavior.",
    'Q17': "Testing facilities within hospital.",
    'Q18': "Timely provision and food quality.",
    'Q19': "Room/ward and toilet cleanliness.",
    'Q20': "Bedding and linen cleanliness.",
    'Q21': "Medicine availability in dispensary.",
    'Q22': "Ease of discharge process.",
    'Q23': "Was treatment completely cashless?",
    'Q24': "Payments made during treatment.",
    'Q25': "Hospital ambulance facility provision.",
    'Q26': "Suggestions/complaints (max 200 words).",
    'Q27': "Satisfaction during entire treatment.",
    'Q28': "Personal particulars.",
    'Q28_a': "ECHS card number.",
    'Q28_b': "Name as per ECHS card.",
    'Q28_c': "Date of visit.",
    'Q28_d': "Mobile number."
};


// empanelledData
// empanelledQuestions 
// empanelledGetData()

function empanelledGetData() {


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


    createDiv(empanelledQuestions);
    empanelledGraph();

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

function empanelledGraph() {

    Object.keys(counts).forEach(key => {

        if (key === 'Q3' || key === 'Q5' || key === 'Q6' || key === "Q2" || key == "Q9" || key == "Q14" || key == "Q23" || key == "Q25") {
            if (key === 'Q3' || key === 'Q5' || key === 'Q6') {
                createDonutChart(
                    document.getElementById(key).getContext('2d'),
                    empanelledShortQuestions[key],
                    Object.values(counts[key]),
                    // ['rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
                    ['#2196f3',
                        '#ffa000',
                        '#00c853',
                        '#ff0000', ' #ff4081'],
                    ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],
                    Object.keys(counts[key]),
                    empanelledShortQuestions[key]
                );

            } else {
                createPieChart(
                    document.getElementById(key).getContext('2d'),
                    empanelledShortQuestions[key],
                    [counts[key].yes, counts[key].no],
                    // ['rgba(54,162,235,0.2)', 'rgba(255,205,86,0.2)'],
                    ['#00c853', '#ff0000'],
                    ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],

                    empanelledShortQuestions[key]);
            }

        }
        else {
            let a = counts[key];

            const requiredKeys = ['1', '2', '3', '4', '5'];

            // Ensure each required key exists in the object with a value of 0 if it's missing
            requiredKeys.forEach(key => {
                if (!(key in a)) {
                    a[key] = 0;
                }
            });

            console.log(a);

            createLineChart(
                document.getElementById(key).getContext('2d'),
                empanelledShortQuestions[key],
                Object.keys(counts[key]),
                counts[key],
                // ['rgba(255,99,132,0.2)', 'rgba(255,159,64,0.2)', 'rgba(255,205,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(54,162,235,0.2)'],
                ['#ff0000', ' #ff4081',
                    '#ffa000', '#2196f3'
                    ,
                    '#00c853'],
                ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],
                empanelledShortQuestions[key]);
        }

    })

}

