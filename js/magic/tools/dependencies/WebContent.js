function WebContent() {
    //content: '<?xml version="1.0"?><root available-locales="en_US" default-locale="en_US"><static-content language-id="en_US"><![CDATA[<p>Test WC</p> <p>&nbsp;</p>]]></static-content></root>',
    this.form_62x = {
        groupId: 20182,
        folderId: 0,
        classNameId: 0,
        classPK: 0,
        articleId: '',
        autoArticleId: true,
        titleMap: "{\"en_US\":\"Test JSON Article\"}",
        descriptionMap: "{\"en_US\":\"Test JSON Description\"}",
        content: "<?xml version='1.0' encoding='UTF-8'?><root available-locales=\"en_US\" default-locale=\"en_US\"><static-content language-id=\"en_US\"><![CDATA[<p>\n\ttest content</p>]]></static-content></root>",
        type: 'general',
        ddmStructureKey: '',
        ddmTemplateKey: '',
        layoutUuid: null,
        displayDateMonth: 1,
        displayDateDay: 1,
        displayDateYear: 2014,
        displayDateHour: 1,
        displayDateMinute: 30,
        expirationDateMonth: 0,
        expirationDateDay: 0,
        expirationDateYear: 0,
        expirationDateHour: 0,
        expirationDateMinute: 0,
        neverExpire: true,
        reviewDateMonth: 0,
        reviewDateDay: 0,
        reviewDateYear: 0,
        reviewDateHour: 0,
        reviewDateMinute: 0,
        neverReview: true,
        indexable: true,
        articleURL: 'ArticleURL'
    }
}

WebContent.prototype.createWebContent = function (obj) {

    var name = obj.name;
    var groupId = obj.groupId;

    this.form_62x.titleMap = "{\"en_US\":\""+name+"\"}";
    this.form_62x.groupId = groupId;

    invoke('/journalarticle/add-article', this.form_62x, true);
};
