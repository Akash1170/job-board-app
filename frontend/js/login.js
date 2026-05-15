const form =
document.getElementById("loginForm");

form.addEventListener(
"submit",

async(e)=>{

e.preventDefault();

const data={

email:
document.getElementById("email").value,

password:
document.getElementById("password").value

};

const response =
await fetch(
"http://localhost:5000/api/auth/login",

{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(data)
}
);

const result=
await response.json();

localStorage.setItem(
"token",
result.token
);

document.getElementById(
"message"
).innerText=
"Login Success";

}); 