var fill_pdf = require('fill-pdf-utf8');
module.exports = class Fillpdf {
    constructor(fields, sourcepdf, resultpdf) {
        this.fields = fields;
        this.sourcepdf = sourcepdf;
        this.resultpdf = resultpdf;
    }
    generateFormsPdf() {
        fill_pdf.generatePdf({ fields: this.fields }, this.sourcepdf, 'need_appearances', this.resultpdf, function (error, stdout, stderr) {
            if (error) {
                throw error;
                console.log('errrrrrrror');
            }
            //console.log(this.fields);
        })
    }
}