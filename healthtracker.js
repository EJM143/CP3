/** 
 *   Name: Edale Miguel 
 *   Date: November 13, 2024
 * 
 *   This code allows users to submit and view appointments through the frontend. The submitAppointment 
 *   function sends appointment data to the backend, while displayAppointments fetches and displays the 
 *   saved appointments on the page. If any errors occur, the handleError function displays a user-friendly error message.
 * */



/**
 * Submit appointment data to the backend.
 * Sends the appointment details (date, time, description) to the server and adds it to the appointments list.
 * If successful, the list is refreshed to show the latest appointment.
 */
function submitAppointment() {
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;
    const description = document.getElementById("appointment-description").value;
    
    const newAppointment = { date, time, description };

    fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAppointment)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Appointment saved:', data);
        alert('Appointment saved!');
        displayAppointments();  
    })
    .catch(error => {
        console.error('Error:', error);
        handleError('Error saving appointment. Please try again later.');
    });
}

/**
 * Fetch and display the list of appointments.
 * Retrieves all saved appointments from the server and shows them in a list on the page.
 */
function displayAppointments() {
    fetch('http://localhost:3000/appointments')
        .then(response => response.json())
        .then(data => {
            const appointmentsList = document.getElementById('appointments-list');
            appointmentsList.innerHTML = ''; 

            data.forEach(appointment => {
                const listItem = document.createElement('li');
                listItem.textContent = `${appointment.date} - ${appointment.time} - ${appointment.description}`;
                appointmentsList.appendChild(listItem);
            });
        })
        .catch(error => {
            handleError('Error fetching appointments. Please try again later.');
        });
}

/**
 * Handle errors by displaying a message to the user.
 * Shows the error message in a designated section of the page.
 * 
 * @param {string} message - The error message to be displayed.
 */
function handleError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

/**
 * Populate the list of appointments when the page loads.
 * Calls the displayAppointments function to show any existing appointments.
 */
window.onload = function() {
    displayAppointments(); 
};

