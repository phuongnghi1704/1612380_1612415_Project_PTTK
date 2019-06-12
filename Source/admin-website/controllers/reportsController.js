const productDao = require('../models/dao/productDao');
const Product = require('../models/product');

exports.report_item = async (req,res) =>
{
    const name = req.user.info.name;
    let productList = await productDao.get_Top_10_Sold();

    productList.forEach(product => {
       product.price = product.price * product.sale;
    });

    const currentDate = new Date();
    const dateTime = "Last updated at " + currentDate.getHours() + ":"
                                        + currentDate.getMinutes() + " "
                                        + currentDate.getDate() + "/"
                                        + (currentDate.getMonth() + 1) + "/"
                                        + currentDate.getFullYear();

    res.render('report/items', { pageTitle: 'Thống kê sản phẩm và doanh thu',
    nameAdmin: name,
    productList: productList,
    datetime: dateTime});
};

exports.report_profit=function(req,res)
{
    const name = req.user.info.name;
    res.render('report/profit', { pageTitle: '',
    nameAdmin: name});
};