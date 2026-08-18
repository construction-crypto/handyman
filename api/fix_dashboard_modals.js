window.OpenQuickBidModel = function() {
    const modal = document.getElementById('quick-bid-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.warn('Quick bid modal element not found in DOM.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const submitButtonElement = document.getElementById('appointment-submit-btn');
    if (submitButtonElement) {
        submitButtonElement.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Appointment request confirmed.');
        });
    }
});
