const GITHUB_URL = " https://api.github.com/users"
async function fetchDetails(username){
    try {
        const response = await fetch(`${GITHUB_URL}/${username}`,{
        headers:{
            'Accept':"application/vnd.github+json",
            'User-Agent':"github-profile-cli"
        }
    });

    if(response.status==404){
        console.error("User not found!");
        process.exit(1);
    }
    if(response.status==403){
        console.error("GitHub API rate limit exceeded. Please try again later.");
        process.exit(1);
    }
    if(!response.ok){
        console.error("GitHub API request failed with status ${response.status}")
        process.exit(1);
    }
    return response.json();
}
catch(error){
    console.error("Error fetching user details:", error.message);
    process.exit(1);
}
}

async function main(){
    const username = process.argv[2];
    if(!username){
        console.error("Friendly Error");
        process.exit(1);
    }

    const details = await fetchDetails(username);


    console.log(`Name : ${details.name}`);
    console.log(`Username : ${details.login}`);
    console.log(`Profile : ${'https://github.com/'}${details.login}`);
    console.log(`Public Repo : ${details.public_repos}`);
    console.log(`Follower : ${details.followers}`);
    console.log(`Following : ${details.following}`);
    
}

main();