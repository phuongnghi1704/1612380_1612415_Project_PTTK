function get_ID_Order(index){
    const id = "#idOrder" + index;
    return $('#body-order').find(id);
}

$('button[id^="cartButton"]').on('click', function (e) {
    const cartModal = $('#cartModal');
    const idOrder = get_ID_Order($(this).val());
    const toURL = '/orders/list/cartInfo/' + idOrder.text();

    $.ajax({
        url: toURL,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: res =>{
            for(var product in res.cart.items)
            {
                console.log(product.item);
            }
            /*res.cart.items.forEach(product => {
                console.log(product);
                cartModal.find('tbody').append('<tr> ' +
                    '<td>' + product.item.name + '</td> ' +
                    '<td>' + product.price + '</td> ' +
                    '<td>' + product + '</td> ' +
                    '</tr>');
            });*/
        }
    });
});

$('button[id^="receiverButton"]').on('click', function (e) {
    const receiverModal = $("#receiverModal");
    const idOrder = get_ID_Order($(this).val());
    const toURL = '/orders/list/receiverInfo/' + idOrder.text();
    $.ajax({
        url: toURL,
        contentType: 'application/json',
        method: 'GET',
        dataType: 'json',
        success: res =>{
            receiverModal.find("#receiverName").text(res.name);
            receiverModal.find("#receiverAddress").text(res.address);
            receiverModal.find("#receiverEmail").text(res.email);
            receiverModal.find("#receiverSDT").text(res.sdt);
        }
    });
});