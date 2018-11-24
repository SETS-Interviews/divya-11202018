
/* eslint-disable no-console */

/**
 * @author Divyapuja Vitonde (divyapuja.vitonde@gmail.com)
 * @version  1.0
 * @description A NodeJS application that runs a process every Monday at 7 AM EST
 * which retrieves the following data from GitHub
 * for the public node repository(https: //github.com/nodejs/node).
 * Data to retrieve:
 * - Number of open issues
 * - Number of branches
 * - Number of pull requests with the label http
 * - Additionally, get the title of the open pull requests with this label
 *
 */

const schedule = require('node-schedule-tz');
const octo = require('./lib/octo');

const params = {
  owner: 'nodejs',
  repo: 'node'
};

// Object Literal Syntax
/* istanbul ignore next */
const job = schedule.scheduleJob({
  hour: process.env.HOUR,
  minute: process.env.MINUTE,
  dayOfWeek: process.env.DAY,
  tz: process.env.TZ
}, async () => {
  try {
    const numberOfIssues = await octo.getOpenIssues(params);
    console.log('Number of open issues:', numberOfIssues);

    const numberOfBranches = await octo.getBranches(params);
    console.log('\nNumber of branches:', numberOfBranches);

    // Used object destructuring
    const {
      openPRsTitles,
      prsCount
    } = await octo.getPRsWithLabel(params, 'http');

    console.log('\nNumber of pull requests with the label http:', prsCount);
    console.log('\nTitle of the open pull requests with label http:');

    for (let i = 0; i < openPRsTitles.length; i++) {
      console.log('\t', openPRsTitles[i]);
    }
    console.log('\nNext job will be invoked at:', job.nextInvocation());
  } catch (error) {
    console.error(error);
  }
});

console.log('Next job will be invoked at:', job.nextInvocation());
