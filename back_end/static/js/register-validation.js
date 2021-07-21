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
            user_list[i] = res[i]['fields']['email']
            console.log(user_list[i])
        }

    },
  });



const pass_reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const email_reg = /^\s*(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;

let f_name = document.getElementById("name");
let family = document.getElementById("family");
let email = document.getElementById("email");
let password = document.getElementById("password");
let address = document.getElementById("address");

f_name.required = true;
family.required = true;
email.required = true;
password.required = true;
address.required = true;

f_name.addEventListener("input",validate);
family.addEventListener("input",validate);
email.addEventListener("input",validate);
password.addEventListener("input",validate);
address.addEventListener("input",validate);


function validate(event) {
    target = event.target
    target.style.borderWidth = "thick";

    let v_message = document.getElementById("message");

    if(target.type =="text"){
        if(target.value.length < 255){
            target.style.borderColor = "green";

            let exist = document.getElementById("invalid-message-text");
            if (exist !== null){
                e_message.removeChild(exist);
            }
        }
        else{
            target.style.borderColor = "red";

            let exist = document.getElementById("invalid-message-text");
            if (exist === null){
                let newDiv = document.createElement("div");
                newDiv.id = "invalid-message-text";
                newDiv.innerHTML = `invalid ${target.id}`;
                newDiv.style.color = "red";
                newDiv.style.marginRight = "200px";
                v_message.appendChild(newDiv);
        }
    }
}

    if (target.type == "email"){
        if(email_reg.test(target.value) && target.value.length < 255){
            target.style.borderColor = "green"

            let exist = document.getElementById("invalid-message-email");
            if (exist !== null){
                v_message.removeChild(exist);
            }
        }
        else{
            target.style.borderColor = "red";

            let exist = document.getElementById("invalid-message-email");
            if (exist === null){
                let newDiv = document.createElement("div");
                newDiv.id = "invalid-message-email";
                newDiv.innerHTML = "Invalid Email";
                newDiv.style.color = "red";
                newDiv.style.marginRight = "200px";
                v_message.appendChild(newDiv);
            }
        }
    }
    else if (target.type == "password"){
        if(pass_reg.test(target.value) && target.value.length < 255){
            target.style.borderColor = "green";

            let exist = document.getElementById("invalid-message-password");
            if (exist !== null){
                v_message.removeChild(exist);
            }
        }
        else{
            target.style.borderColor = "red";

            let exist = document.getElementById("invalid-message-password");
            if (exist === null){
                let newDiv = document.createElement("div");
                newDiv.id = "invalid-message-password";
                newDiv.innerHTML = "Invalid Password";
                newDiv.style.color = "red";
                newDiv.style.marginRight = "200px";
                v_message.appendChild(newDiv);
            }
        }
    }
    else if (target.id == "address"){
        if(target.value.length < 1000){
            target.style.borderColor = "green";

            let exist = document.getElementById("invalid-message-address");
            if (exist !== null){
                e_message.removeChild(exist);
            }
        }
        else{
            target.style.borderColor = "red";

            let exist = document.getElementById("invalid-message-address");
            if (exist === null){
                let newDiv = document.createElement("div");
                newDiv.id = "invalid-message-address";
                newDiv.innerHTML = `invalid address`;
                newDiv.style.color = "red";
                newDiv.style.marginRight = "200px";
                v_message.appendChild(newDiv);
            }    
        }
    }

}

let btn = document.getElementsByClassName("awesome-button")[0];
let close_btn = document.getElementsByClassName("close")[0];

btn.addEventListener("click",modalEvent);
close_btn.addEventListener("click",exec);

function modalEvent(event){

        let valid = false;
        let modal = document.getElementById("modal-container");
        modal.style.display = "block";

        let invalid_password = document.getElementById("invalid-message-password");
        let invalid_email = document.getElementById("invalid-message-email");
        let invalid_text = document.getElementById("invalid-message-text");
        let invalid_address = document.getElementById("invalid-message-address");

        for (i = 0; i < user_list.length; i++){
            if(email.value !== user_list[i] && invalid_email === null && invalid_password === null && invalid_address === null && invalid_text === null && email.value !== "" && password.value !=="" && f_name.value != "" && family.value!=="" && address.value !==""){
                let content = document.getElementById("modal-content");

                let message = document.createElement("p");
                message.id="valid-message";
                
                if (event.target.id == "submit"){
                    message.innerHTML = `<div style="color:rgb(51, 204, 51); font-weight: bold; margin-left:67px;"> Logged in Happily ${email.value} </div>`;
                }

                if (event.target.id == "modify"){
                    message.innerHTML = `<div style="color:rgb(51, 204, 51); font-weight: bold; margin-left:67px;"> Modified Happily ${email.value} </div>`;
                }

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

                if (event.target.id == "submit"){
                    message.innerHTML = `<div style="color:red; font-weight: bold; margin-left:87px;"> Failed to Login :( </div>`;
                }

                if (event.target.id == "modify"){
                    message.innerHTML = `<div style="color:red; font-weight: bold; margin-left:87px;"> Failed to Modify :( </div>`;
                }

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

function exec(){
    let modal = document.getElementById("modal-container");
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target.type != "submit"){
        exec();
    }

    if(event.target.type != "email"){
        email.style.borderColor = "white";
        let invalid_email = document.getElementById("invalid-message-email");
        if (invalid_email !== null){
            invalid_email.style.display = "none";
        }
    }
    if(event.target.type != "password"){
        password.style.borderColor = "white";
        let invalid_password = document.getElementById("invalid-message-password");
        if (invalid_password !== null){
            invalid_password.style.display = "none";
        }
    }
    
    if(event.target.id != "name"){
            f_name.style.borderColor = "white";
        }
    if(event.target.id != "family"){
            family.style.borderColor = "white";
        }

    if(event.target.type != "address"){
        address.style.borderColor = "white";
        let invalid_address = document.getElementById("invalid-message-address");
        if (invalid_address !== null){
            invalid_address.style.display = "none";
        }
    }
}
