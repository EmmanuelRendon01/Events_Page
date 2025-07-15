/**
* Here's how routes are protected.
* If the user doesn't have an active session, they won't be able to access any routes in the list of routes in the protectedRoutes variable.
* @param {string} path - the route obtained from the router
*/

export function auth(path) {
    const protectedRoutes = ['/userDashboard', '/adminDashboard', '/createEvent', '/updateEvent', '/userDashboardHelper', '/enrollments', '/adminDashboardHelper'];

    if (protectedRoutes.includes(path)) {
        const session = localStorage.getItem('logged');
        if (!session) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}