# EventsPage

EventsPage is a SPA (Single Page Application) web application for event management and subscription, with authentication, user registration, and event management capabilities. The project is developed in pure JavaScript and uses a JSON file as a mock database.

## Main features

- **User Registration and Authentication**: Allows users to create an account and log in.
- **Event Management**: The administrator can delete, edit, and create events.
- **Users can subscribe to events**: Users can subscribe to events and also view the events they subscribed to.
- **SPA (Single Page Application)**: Smooth navigation between pages without reloading the browser, thanks to the implemented router.
- **Modern Interface**: Uses Bootstrap for a beautiful and responsive look.

## Project Structure

```
db.json # Mock database (users and notes)
index.html # Application main page
router.js # SPA router
assets/styles/ # CSS stylesheets for each page
scripts/ # JS scripts for each feature/page
auth/auth.js # Authentication logic
```

## Installation and Execution

1. **Clone the repository**
    ```
    git clone https://github.com/EmmanuelRendon01/PruebaM3-EventsPage.git or if you have the ZIP unzip
    ```
2. **Open the project in VS Code or your favorite editor.**
3. **Mock the REST API with JSON Server (optional but recommended)**:
    - Install JSON Server if you don't have it:
    ```
    npm install -g json-server@0.17.4
    ```
    - Start the server with the `db.json` file:
    ```
    json-server db.json
    ```
    - This will allow you to make HTTP requests (GET, POST, PUT, DELETE) to `http://localhost:3000` as if you had a real API.
4. **No additional dependencies required**: All code is pure JavaScript and HTML/CSS. You just need to open `index.html` in your browser.

## Use

- When you open the app, you can register or log in.
- Once authenticated, if you are a user, you can view available events and subscribe to them.
- If you are an admin, you can create, delete, and edit events.
- Navigation between pages is instantaneous thanks to the SPA router.

## Database

The `db.json` file simulates the database, storing users and notes. Each note can be shared with other users by specifying the permission type (`read` or `edit`).

## Technologies Used

- **JavaScript** (ES6 Modules)
- **HTML5**
- **CSS3** (Bootstrap)

## Author

- Emmanuel Rendon Goez

## Clan 

- RITCHIE

## Email

- emarendon1301@gmail.com

## ID

- 1001250755

## License

This project is free to use for educational and personal purposes.
