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
