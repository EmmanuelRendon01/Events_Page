import { remove, get } from "./requests.js"

export function render(){
    return ``
}
/**
* This function deletes an event only if it has no subscribed users
*/
export async function afterRender(){
    const data = await get('events');
    const eventId = sessionStorage.getItem('eventId');

    const event = data.find(e => e.id === eventId);

    if (event.attendees.length > 0) {
        alert("You cannot delete the event because there are users registered for it. ")
    }else{
        if (eventId) {
            const confimation = confirm('Are you sure to delete this event?');
            if (confimation) {
                remove('events', eventId);
            }
    
        }
    }
    
    window.location.href = "#/adminDashboard"
}

