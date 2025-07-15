import { get, update } from "./requests.js";


export function render() {
    return ``
}
/**
* Function that allows you to add a user to the event only if they have not previously registered.
*/
export async function afterRender() {

    const userString = localStorage.getItem('session');
    const user = JSON.parse(userString);

    const data = await get('events');
    const eventId = sessionStorage.getItem('eventId')

    if (eventId) {
        const event = data.find(event => event.id === eventId);
        let boolVar = false

        for (const attende of event.attendees) {
            if (attende === user.id) {
                boolVar = true;
            }
        }
        if (boolVar) {
            alert("You have already registered for this event.")
        } else {
            event.attendees.push(user.id);
            alert("You have successfully registered for the event.")
            update(event, 'events', eventId)
        }
    }

    window.location.href = '#/userDashboard'


}