/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const octo = require('../lib/octo');
const chai = require('chai');

const params = {
    owner: 'nodejs',
    repo: 'node'
};

describe('octo.js', function () {
    it('should return number of open issues', () => {
        return octo.getOpenIssues(params)
            .then((response) => {
                 chai.expect(response).to.not.equal(-1);
            });
    });

    it('should return number of branches', () => {
            return octo.getBranches(params)
                .then((response) => {
                    chai.expect(response).to.not.equal(-1);
                });
    });

    // This method takes a lot of time to run and hence mocha timesout. May be nock can help here.
    // it('should return number of PRs with label http', () => {
    //         return octo.getPRsWithLabel(params, 'http')
    //             .then((response) => {
    //                 chai.expect(response.prsCount).to.not.equal(-1);
    //             });
    // });
});
