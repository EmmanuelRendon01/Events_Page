import { get } from "./requests.js";


export function render() {
    return `
        <div class="row row__container">
            <div class="col-2 col-md-2 col-lg-2 aside bg-primary">
                <h1 class="fw-bold text-center mt-5">Events</h1>
                <div class="userData">
                    <h2 class="fw-bold mt-5 text-center" id="user__name"></h2>
                    <p class="fs-5 text-center">User</p>
                </div>

                <div class="d-flex flex-column gap-4 dashboard__pages">
                    <a class="btn fw-bold" href="#/enrollments" role="button">Enrollments</a>
                    <a class="btn fw-bold" href="#/userDashboard" role="button">Events</a>
                    <a class="btn fw-bold" href="#/" role="button" id="logout">Logout</a>
                </div>

            </div>


            <div class="col-10 col-md-10 col-lg-10">

                <h3 class="fw-bold mt-5">Event List</h3>
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Img</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Location</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">Date</th>
                            <th scope="col">Enroll</th>


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
* Function that adds content to the user page
*/
export async function afterRender() {

    const userString = localStorage.getItem('session');
    const user = JSON.parse(userString);

    const usersData = await get('users');
    const userObtained = usersData.find(u => u.email === user.email);

    user['id'] = userObtained.id;

    const logout = document.getElementById('logout');
    logout.addEventListener('click', (e) => {
        localStorage.removeItem('session');
        localStorage.removeItem('logged');
    })

    localStorage.setItem('session', JSON.stringify(user));

    document.getElementById('user__name').innerHTML = user.name;
    const tableContent = document.getElementById('tableContent');
    const data = await get('events');
    renderTable();

    /**
    * If you want to register for an event, this page redirects to the page that handles the process.
    */

    tableContent.querySelectorAll(".enroll").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "#/userDashboardHelper";

        });
    });


    function renderTable() {
        tableContent.innerHTML = '';
        data.forEach(event => {
            let disabled;
            if (event.attendees.length == event.capacity) {
                disabled = 'disabled'
            }
            tableContent.innerHTML += `
                    <tr class="eventRow" data-id="${event.id}">
                        <td><img src="" alt=""></td>
                        <td>${event.name}</td>
                        <td>${event.description.slice(0, 25)}</td>
                        <td>${event.location}</td>
                        <td>${event.attendees.length}/${event.capacity}</td>
                        <td>${event.date}</td>
                        <td><button class="btn btn-primary enroll ${disabled}">Enroll</button></td>
                    </tr>
            `
        });

        document.addEventListener('click', (e) => {
            const row = e.target.closest('.eventRow');
            if (row) {
                const rowId = row.dataset.id;
                const eventId = data.find(event => event.id === rowId);

                if (eventId) {
                    sessionStorage.setItem('eventId', rowId);
                }

            }

        })
    }
}