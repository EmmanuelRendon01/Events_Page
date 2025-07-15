import { get, remove } from "./requests.js";
let rowId;
/**
* This function loads the page content.
*/
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


            <div class="col-10 col-md-10 col-lg-10">

                <nav class="navbar navbar-expand-lg border border-color-secondary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Riwi</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="btn btn-primary fw-bold justify-content-end" href="#/createEvent" role="button">Create Event</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <h3 class="fw-bold mt-5">Event List</h3>
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Img</th>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody id="tableContent">
                    </tbody>
                </table>

            </div>

        </div>

    `
}
/**
* This function provides logic for the page by adding content and handling certain events
*/
export async function afterRender() {
    const userString = localStorage.getItem('session');
    const user = JSON.parse(userString);

    document.getElementById('user__name').innerHTML = user.name;
    const tableContentUpdate = document.getElementById('tableContent');
    const tableContentDelete = document.getElementById('tableContent');
    const data = await get('events');
    renderTable();

    const logout = document.getElementById('logout');
    logout.addEventListener('click', (e) => {
        localStorage.removeItem('session');
        localStorage.removeItem('logged');
    })

    /**
    * This event saves the event id to session storage when you select a row
    */

    document.addEventListener('click', (e) => {
        const row = e.target.closest('.eventRow');
        if (row) {
            rowId = row.dataset.id;
            const eventId = data.find(event => event.id === rowId);

            if (eventId) {
                sessionStorage.setItem('eventId', rowId);
            }
        }

    })

    /**
    * This event is the one that redirects the page that has the logic to update an event
    */

    tableContentUpdate.querySelectorAll(".updateEvent").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = '#/updateEvent'
        });
    });

    /**
    * This event is the one that redirects the page that has the logic to delete an event
    */  

    tableContentDelete.querySelectorAll(".deleteEvent").forEach(button => {
        button.addEventListener("click", (event) => {
            window.location.href = "#/adminDashboardHelper"

        });
    });


    /**
    * This function renders the contents of the table
    */


    function renderTable() {
        tableContent.innerHTML = '';
        data.forEach(event => {
            tableContent.innerHTML += `
                    <tr class="eventRow" data-id="${event.id}">
                        <td><img src="" alt=""></td>
                        <td>${event.name}</td>
                        <td>${event.location}</td>
                        <td>${event.date}</td>
                        <td>${event.attendees.length}/${event.capacity}</td>
                        <td><button class="btn deleteEvent"><i class="bi bi-trash3"></i></button></td>
                        <td><button class="btn updateEvent"><i class="bi bi-pencil"></i></button></td>
                    </tr>
            `
        });
    }
}