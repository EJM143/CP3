// Function to submit appointment data to the backend
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

// Function to display appointments on the frontend
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

// Handle errors
function handleError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Populate the list when the page loads
window.onload = function() {
    displayAppointments(); 
};

