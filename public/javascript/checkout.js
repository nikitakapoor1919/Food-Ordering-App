Stripe.setPublishableKey('pk_test_51HtYXcJra8DO8q6GttkFBz1ydWpj8GmzqZqTFuv1QT7vR92dnqQOmpsUbwMy4RUwVbMDPM0FiB7i0BPfbk949b8R00vtIGI9pW');

var $form = $('#checkout-form');
console.log('hi');
$form.submit(function(event) {
    $('#charge-error').addClass('invisible');
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#name').val(),
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {

    if (response.error) { // Problem!

        // Show the errors on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('invisible');
        $form.find('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}