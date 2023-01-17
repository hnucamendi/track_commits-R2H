# track_commits-R2H

This repository contains a simple implementation of a GitHub API client using the Octokit library for JavaScript/TypeScript. It allows users to get commit data for a specific repository by providing the repository owner and repository name.

## Getting Started

1. Clone the repository to your local machine

```
git clone https://github.com/hnucamendi/track_commits-R2H.git
```

2. Install the dependencies

```
npm install
```

3. Set your GitHub personal access token in a .env file in the root of the project

```
ACCESSTOKEN=<YOUR ACCESS TOKEN>
```

4. Start the development server

```
npm start
```

5. The server should be running on http://localhost:8000

## Usage

Make a GET request to http://localhost:8000/api/:owner/:repo where :owner is the repository owner and :repo is the repository name.

## Example

Making a GET request to http://localhost:8000/api/hnucamendi/track_commits-R2H would return a JSON object containing the commit data for the repository track_commits-R2H owned by hnucamendi.

## Deployment

To deploy the application, you can use a service like Heroku or AWS.

## Built With

Octokit - The GitHub API library used
Express - The web framework used

## Authors

Harold Arriola Nucamendi - hnucamendi
