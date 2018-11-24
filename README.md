# divya-11202018
The goal of this interview coding task is to create a NodeJS application that runs a process every Monday at 7AM EST which retrieves the following data from GitHub for the public node repository (https://github.com/nodejs/node).

1. Number of open issues
2. Number of branches
3. Number of pull requests with the label http
4. Title of the open pull requests with label http

Once the data is available, the application prints the information to the console in an easily readable format.

## Goals
1. The application should use the GitHub public API to retrieve the needed data
2. The application should be building and runnable in a docker image i.e. `docker run <image_name>`
3. Use the ocktokit library to interact with the GitHub API (https://github.com/octokit/rest.js/)
4. Do not commit any personal credentials or API keys to this repository

### Prerequisite - To build and run the application on Docker
If user does not have Docker installed, use
```
sudo apt -y install docker.io
```
## Build the application on Docker
I have used <image_name> as ibm/node-git-app. Feel free to use any other name as you like.
```
git clone https://github.com/SETS-Interviews/divya-11202018.git
cd divya-11202018
docker build -t ibm/node-git-app .
```

## Run the application on Docker

To avoid inspecting github token in docker history, it is recommanded to run this application as
```
docker run --env GITHUB_TOKEN=<USER'S_TOKEN> ibm/node-git-app
```
If everything is successfully configured and installed, you should see a similar output after running the application in Docker
![outputFromDocker](https://github.com/SETS-Interviews/divya-11202018/blob/dev/ScreenShots/outputFromDocker.PNG)
## Note

I have used `job.nextInvocation()` method in `index.js` to print the time when the next job will be invoked. The time printed here depends on the system time. Don't worry, the job is configured to be invoked according to EST timezone i.e. America/New_York (ENV TZ)

## Istanbul

I have used the istanbul code coverage tool. The minimum code coverage is defined as below:

```
check:
  # For all files as an *aggregate*.
  global:
    statements: 85
    lines: 85
    branches: 85
    functions: 100

  # For each and every file on an individual basis.
  each:
    statements: 85
    lines: 85
    branches: 85
    functions: 100

```
![codeCoverageHtmlReport](https://github.com/SETS-Interviews/divya-11202018/blob/dev/ScreenShots/codeCoverageHtmlReport.PNG)

![codeCoverageLocal](https://github.com/SETS-Interviews/divya-11202018/blob/dev/ScreenShots/codeCoverageLocal.PNG)

## Issues faced and how did I resolve it
 - HttpError: API rate limit exceeded :
 ![accessLimitExceed](https://github.com/SETS-Interviews/divya-11202018/blob/dev/ScreenShots/accessLimitExceed.PNG)
 - [x] **Solution:** Use user authentication. Set GITHUB_TOKEN env var
 
 - Issue while doing npm install :
 ![npmCacheError](https://github.com/SETS-Interviews/divya-11202018/blob/dev/ScreenShots/npmCacheError.PNG)
 - [x] **Solution:** `npm cache clean --force`
 
 - Istanbul Error :
```
Failed to parse file: DIR_PATH/lib/octo.js
Transformation error; return original code
{ Error: Line 26: Unexpected token function
    at constructError (DIR_PATH/node_modules/istanbul/node_modules/esprima/esprima.js:2407:21)
```
- [x] **Solution:** `npm install --save istanbul@1.0.0-alpha.2`
 
## Contributing

* Divyapuja Vitonde (divyapuja.vitonde@gmail.com)
