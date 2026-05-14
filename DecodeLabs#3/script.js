
const App = (() => {
    
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    const body = document.body;
    const themeBtn = document.getElementById("theme-change");
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".navbaritems");
    const form = document.querySelector("form");
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');


    function createMessageCard(data){

        const div = document.createElement("div");
        div.classList.add("message");

        const title = document.createElement("h4");
        title.textContent = data.name;

        const email = document.createElement("p");
        email.textContent = data.email;

        const msg = document.createElement("p");
        msg.textContent = data.message;

        div.appendChild(title);
        div.appendChild(email);
        div.appendChild(msg);

        return div;
    }

    // DISPLAY MESSAGES
    function renderMessages(){

        let messageBox = document.querySelector(".message-box");

        if(!messageBox){

            messageBox = document.createElement("div");
            messageBox.classList.add("message-box");

            document.querySelector("#contact .container").appendChild(messageBox);
        }

        messageBox.textContent = "";

        messages.forEach(item => {
            const card = createMessageCard(item);
            messageBox.appendChild(card);
        });
    }

    // SAVE TO LOCAL STORAGE
    function saveMessages(){
        localStorage.setItem(
            "messages",
            JSON.stringify(messages)
        );
    }

    function handleFormSubmit(e){

        e.preventDefault();

        const data = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        if(
            !data.name ||
            !data.email ||
            !data.message
        )
        {
            alert("Please fill all fields");
            return;
        }

        // PROCESS
        messages.push(data);

        saveMessages();

        // OUTPUT
        renderMessages();

        form.reset();

        nameInput.focus();
    }

    // TOGGLE MENU
    function toggleMenu(){
        navMenu.classList.toggle("active");
    }

    // TOGGLE THEME
    function toggleTheme(){

        body.classList.toggle("dark");

        const currentTheme =
            body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("theme", currentTheme);
    }


    function loadTheme(){

        const savedTheme =
            localStorage.getItem("theme");

        if(savedTheme === "dark"){
            body.classList.add("dark");
        }
    }

    // PAGE LOAD
    function pageLoad(){

        loadTheme();

        renderMessages();

    }

    function bindEvents(){

        themeBtn.addEventListener(
            "click",
            toggleTheme
        );

        menuBtn.addEventListener(
            "click",
            toggleMenu
        );

        form.addEventListener(
            "submit",
            handleFormSubmit
        );

        window.addEventListener(
            "load",
            pageLoad
        );
    }


    function init(){
        bindEvents();
    }

    return{
        init
    };

})();
//start app
App.init();