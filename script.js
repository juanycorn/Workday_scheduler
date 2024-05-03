$(function () {
    // Add a listener for click events on the save button
    $('.saveBtn').click(function () {
        // Get the hour from the parent time-block's id
        let hour = $(this).parent().attr('id').split('-')[1];
        // Get the user input from the textarea
        let description = $(this).siblings('.description').val();
        // Save the user input in local storage with the hour as key
        localStorage.setItem(hour, description);
        // Notify the user that the event has been saved
        alert('Event saved!');
    });

    // Add code to apply the past, present, or future class to each time block
    function updateTimeBlocks() {
        let currentHour = dayjs().hour();
        $('.time-block').each(function () {
            let hour = parseInt($(this).attr('id').split('-')[1]);
            if (hour < currentHour) {
                $(this).removeClass('present future').addClass('past');
            } else if (hour === currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }
    // Call updateTimeBlocks initially to apply the classes
    updateTimeBlocks();

    // Add code to get any user input that was saved in localStorage
    function loadEvents() {
        $('.time-block').each(function () {
            let hour = $(this).attr('id').split('-')[1];
            let savedEvent = localStorage.getItem(hour);
            if (savedEvent) {
                $(this).find('.description').val(savedEvent);
            }
        });
    }
    // Call loadEvents initially to populate the textareas
    loadEvents();

    // Display the current date in the header of the page
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});
