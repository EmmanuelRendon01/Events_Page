export function render() {
    return `
        
        <div class="container login__container">
            <h1 class="text-center pb-5 fw-bold">LOGIN</h1>
            <form id="login__form">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <a class="text-secondary text-center" href="#/register">Not registered yet? Click here!</a>
        </div>
        
    `
}
/**
* Function that controls login, adding the necessary validations for access.
*/
export function afterRender() {
    const loginForm = document.getElementById('login__form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);

            let data = {};

            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.email.trim() || !data.password.trim()) {
                alert("There are empty fields");
                return;
            }

            const emailFetch = await fetch(`http://localhost:3000/users?email=${data.email}`);
            const emailResponse = await emailFetch.json();

            if (emailResponse[0]) {
                if (emailResponse[0].password === data.password) {
                    alert("Login successful.");
                    localStorage.setItem('logged', "true");
                    localStorage.setItem('session', JSON.stringify(emailResponse[0]));
                    if (emailResponse[0].role === "admin") {
                        window.location.href = '#/adminDashboard';
                    }else if(emailResponse[0].role === "user"){
                        window.location.href = '#/userDashboard';
                    }
                    
                } else {
                    alert('Incorrect username or password.');
                }
            } else {
                alert('Incorrect username or password.')
            }
        })


    }
}