import { get, update } from "./requests.js"


export function render() {
    return `
        <div class="row row__container">
            <div class="col-2 col-md-2 col-lg-2 aside bg-primary">
                <h1 class="fw-bold text-center mt-5">Events</h1>
                <div class="userData">
                    <h4 class="fw-bold mt-5 text-center" id="user__name"></h4>
                    <p class="fs-5 text-center">Admin</p>
                </div>

                <div class="d-flex flex-column gap-4 dashboard__pages">
                    <a class="btn fw-bold" href="#/adminDashboard" role="button">Events</a>
                    <a class="btn fw-bold" href="#/" role="button" id="logout">Logout</a>
                </div>

            </div>


            <div class="col-10 col-md-10 col-lg-10 d-flex flex-column justify-content-center">

                <h1 class="text-center">Create Event</h1>
                <form id='updateEvent'>
                    <div class="mb-3">
                        <label for="name" class="form-label">Event Name</label>
                        <input type="text" class="form-control" id="name" name="name">
                    </div>
                    <div class="mb-3">
                        <label for="location" class="form-label">Event Location</label>
                        <input type="text" class="form-control" id="location" name="location">
                    </div>
                    <div class="mb-3">
                        <label for="date" class="form-label">Event date</label>
                        <input type="date" class="form-control" id="date" name="date">
                    </div>
                    <div class="mb-3">
                        <label for="capacity" class="form-label">Capacity</label>
                        <input type="number" class="form-control" id="capacity" name="capacity">
                    </div>
                    <div class="mb-3">
                        <label for="img" class="form-label">Event Image Link</label>
                        <input type="text" class="form-control" id="img" name="img">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Event Description</label>
                        <textarea class="form-control" id="description" rows="8" placeholder="Event description here..."
                            name="description"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>


            </div>

        </div>
    `
}
/**
* Function that adds validations to the form, loads the event on the form, and updates its information if necessary.
*/
export async function afterRender() {
    const userString = localStorage.getItem('session');
    const user = JSON.parse(userString);
    document.getElementById('user__name').innerHTML = user.name;

    const events = await get('events');
    const eventId = sessionStorage.getItem('eventId')

    const event = events.find(event => event.id === eventId);
    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    const logout = document.getElementById('logout');
    logout.addEventListener('click', (e) => {
        localStorage.removeItem('session');
        localStorage.removeItem('logged');
    })

    document.getElementById('name').value = event.name;
    document.getElementById('location').value = event.location;
    document.getElementById('capacity').value = event.capacity;
    document.getElementById('img').value = event.img;
    document.getElementById('description').value = event.description;

    const updateEvent = document.getElementById('updateEvent');
    updateEvent.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(updateEvent);

        let data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        if (!data.name.trim() || !data.location.trim() || !data.date.trim() || !data.capacity.trim() || !data.img.trim() || !data.description.trim()) {
            alert("There are empty fields");
            return;
        }

        if (isNaN(data.capacity) || data.capacity <= 0) {
            alert("The capacity must be a number greater than 0.");
            return;
        }

        update(data, 'events', eventId);
        window.location.href = '#/adminDashboard';
    })
}