$/*("#customerButton").click(() =>{
    //const customer = document.getElementById("customer").value;
    const customerModal = $("#customerModal");
    const CustomerInput = $("#customerInfo");
    $.ajax({
        url: '/orders/list',
        contentType: 'application/json',
        success: res =>{
            customerModal.find("#name").text(CustomerInput.find("#name").val());
            customerModal.find("#address").text(CustomerInput.find("#address").val());
            customerModal.find("#sdt").text(CustomerInput.find("#sdt").val());
            customerModal.find("#email").text(CustomerInput.find("#email").val());
            console.log("abc");
            customerModal.modal('show');
        }
    });
});*/

function get_ID_Order(index){
    const id = "#idOrder" + index;
    return $('#body-order').find(id);
}

$('button[id^="customerButton"]').on('click', function (e) {
    const customerModal = $("#customerModal");
    const idOrder = get_ID_Order($(this).val());
    const toURL = '/orders/list/customerInfo/' + idOrder.text();
    $.ajax({
        url: toURL,
        contentType: 'application/json',
        method: 'GET',
        dataType: 'json',
        success: res =>{
            customerModal.find("#name").text(res.infoCustomer.name);
            customerModal.find("#address").text(res.infoCustomer.address);
            customerModal.find("#email").text(res.infoCustomer.email);
            customerModal.find("#sdt").text(res.infoCustomer.sdt);
        }
    });
});

$('button[id^="productButton"]').on('click', function (e) {
   const productModal = $('#productModal');
   const isOrder = get_ID_Order($(this).val());
   const toURL = '/orders/list/productInfo/' + isOrder.text();

   $.ajax({
      url: toURL,
      method: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: res =>{
          res.productList.forEach(product => {
             productModal.find('tbody').append('<tr> ' +
                 '<td>' + product._id + '</td> ' +
                 '<td>' + product.name + '</td> ' +
                 '<td>' + product.price + '</td> ' +
                 '<td>' + product.quantity + '</td> ' +
                 '</tr>');
          });
      }
   });
});


$('#customerModal').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal');
});

$('#productModal').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal');
    $(this).find('tbody').html('');
});

$("input[id='email']").on('blur', () => {
    const email = $('input[id="email"]').val();
    const alert = $('.card.card-body').find('.alert.alert-warning.alert-dismissible.fade.show');
    if (email == '')
    {
        return;
    }

    $.ajax({
        url:'/admin/register/check-email-available',
        type:'POST',
        data: {
            'email' : email
        },
        success: (res) => {
            if (res.isAvailable == false) {
                if (alert.exists() == true) {
                    alert.hide();
                }
            }
            else {
                if (alert.exists() == false) {
                    $('.card.card-body').prepend('<div class="alert alert-warning alert-dismissible fade show" role="alert">'
                        + 'Email này đã tồn tại' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span></button></div>');
                }
                else
                {
                    alert.show();
                }
            }
        }
    })
});

function changeBlockUser(index, href){
    const id = '#block' + index;
    $.ajax({
        url: href,
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: res =>{

            if(res.isBlocked)
            {
                $(id).append('<i class="fas fa-lock" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock-open').remove();

            }
            else
            {
                $(id).append('<i class="fas fa-lock-open" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock').remove();
            }
        }
    });
};

function changeStatusProduct(index, href){
    const id = '#block' + index;
    $.ajax({
        url: href,
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        success: res =>{

            if(res.isOn)
            {
                $(id).append('<i class="fas fa-lock-open" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock').remove();
            }
            else
            {
                $(id).append('<i class="fas fa-lock" aria-hidden="true"></i>');
                $(id).find('.fas.fa-lock-open').remove();
            }
        }
    });
};

$.fn.exists = function () {
    return this.length !== 0;
};


