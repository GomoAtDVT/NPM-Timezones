const modalBtn = document.querySelector("#modal-btn");
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("#form");
const timeElement = document.querySelector(".time");
const displayedDate = document.querySelector(".date");
const timezones = document.querySelector("#timezone");
const timezoneName = document.querySelector(".timezone-name");

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

let selectedTimezone = "Africa/Johannesburg"; // Default timezone

// Function to open modal
function displayTheModal() {
    modalBtn.showModal();
}

// Function to close modal
function closeModal() {
    modalBtn.close();
}

// Prevent closing modal when clicking inside form
form.addEventListener("click", function (e) {
    e.stopPropagation();
});

// Close modal when clicking outside the form
wrapper.addEventListener("click", function () {
    closeModal();
});

// Populate the timezone dropdown from API
function populateTimezones() {
    const allTimezones = ct.getAllTimezones(); // Get all timezones

    Object.keys(allTimezones).forEach((tz) => {
        let option = document.createElement("option");
        option.value = tz;
        option.textContent = tz;
        timezones.appendChild(option);
    });

    // Set default selection
    timezones.value = selectedTimezone;
}

// Function to change timezone
function changeTimezone(event) {
    event.preventDefault(); // Prevent form submission refresh

    selectedTimezone = timezones.value; // Get selected timezone
    timezoneName.textContent = selectedTimezone; // Update displayed timezone

    updateTime(); // Immediately update time for selected timezone
    closeModal(); // Close modal after selection
}

// Function to update time based on selected timezone
function updateTime() {
    const now = dayjs().tz(selectedTimezone); // Get current time in selected timezone
    timeElement.innerHTML = now.format("h:mm:ss A"); // Format with AM/PM
    displayedDate.innerHTML = now.format("dddd, D MMMM YYYY"); // Format date
}

// Update time every second in the selected timezone
setInterval(updateTime, 1000);

// Load timezones on page load
populateTimezones();

// Add event listener for changing timezone
document.querySelector("#submit").addEventListener("click", changeTimezone);

// Initialize time display
updateTime();
