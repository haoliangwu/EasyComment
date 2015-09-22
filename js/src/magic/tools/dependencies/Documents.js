function Documents() {
    this.form_62 = {
        repositoryId: 20182,
        folderId: 0,
        sourceFileName: 'File1',
        mimeType: 'application/octet-stream',
        title: 'File1',
        description: 'File1',
        changeLog: 'test',
        bytes: '[8]'
    }

}

Documents.prototype = {
    createDocument: function (obj, callback) {
        this.form_62.repositoryId = obj.groupId;
        this.form_62.sourceFileName = obj.name;
        this.form_62.title = obj.name;

        if (callback)
            this.form_62.version_number = obj.version_number;

        invoke('/dlapp/add-file-entry', this.form_62, true, callback);
    },

    updateDocument: function (obj, callback) {
        var update_obj = {
            version: obj.version,
            version_number: obj.version_number,
            fileEntryId: obj.fileEntryId,

            sourceFileName: obj.sourceFileName,
            mimeType: 'application/octet-stream',
            title: obj.title,
            description: 'File1',
            changeLog: 'test',
            majorVersion: true,
            bytes: '[8]'
        };


        if (obj.version_number != update_obj.version)
            invoke('/dlapp/update-file-entry', update_obj, true, callback);
        else
            return 0;
    }
}
