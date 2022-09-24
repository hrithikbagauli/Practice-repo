const myform = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

refresh();
myform.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(nameInput.value === "" || emailInput.value === "") {
        msg.classList.add("error");
        msg.innerHTML = "Please Enter All Fields";
        setTimeout(() => msg.remove(), 4000);
    } else {
        const userDetails = {
            Name: nameInput.value,
            Email: emailInput.value
        }

        let seri = JSON.stringify(userDetails);

        localStorage.setItem(userDetails.Email , seri);

        showUsersOnScreen(userDetails);
    }
}

function refresh(user){
    window.addEventListener("DOMContentLoaded", () => {
        Object.keys(localStorage).forEach((key) => {
        
            const stringifiedDetails = localStorage.getItem(key);
            const details = JSON.parse(stringifiedDetails);
            showUsersOnScreen(details);
        })
    })
    const parentNode = document.getElementById("users");
    const childHTML = `<li> ${user.Name} : ${user.Email} </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function showUsersOnScreen(user) {
    if (localStorage.getItem(user.Email)) {
        removeUserFromScreen();
    }
    else{
        refresh(user);
    }
}


function removeUserFromScreen() {
    refresh();
}