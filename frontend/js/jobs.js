async function loadJobs() {

    const response =
    await fetch(
    "http://localhost:5000/api/jobs"
    );

    const jobs =
    await response.json();

    const container =
    document.getElementById(
    "jobsContainer"
    );

    container.innerHTML = "";

    jobs.forEach(job => {

        container.innerHTML += `

        <div class="card p-3 mb-3">

            <h4>${job.title}</h4>

            <p>
            Location:
            ${job.location}
            </p>

            <p>
            Salary:
            ₹${job.salary}
            </p>

            <p>
            ${job.description}
            </p>

            <p>
            Status:
            ${job.status}
            </p>

            <button
            onclick="applyJob('${job._id}')"
            class="btn btn-primary">

            Apply

            </button>

        </div>

        `;

    });

}



async function applyJob(jobId){

    const candidateId =
    prompt(
    "Enter Candidate ID"
    );

    if(!candidateId){

        alert(
        "Candidate ID required"
        );

        return;
    }

    try{

        const response =
        await fetch(

        "http://localhost:5000/api/application/apply",

        {

        method:"POST",

        headers:{
        "Content-Type":
        "application/json"
        },

        body:
        JSON.stringify({

            candidate:
            candidateId,

            job:
            jobId

        })

        }

        );

        const result =
        await response.json();

        alert(
        "Applied Successfully"
        );

        console.log(result);

    }

    catch(error){

        console.log(error);

        alert(
        "Application Failed"
        );

    }

}



loadJobs();