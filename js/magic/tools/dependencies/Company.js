function Company() {
    this.companyId = '20155';
}

Company.prototype.getCompanyIdByWebId = function (webId, callback) {
    invoke('/company/get-company-by-web-id', {webId: webId}, false, callback);
};

var company = new Company();