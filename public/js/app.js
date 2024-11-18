const seats = document.querySelectorAll('.seat.available');
seats.forEach(seat => {
    seat.addEventListener('click', () => {
        seats.forEach(s => s.classList.remove('selected'));
        seat.classList.add('selected');
    });
});

document.getElementById('book-btn').addEventListener('click', () => {
    const selectedSeat = document.querySelector('.seat.selected');
    if (!selectedSeat) {
        alert('Please select a seat!');
        return;
    }
    alert('Booking confirmed! Payment will be expected upon boarding.');
    window.location.href = '/';
});
