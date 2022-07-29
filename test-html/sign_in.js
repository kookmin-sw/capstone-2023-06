const email_submit_button = document.querySelector("#email_submit");
const email_input = document.querySelector("#user_id");

function checkEmail(event){
    console.log(email_input.value);
}

function init(){
    email_submit_button.addEventListener("click", checkEmail);
}

init();