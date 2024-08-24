
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
    'Q13_d': "Mobile number (optional)",
    'created_at': "Feedback Date"
    
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


    polyclinicData.forEach(hospital => {
        Object.keys(hospital).forEach(key => {

            if (key !== 'Q12' && key !== 'Q13_a' && key !== 'Q13_b' && key !== 'Q13_c' && key !== 'Q13_d' &&
                key !== 'Q9_suggestion' && key !== 'Q10_suggestion' && key !== 'Q11_suggestion' &&
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


}

function polyclinicGraph() {

    Object.keys(counts).forEach(key => {

        if (key === 'Q1' || key === 'Q2' || key === 'Q3' || key === "Q4" || key == "Q5" || key == "Q7" || key == "Q8") {
            createDonutChart(
                document.getElementById(key).getContext('2d'),
                polyclinicShortQuestions[key],
                Object.values(counts[key]),
                // ['rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
                ['#2196f3', '#ffa000', '#00c853', '#ff0000', ' #ff4081'],
                ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],
                Object.keys(counts[key]),
                polyclinicShortQuestions[key]
            );

        }
        else {
            // if 1,2,3,4,5 not in object then add key with 0 value 
            let a = counts[key];

            const requiredKeys = ['1', '2', '3', '4', '5'];

            // Ensure each required key exists in the object with a value of 0 if it's missing
            requiredKeys.forEach(key => {
                if (!(key in a)) {
                    a[key] = 0;
                }
            });
            createLineChart(
                document.getElementById(key).getContext('2d'),
                polyclinicShortQuestions[key],
                Object.keys(counts[key]),
                counts[key],
                // ['rgba(255,99,132,0.2)', 'rgba(255,159,64,0.2)', 'rgba(255,205,86,0.2)', 'rgba(75,192,192,0.2)', 'rgba(54,162,235,0.2)'],
                ['#ff0000', ' #ff4081', '#ffa000', '#2196f3', '#00c853'],
                ['#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3', '#f0f1f3'],
                polyclinicShortQuestions[key]
            );
        }

    })

}

