import { add } from "./requests.js";

export function render() {
    return `
        <div class="container login__container">
        <h1 class="text-center pb-5 fw-bold">Register</h1>
        <form id="register__form">
            <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Enter your Full name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password">
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Enter your password again">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>

        <a class=".bg-secondary text-center" href="#/">Are you registered? Click here!</a>
    </div>
    `
}

/**
* Function that controls registration and adds various validations to create a user.
*/
export function afterRender() {
    const registerForm = document.getElementById('register__form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);

            let data = {}

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.email.trim() || !data.password.trim() || !data.name.trim() || !data.confirmPassword.trim()) {
                alert("There are empty fields");
                return;
            }

            if (data.password.trim() !== data.confirmPassword) {
                alert("The passwords do not match.");
                return;
            }

            const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
            const emailResponse = await emailFetch.json();

            if (emailResponse.length > 0) {
                alert("Email already registered");
                return;
            }

            data = {
                "name" : data.name,
                "email" : data.email,
                "password" : data.password,
                "role": "user"
            }

            console.log(data);
            

            add(data, 'users')
            window.location.href = '#/userDashboard';
            localStorage.setItem('logged', "true");
            localStorage.setItem('session', JSON.stringify(data));
        })
    }
}