function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

$.ajax({
    method: 'POST', //you can set what request you want to be
    url: "get_user",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("X-CSRFToken",  csrftoken);
    },
    success:function(response){
        users = response['users']
        res = JSON.parse(users)
        user_list = []
        for ( i=0; i <res.length; i++){
            user_list[i] = {'email': res[i]['fields']['email'], 'password': res[i]['fields']['password']}
            console.log(user_list[i])
        }

    },
  });

let email = document.getElementById("email");
let password = document.getElementById("password");

email.required = true;
password.required = true;

const pass_reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const email_reg = /^\s*(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;

email.addEventListener("input",validate);
password.addEventListener("input",validate);


function validate(event) {
    email.style.borderWidth = "thick";
    password.style.borderWidth = "thick";
    
    target = event.target
    if (target.type == "email"){
        if(email_reg.test(target.value) && target.value.length < 255){
            email.style.borderColor = "green"

            let exist = document.getElementById("invalid-message-email");
            if (exist !== null){
                exist.innerHTML = "";
            }
        }
        else{
            email.style.borderColor = "red";

            let exist = document.getElementById("invalid-message-email");
            if (exist === null){
                let newDiv = document.createElement("div");
                newDiv.id = "invalid-message-email";
                newDiv.innerHTML = "Invalid Email";
                newDiv.style.color = "red";
                newDiv.style.marginRight = "400px";
                document.getElementById("message").appendChild(newDiv);
            }
        }
    }
    else if (target.type == "password"){
        if(pass_reg.test(target.value) && target.value.length < 255){
            password.style.borderColor = "green";

            let exist = document.getElementById("invalid-message-password");
            if (exist !== null){
                exist.innerHTML = "";
            }
        }
        else{
            password.style.borderColor = "red";

            let exist = document.getElementById("invalid-message-password");
            if (exist === null){
                let newDiv = document.createElement("div");
                newDiv.id = "invalid-message-password";
                newDiv.innerHTML = "Invalid Password";
                newDiv.style.color = "red";
                newDiv.style.marginRight = "400px";
                document.getElementById("message").appendChild(newDiv);
            }
        }
    }

}

window.onclick = function(event){
    if(event.target.type != "email"){
        email.removeEventListener("input",validate);
        email.style.borderColor = "white";

        password.addEventListener("input",validate);
    }
    
    if(event.target.type != "password"){
        password.removeEventListener("input",validate);
        password.style.borderColor = "white";

        email.addEventListener("input",validate);
    }
}

let btn = document.getElementsByClassName("awesome-button")[0];
let close_btn = document.getElementsByClassName("close")[0];

btn.addEventListener("click",modalEvent);
close_btn.addEventListener("click",exec);

function modalEvent(event){
    let valid = false;

    if(event.target.type =="submit"){

        let modal = document.getElementById("modal-container");
        modal.style.display = "block";

        for (i = 0; i < user_list.length; i++){
            if(email.value == user_list[i].email && password.value == user_list[i].password){
                let content = document.getElementById("modal-content");

                let message = document.createElement("p");
                message.id="valid-message";
                message.innerHTML = `<div style="color:rgb(51, 204, 51); font-weight: bold; margin-left:67px;"> Logged in Happily ${email.value} </div>`;
           
                let valid_exist = document.getElementById("valid-message");
                let invalid_exist = document.getElementById("invalid-message");
                if(valid_exist !== null){
                    content.replaceChild(message,valid_exist);
                }
                else if(invalid_exist !==null){
                    content.replaceChild(message,invalid_exist);
                }
                else if (valid_exist === null && invalid_exist ===null){
                    content.appendChild(message);
                }

                valid = true;
                break;
            }
        }

        if (!valid){
            let content = document.getElementById("modal-content");

                let message = document.createElement("p");
                message.id="invalid-message";
                message.innerHTML = `<div style="color:red; font-weight: bold; margin-left:87px;"> Failed to Login :( </div>`;

                let valid_exist = document.getElementById("valid-message");
                let invalid_exist = document.getElementById("invalid-message");
                if(valid_exist !== null){
                    content.replaceChild(message,valid_exist);
                }
                else if(invalid_exist !==null){
                    content.replaceChild(message,invalid_exist);
                }
                else if (valid_exist === null && invalid_exist ===null){
                    content.appendChild(message);
                }

            }
    }
}
function exec(event){
    let modal = document.getElementById("modal-container");
    modal.style.display = "none";
}
