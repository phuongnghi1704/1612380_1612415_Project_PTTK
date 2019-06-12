const hbs=require('handlebars');
const Category = require('./models/category');
const Manufacturer = require('./models/manufacturer');

module.exports = {
    productPage: function (id) {
        const url = '/single-product/' + id;
        return new hbs.SafeString(url);
    },

    categoryPage: function (id) {
       const url = '/category/' + id;
       return new hbs.SafeString(url);
    },

    manufacturerPage: function(id){
        const url = '/manufacturer/' + id;
        return new hbs.SafeString(url);
    },

    formatCurrency: function (num) {
        num = num.toString();
        for (let i = num.length - 3; i > 0; i -= 3) {
            num = num.slice(0, i) + "." + num.slice(i);
        };
        num = num + ' VNĐ';
        return new hbs.SafeString(num)
    }
};
