//< !--JavaScript to handle the logic-- >
// Get the radio buttons and the output div
const opdRadio = document.getElementById('opd_q6');
const ipdRadio = document.getElementById('ipd_q6');
const outputDiv = document.getElementById('output');

const opd = document.getElementById('opd');
const ipd = document.getElementById('ipd');



// Function to update the output based on the selected option
function updateOutput() {
    if (opdRadio.checked) {

        // document.getElementById('ipd_q6').disabled = true;
        document.getElementById('i').innerHTML = '';

        ipd.innerHTML = `   

            <div style="visibility: hidden;height: 1px; overflow: hidden;">

           <input type="radio" id="star1_q13" name="q13" value="1">
                                    <input type="text"  name="q14" value="N/A">
                                    <input type="text"  name="q15" value="N/A">
                                    <input type="text"  name="q16" value="N/A">
                                    <input type="text"  name="q17" value="N/A">
                                    <input type="text"  name="q18" value="N/A">
                                    <input type="text"  name="q19" value="N/A">
                                    <input type="text"  name="q20" value="N/A">
                                    <input type="text"  name="q21" value="N/A">
                                    <input type="text"  name="q22" value="N/A">
                                    <input type="text"  name="q23" value="N/A">
                                    <input type="text"  name="q24" value="N/A">
                                    <input type="text"  name="q25" value="N/A">
                                    <div>`;

    } else if (ipdRadio.checked) {
        // outputDiv.textContent = 'IPD';
        document.getElementById('opd_q6').disabled = true;
        document.getElementById('o').innerHTML = '';
        opd.innerHTML = `
                                        <div style="visibility: hidden;height: 1px; overflow: hidden;">
                                      
                                        <input type="text" name="q7" value="N/A">
                                        <input type="text" name="q8" value="N/A">
                                        <input type="text" name="q9" value="N/A">
                                        <input type="text" name="q10" value="N/A">
                                        <input type="text" name="q11" value="N/A">
                                        <input type="text" name="q12" value="N/A">
                                        <input type="text" name="q13" value="N/A">
                                 
                                        </div>
        `;

    }
}

// Add event listeners to both radio buttons
opdRadio.addEventListener('change', updateOutput);
ipdRadio.addEventListener('change', updateOutput);
