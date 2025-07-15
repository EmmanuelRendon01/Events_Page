/**
* This is how the SPA works, where the idea is to find the path the user is on and then load the content, render it, and execute the logic.
*/
import { auth } from './auth/auth.js';

const routes = {
  '/': () => import('./scripts/login.js'),
  '/register': () => import('./scripts/register.js'),
  '/userDashboard': () => import('./scripts/userDashboard.js'),
  '/adminDashboard': () => import('./scripts/adminDashboard.js'),
  '/createEvent': () => import('./scripts/createEvent.js'),
  '/updateEvent': () => import('./scripts/updateEvent.js'),
  '/userDashboardHelper': () => import('./scripts/userDashboardHelper.js'),
  '/enrollments': () => import('./scripts/enrollments.js'),
  '/adminDashboardHelper': () => import('./scripts/adminDashboardHelper.js'),
};

/**
* @param {} app - This is an ID obtained from the DOM into which the content will be injected.
* @param {string} hash - This is the current path the user is on.
*/

export async function renderRoute(hash, app) {

  const [pathPart, queryPart] = hash.slice(1).split('?');

  let path = pathPart || '/';

  if (!auth(path)) {
    path = '/';
  }
  const load = routes[path];

  if (!load) {
    app.innerHTML = '<h2>Página no encontrada</h2>';
    return;
  }

  const module = await load();
  const html = await module.render();
  app.innerHTML = html;

  if (typeof module.afterRender === 'function') {
    module.afterRender();
  }

}

