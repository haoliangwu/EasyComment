'use strict';

function Pages() {
    this.form_62 = {
        groupId: 20182,
        privateLayout: false,
        parentLayoutId: 0,
        name: '',
        title: '',
        description: '',
        type: 'portlet',
        hidden: false,
        friendlyURL: ''
    };
}

Pages.prototype = {
    createPublicPages: function createPublicPages(obj) {
        var name = obj.name;
        var friendlyURL = '/' + name;
        var groupId = obj.groupId;

        this.form_62.name = name;
        this.form_62.friendlyURL = friendlyURL;
        this.form_62.groupId = groupId;

        invoke('/layout/add-layout', this.form_62, true);
    },

    createPublicPagesWithChild: function createPublicPagesWithChild(obj, callback) {
        var name = obj.name;
        var friendlyURL = '/' + name;
        var groupId = obj.groupId;

        this.form_62.name = name;
        this.form_62.friendlyURL = friendlyURL;
        this.form_62.groupId = groupId;
        this.form_62.number_sub = obj.number_sub;
        this.form_62.basename_sub = obj.basename_sub;

        if (!obj.isWithChild) {
            this.form_62.isWithChild = false;
            this.form_62.parentLayoutId = obj.parentLayoutId;
        }

        invoke('/layout/add-layout', this.form_62, true, callback);
    }
};