const APIBASE = "https://app-rl3zvszgpq-uc.a.run.app";
const form = document.querySelector("#new-monster");

async function createMonster() {
    const monsterName = document.querySelector("#name").value;
    const monsterLevel = document.querySelector("#level").value;
    const monsterHp = document.querySelector("#hp").value;
    const monsterImage = document.querySelector("#image").value;
    const monsterExamine = document.querySelector("#examine").value;
    const monsterCategory = document.querySelector("#category").value;
    
    try {
        const res = await fetch(APIBASE + "/api/monster/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: monsterName,
                level: monsterLevel,
                hp: monsterHp,
                image: monsterImage,
                examine: monsterExamine,
                category: monsterCategory,
            }),
        });
        alert("Monster Created Successfully!");
        form.reset();
    } catch(error) {
        console.error(error);
        alert("Error: ", error.message);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    createMonster();
});
