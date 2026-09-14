# GitHub Profile Details CLI

A simple Node.js command-line tool that fetches and displays a GitHub user's public profile details using the GitHub REST API.

## Features

- 👤 Displays name, username, and profile link
- 📦 Shows public repository count
- 👥 Shows follower and following counts
- ⚠️ Friendly error handling for missing usernames, non-existent users, and rate limits

## Requirements

- [Node.js](https://nodejs.org/) v18 or later (for built-in `fetch` support)

## Usage

```bash
node github-profile.js <username>
```

### Examples

```bash
node github-profile.js torvalds
node github-profile.js octocat
node github-profile.js                       # → prints a friendly error (no username given)
node github-profile.js someNonexistentUser123 # → prints "User not found!"
```

### Sample Output

```
Name : Linus Torvalds
Username : torvalds
Profile : https://github.com/torvalds
Public Repo : 9
Follower : 234000
Following : 0
```

## How It Works

1. Reads the username from the command-line argument (`process.argv[2]`).
2. Sends a `GET` request to `https://api.github.com/users/<username>` with the required `Accept` and `User-Agent` headers (GitHub rejects requests without a `User-Agent`).
3. Checks the response status:
   - `404` → prints `"User not found!"` and exits
   - `403` → prints a rate-limit message and exits
   - any other non-OK status → prints a generic failure message and exits
4. Parses the JSON response and prints the relevant fields (`name`, `login`, `public_repos`, `followers`, `following`).

## Error Handling

| Scenario | Behavior |
|---|---|
| No username provided | Prints a friendly error and exits with code `1` |
| Username doesn't exist on GitHub | Prints `"User not found!"` and exits with code `1` |
| GitHub API rate limit exceeded | Prints a rate-limit message and exits with code `1` |
| Network failure / unexpected error | Caught and logged via `try/catch`, exits with code `1` |

## Notes

- No authentication token is required for basic profile lookups, but unauthenticated requests are limited to **60 requests/hour per IP**. Add an `Authorization: Bearer <token>` header if you need a higher limit.
- This tool only reads *public* profile data — no write access or authentication scopes are needed.

