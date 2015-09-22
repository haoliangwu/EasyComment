function Organizations() {
    this.form_62x = {
        parentOrganizationId: 0,
        name: '',
        type: 'regular-organization',
        recursable: true,
        regionId: 0,
        countryId: 0,
        statusId: 12017,
        comments: '',
        site: false
    }
}

Organizations.prototype.createBasicOrgs = function (obj) {
    var name=obj.name;
    var parentId=obj.parentId;

    this.form_62x.name = name;

    if (parentId != '' && parentId)
        this.form_62x.parentOrganizationId = parentId;

    invoke('/organization/add-organization', this.form_62x, true);
};

Organizations.prototype.getOrgsByCompanyId = function (companyId, parentOrganizationId, callback) {
    invoke('/organization/get-organizations', {
            companyId: companyId,
            parentOrganizationId: parentOrganizationId ? parentOrganizationId : 0,
            site: true
        }, false, callback
    );
};