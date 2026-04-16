const events = [
    { name: "Music Fest", date: "April 20", location: "Hall A" },
    { name: "Tech Talk", date: "April 22", location: "Room B" },
    { name: "Sports Day", date: "April 25", location: "Field" }
];

function displayEvents(list) {
    const container = document.getElementById('events');
    container.innerHTML = '';

    list.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event';
        div.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date}</p>
            <p>${event.location}</p>
        `;
        container.appendChild(div);
    });
}

displayEvents(events);

// Search
document.getElementById('search').addEventListener('input', function (e) {
    const value = e.target.value.toLowerCase();
    const filtered = events.filter(ev => ev.name.toLowerCase().includes(value));
    displayEvents(filtered);
});