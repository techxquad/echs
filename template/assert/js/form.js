let currentStep = 0;
const totalSteps = document.querySelectorAll(".step").length;
showStep(currentStep);

function showStep(step) {
    const steps = document.querySelectorAll(".step");
    steps.forEach((s, i) => {
        s.classList.toggle("active", i === step);
    });

    // Disable/Enable Previous button
    document.getElementById("prevBtn").disabled = step === 0;

    // Handle the last step
    document.getElementById("nextBtn").style.display = step === steps.length - 1 ? "none" : "inline-block";
    document.getElementById("submitBtn").style.display = step === steps.length - 1 ? "inline-block" : "none";

    // Update the progress bar
    updateProgressBar(step);
}

function changeStep(n) {
    const steps = document.querySelectorAll(".step");
    steps[currentStep].classList.remove("active");
    currentStep += n;

    if (currentStep >= steps.length) {
        // Form submission should be handled by the submit button, so we don't automatically submit
        return false;
    }

    showStep(currentStep);
}

function updateProgressBar(step) {
    const progressBar = document.getElementById("progressBar");
    const percentComplete = ((step + 1) / totalSteps) * 100;
    progressBar.style.width = percentComplete + "%";
    progressBar.textContent = Math.round(percentComplete) + "%";
}

// JavaScript for the Rating System
const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

// Function to update rating label and star colors for a specific question
function updateRating(questionId, ratingIndex) {
    const ratingInputs = document.querySelectorAll(`input[name="${questionId}"]`);
    const ratingLabel = document.getElementById(`${questionId}Label`);
    const labels = document.querySelectorAll(`label[for^="${questionId}_star"]`);

    // Update rating label
    ratingLabel.textContent = ratingLabels[ratingIndex];

    // Update star colors
    ratingInputs.forEach((input, index) => {
        if (index <= ratingIndex) {
            labels[index].style.color = "#FFD700"; // Fill stars up to the selected one
        } else {
            labels[index].style.color = "#ccc"; // Empty stars after the selected one
        }
    });
}

// Attach change event listeners to all rating inputs
document.querySelectorAll('input[name="q4"], input[name="q7"], input[name="q8"]').forEach(input => {
    input.addEventListener("change", (event) => {
        const questionId = event.target.name;
        const ratingIndex = Array.from(input.parentElement.children).indexOf(event.target);
        updateRating(questionId, ratingIndex);
    });
});
