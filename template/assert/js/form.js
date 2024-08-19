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

    // Disable Next button initially if there are required fields in the current step
    checkRequiredFields();

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

function checkRequiredFields() {
    const currentStepElement = document.querySelectorAll(".step")[currentStep];
    const requiredFields = currentStepElement.querySelectorAll("input[required], select[required], textarea[required]");
    const nextBtn = document.getElementById("nextBtn");

    let allFilled = true;
    requiredFields.forEach((field) => {
        if (!field.value || (field.type === "radio" && !currentStepElement.querySelector(`input[name="${field.name}"]:checked`))) {
            allFilled = false;
        }
    });

    // Enable or disable the "Next" button based on field validation
    nextBtn.disabled = !allFilled;
}

// Attach input event listeners to all required fields to check if the "Next" button should be enabled
document.querySelectorAll("input[required], select[required], textarea[required]").forEach(field => {
    field.addEventListener("input", checkRequiredFields);
    if (field.type === "radio") {
        field.addEventListener("change", checkRequiredFields);  // Radio buttons need change events to be handled
    }
});



const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

// Function to update the rating label and star colors for a specific question
function updateRating(questionId, ratingIndex) {
    const ratingLabel = document.getElementById(`ratingLabel_${questionId}`);
    const labels = document.querySelectorAll(`label[for^="star"][for$="_${questionId}"]`);

    // Update rating label
    if (ratingLabel && ratingIndex >= 0 && ratingIndex < ratingLabels.length) {
        ratingLabel.textContent = ratingLabels[ratingIndex];
    }

    // Update star colors
    labels.forEach((label, index) => {
        if (index <= ratingIndex) {
            label.style.color = "#FFD700"; // Filled star color
        } else {
            label.style.color = "#ccc"; // Empty star color
        }
    });
}

// Attach change event listeners to all radio inputs
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener("change", (event) => {
        const questionId = event.target.name; // Gets "q4"
        const ratingIndex = parseInt(event.target.value) - 1; // Convert rating value to 0-based index
        updateRating(questionId, ratingIndex); // Update the rating label and stars
    });
});