/**
 * @author Divyapuja Vitonde (divyapuja.vitonde@gmail.com)
 * @version  1.0
 */
let numberOfBranches = 0;
/**
 * @param octokit (Octokit configuration object)
 */

exports.getBranches = (octokit) => {
    return new Promise(async (resolve,reject) => {
        try {
            const allBranches = await octokit.paginate('GET /repos/nodejs/node/branches')
            resolve(allBranches.length);
        } catch (err) {
            reject(err);
        }
    });
}

exports.getIssues = (octokit) => {
    return new Promise(async (resolve,reject) => {
        let openIssue = 0;
        try {
            const allOpenIssues = await octokit.paginate('GET /repos/nodejs/node/issues');
            // GitHub's REST API v3 considers every pull request an issue, but not every issue is a pull request. 
            // For this reason, "Issues" endpoints may return both issues and pull requests in the response. 
            // You can identify pull requests by the pull_request key. Hence let's filter by pull_request field
            // issues will not have pull_request field.
            for(let i = 0; i < allOpenIssues.length; i++) {
                if(allOpenIssues[i].pull_request === undefined){
                    openIssue = openIssue + 1;
                }
            }   
            resolve(openIssue);
        } catch (err) {
            reject(err);
        }
    });
}