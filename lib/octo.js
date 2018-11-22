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
        const param = {
            owner: 'nodejs',
            repo: 'node',
            per_page: 100,
            page: 1
        }
        try {
            const first_page = await octokit.repos.listBranches(param);
            param.page = 2;
            const second_page = await octokit.repos.listBranches(param);
            numberOfBranches = first_page.data.length + second_page.data.length;
            resolve(numberOfBranches);
        } catch (err) {
            reject(err);
        }
    });
}