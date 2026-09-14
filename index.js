const GITHUB_URL = " https://api.github.com/users"
async function fetchDetails(username){
    try {
        const response = await fetch(`${GITHUB_URL}/${username}`,{
        headers:{
            'Accept':"application/vnd.github+json",
            'User-Agent':"github-profile-cli"
        }
    });

    const data = await response.json();

    return {
        name: data.name,
        username:data.login,
        follower:data.followers,
        following:data.following,
        repo:data.public_repos,
    }
        
    } catch (error) {
        console.error("Something went wrong while fetching the details!")
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
    console.log(`Username : ${details.username}`);
    console.log(`Profile : ${'https://github.com/'}${details.username}`);
    console.log(`Public Repo : ${details.repo}`);
    console.log(`Follower : ${details.follower}`);
    console.log(`Following : ${details.following}`);
    
}

main();