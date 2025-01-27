const APIBASE = "https://app-rl3zvszgpq-uc.a.run.app";
const lootTracker = document.querySelector("#loot-tracker");
const fightScreen = document.querySelector("#fight-screen");
const monsterInfo = document.querySelector("#monster-info");
const monsterBox = document.querySelector("#monster-box");

async function getData() {
    const res = await fetch(APIBASE + "/api/monster");
    const monster = await res.json();

    for(let i = 0; i < monster.length; i++) {
        const monsterBtn = document.createElement("button");
        monsterBox.appendChild(monsterBtn);
        monsterBtn.innerText = monster[i].name;
        monsterBtn.id = `${monster[i].id}`
        monsterBtn.addEventListener("click", () => {
            const newUrl = `#/${monsterBtn.id}`;
            window.history.pushState({ monsterId: monsterBtn.id }, '', newUrl);
            getSingleMonster(monsterBtn.id);
        })
    }
}

async function getSingleMonster() {
    const url = window.location.href;
    const id = url.split("/").pop();
    const res = await fetch(APIBASE + `/api/monster/${id}`);
    const data = await res.json();
    
    monsterInfo.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.image}" alt="${data.name}" class="monsterImg" />
        <p>Level: ${data.level}</p>
        <p>HP: ${data.hp}</p>
        <p>Examine Text: ${data.examine}</p>
        <p>Category: ${data.category}</p>
        <button id="fightBtn">Fight</button>
        <button id="editBtn" class="hidden">Edit</button>
        <button id="deleteBtn" class="hidden">Delete</button>
    `;
    const editBtn = document.querySelector("#editBtn");
    const deleteBtn = document.querySelector("#deleteBtn");
    if(loggedOn()) {
        editBtn.classList.remove("hidden");
        deleteBtn.classList.remove("hidden");
    }
    deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this monster?")) {
            deleteMonster();
        }
    });
}

async function deleteMonster() {
    const url = window.location.href;
    const id = url.split("/").pop();
    try {
        const res = await fetch(APIBASE + `/api/monster/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("Failed to delete monster.");
        }

        alert("Monster Deleted Successfully!");
        window.location.href = "/";
    } catch(error) {
        alert("Error! \nCould not delete monster.");
    }
}

function loggedOn() {
    const token = localStorage.getItem("Token");
    return token !== null && token !== "";
}

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
})

if(loggedOn()) {
    document.querySelector("#registerBtn").classList.add("hidden");
    document.querySelector("#loginBtn").classList.add("hidden");
    logoutBtn.classList.remove("hidden");
} else {
    document.querySelector("#registerBtn").classList.remove("hidden");
    document.querySelector("#loginBtn").classList.remove("hidden");
    logoutBtn.classList.add("hidden");
}

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const monsterId = params.get('monsterId');

    if (monsterId) {
        getSingleMonster(monsterId);
    } else {
        getData();
    }
});