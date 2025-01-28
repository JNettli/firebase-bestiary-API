const APIBASE = "https://app-rl3zvszgpq-uc.a.run.app";
const loginForm = document.querySelector("#login");

async function login() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try {
    const res = await fetch(APIBASE + "/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await res.json();
        localStorage.setItem("Token", data.accessToken);
        localStorage.setItem("User", data.userId);
        window.location.href= "/";
    } catch (error) {
        alert("Could not login. \nIncorrect username or password.");
    }
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login(email, password);
})
