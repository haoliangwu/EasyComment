function Category() {
    this.form_62={
        title: 'Test TiTle',
        vocabularyId: 20880
    }
}

Category.prototype={
    createCategory:function(obj,callback) {
        this.form_62.title = obj.name;
        this.form_62.vocabularyId=obj.vocabularyId;
        invoke('/assetcategory/add-category/', this.form_62, true, callback);
    }
}

function Vocabulary() {
    this.form_62={
        title: 'Test TiTle'
    }
}

Vocabulary.prototype={
    createVocabulary:function(obj,callback) {
        this.form_62.title = obj.name;
        this.form_62.c_basename=obj.c_basename;
        this.form_62.c_number = obj.c_number;
        invoke('/assetvocabulary/add-vocabulary', this.form_62, true, callback);
    }
}

function Tag() {
 this.form_62={
     name: 'Test Name',
     tagProperties: ''
 }
}

Tag.prototype={
    createTag:function(obj,callback) {
        this.form_62.name = obj.name;
        invoke('/assettag/add-tag', this.form_62, true, callback);
    }
}