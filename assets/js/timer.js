// Initialize countdown target
const eventDate = new Date();
eventDate.setDate(eventDate.getDate() + 24);
eventDate.setHours(eventDate.getHours() + 8);
eventDate.setMinutes(eventDate.getMinutes() + 42);
eventDate.setSeconds(eventDate.getSeconds() + 15);

function updateTimer() {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;

    if (distance < 0) {
        return; // Timer reached zero
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("timer-days");
    const elHours = document.getElementById("timer-hours");
    const elMinutes = document.getElementById("timer-minutes");
    const elSeconds = document.getElementById("timer-seconds");

    if (elDays) elDays.innerText = days.toString().padStart(2, '0');
    if (elHours) elHours.innerText = hours.toString().padStart(2, '0');
    if (elMinutes) elMinutes.innerText = minutes.toString().padStart(2, '0');
    if (elSeconds) elSeconds.innerText = seconds.toString().padStart(2, '0');
}

// Update the timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call to avoid 1s delay
