/**
 * @author Divyapuja Vitonde (divyapuja.vitonde@gmail.com)
 * @version  1.0
 * @description A NodeJS application that runs a process every Monday at 7 AM EST which retrieves the following data from GitHub
 * for the public node repository(https: //github.com/nodejs/node).
 * Data to retrieve:
 * - Number of open issues
 * - Number of branches
 * - Number of pull requests with the label http
 * - Additionally, get the title of the open pull requests with this label
 *
 *
 */

const schedule = require('node-schedule-tz');
const octo = require('./lib/octo');

const octokit = require('@octokit/rest')({
    timeout: 0, // 0 means no request timeout
    headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': 'octokit/rest.js v1.2.3', // v1.2.3 will be current version
        authorization: process.env.GITHUB_TOKEN // Divyapuja's github token
    },
    // custom GitHub Enterprise URL
    baseUrl: 'https://api.github.com',
    // Node only: advanced request options can be passed as http(s) agent
    agent: undefined
})

// Object Literal Syntax 
const job = schedule.scheduleJob({
    hour: process.env.HOUR,
    minute: process.env.MINUTE,
    dayOfWeek: process.env.DAY,
    tz: process.env.TZ
}, async function () {
    try{
        let numberOfBranches = await octo.getBranches(octokit);
        console.log('Total branches: ', numberOfBranches);
        let numberOfIssues = await octo.getIssues(octokit);
        console.log('Total Issues:', numberOfIssues);
        console.log('\nNext job will be invoked at: ', job.nextInvocation());
    } catch (error){
        console.error(error);
    }
});

console.log('Next job will be invoked at: ', job.nextInvocation());
