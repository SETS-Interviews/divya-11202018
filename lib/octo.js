
/**
 * @author Divyapuja Vitonde (divyapuja.vitonde@gmail.com)
 * @version  1.0
 */

const octokit = require('@octokit/rest')({
  timeout: 0, // 0 means no request timeout
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3', // v1.2.3 will be current version
    authorization: process.env.GITHUB_TOKEN
  },
  // custom GitHub Enterprise URL
  baseUrl: 'https://api.github.com',
  // Node only: advanced request options can be passed as http(s) agent
  agent: undefined
});

  /**
   * @return Number of open issues only, not pull requests
   */
exports.getOpenIssues = params => new Promise(async (resolve, reject) => {
  let openIssuesCount = 0;
  try {
    const allOpenIssues = await octokit.paginate('GET /repos/:owner/:repo/issues', params);
    // GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request.
    // For this reason, "Issues" endpoints may return both issues and pull requests in the response.
    // You can identify pull requests by the pull_request key. Hence let's filter by pull_request field
    // issues will not have pull_request field.
    for (let i = 0; i < allOpenIssues.length; i++) {
      if (allOpenIssues[i].pull_request === undefined) {
        openIssuesCount += 1;
      }
    }
    resolve(openIssuesCount);
  } catch (err) {
    reject(err);
  }
});

/**
   * @return Number of branches from a GitHub repo
   */
exports.getBranches = params => new Promise(async (resolve, reject) => {
  try {
    const allBranches = await octokit.paginate('GET /repos/:owner/:repo/branches', params);
    resolve(allBranches.length);
  } catch (err) {
    reject(err);
  }
});

/* istanbul ignore next */
exports.getPRsWithLabel = (params, label) => new Promise(async (resolve, reject) => {
  let prsCount = 0;
  const openPRsTitles = [];
  try {
    const allPRs = await octokit.paginate('GET /repos/:owner/:repo/pulls?state=all', params);
    for (let i = 0; i < allPRs.length; i++) {
      if (allPRs[i].labels.length > 0) {
        for (let j = 0; j < allPRs[i].labels.length; j++) {
          if (allPRs[i].labels[j].name === label) {
            if (allPRs[i].state.toLowerCase() === 'open') {
              openPRsTitles.push(allPRs[i].title);
            }
            prsCount += 1;
          }
        }
      }
    }
    const response = {
      openPRsTitles: openPRsTitles,
      prsCount: prsCount
    };
    resolve(response);
  } catch (err) {
    reject(err);
  }
});
