function WikiNode() {
    this.form_62={
        groupId: 20182,
        name: 'Main'
    }
}

WikiNode.prototype = {
    getWikiNode: function (obj, callback) {
        invoke('/wikinode/get-nodes', obj, false, callback);
    },

    createWikiNode: function (obj, callback) {
        var payload={
            name: obj.name,
            description: 'TestDescription',
            number:obj.number,
            basename:obj.basename
        }

        invoke('/wikinode/add-node', payload, true, callback);
    }
};

function WikiPage() {
    this.form_62={
        nodeId: 20809,
        title: 'Test Title',
        content: 'Test Content',
        summary: 'Test Summary',
        minorEdit: true
    }
}

WikiPage.prototype={
    createWikiPage:function(obj,callback) {
        this.form_62.nodeId=obj.nodeId;
        this.form_62.title=obj.name;

        invoke('/wikipage/add-page', this.form_62, true, callback);
    }
}