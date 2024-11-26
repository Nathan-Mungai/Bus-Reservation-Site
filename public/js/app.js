const rows = document.querySelectorAll('.row'); // Get all rows
let selectedSeat = null; // To store row and column of the selected seat

rows.forEach((row, rowIndex) => {
    const seats = row.querySelectorAll('.seat.available'); // Get all available seats in the row
    seats.forEach((seat, colIndex) => {
        seat.addEventListener('click', () => {
            // Clear previous selection
            document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
            // Mark clicked seat as selected
            seat.classList.add('selected');
            // Store selected seat's row and column indices
            selectedSeat = { rowIndex, colIndex };
        });
    });
});

document.getElementById('book-btn').addEventListener('click', async () => {
    if (!selectedSeat) {
        alert('Please select a seat!');
        return;
    }

    const busId = window.location.pathname.split('/').pop(); // Extract bus ID from URL

    try {
        const response = await fetch(`/reserve-seat/${busId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedSeat), // Send row and column indices
        });

        if (response.ok) {
            alert('Booking confirmed! Payment will be expected upon boarding.');
            window.location.href = '/';
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to reserve the seat. Please try again.');
        }
    } catch (error) {
        alert('Error booking seat: ' + error.message);
    }
});
