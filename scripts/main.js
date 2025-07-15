
/**
* This JS is what triggers the router.js function with the hashchange and DOMContentLoaded events
*/
import { renderRoute } from '../router.js';

const app = document.getElementById('content');

// Get the current path and label where the content will be inserted
const handleRoute = () => renderRoute(location.hash, app);

// When the hash changes, execute the function
window.addEventListener('hashchange', handleRoute);
// When the page loads, execute the function
window.addEventListener('DOMContentLoaded', handleRoute);