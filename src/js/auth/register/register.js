const APIBASE = "https://app-rl3zvszgpq-uc.a.run.app";
const registerForm = document.querySelector("#register");

async function register() {
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    try {
        const res = await fetch(APIBASE + "/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        const data = await res.json();
        alert(data.message);
        window.location.href = "/";
        console.log(data.message);
    } catch (error) {
        console.error("Error during registration:", error);
    }
}

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
});