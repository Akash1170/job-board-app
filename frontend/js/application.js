async function loadApplications(){

const response =
await fetch(

"http://localhost:5000/api/application"

);

const data =
await response.json();

const container =
document.getElementById(
"applications"
);

container.innerHTML="";


data.forEach(app=>{

container.innerHTML += `

<div class="card p-3 mb-3">

<h4>

${app.job.title}

</h4>

<p>

Candidate:
${app.candidate.name}

</p>

<p>

Status:

<b>

${app.status}

</b>

</p>

</div>

`;

});

}


loadApplications();