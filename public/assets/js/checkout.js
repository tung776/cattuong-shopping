Stripe.setPublishableKey('pk_test_YoPwx3OqaMKKdZN32mWFDhoD');
console.log("service connected");
var $form = $("#checkout-form");

$form.submit(function(event){
    // console.log("go here");
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
      number: $('#card-number').val(),
      cvc: $('#card-cvc').val(),
      exp_month: $('#card-expiry-month').val(),
      exp_year: $('#card-expiry-year').val(),
      name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

/*
Phương thức callback stripeResponseHandler trả về hai đối số status và respone.
Trong đó phương thức responne có định dạng json như sau:
{
  id: "tok_8DPg4qjJ20F1aM", // Token identifier
  card: { // Dictionary of the card used to create the token
    name: null,
    address_line1: "12 Main Street",
    address_line2: "Apt 42",
    address_city: "Palo Alto",
    address_state: "CA",
    address_zip: "94301",
    address_country: "US",
    country: "US",
    exp_month: 2,
    exp_year: 2018,
    last4: "4242",
    object: "card",
    brand: "Visa",
    funding: "credit"
  },
  created: 1493204031, // Timestamp of when token was created
  livemode: true, // Whether this token was created with a live API key
  type: "card",
  object: "token", // Type of object, always "token"
  used: false // Whether this token has been used
}

*/
function stripeResponseHandler(status, response) {

  // Grab the form:
  var $form = $('#checkout-form');

  if (response.error) { // Problem!
    
    // Show the errors on the form
    $form.find('#payment-errors').text(response.error.message);
     $form.find('#payment-errors').removeClass('hidden');
    $form.find('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!
    console.log(JSON.stringify(response));
     $form.find('#payment-errors').addClass('hidden');
    // Get the token ID:
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    $form.get(0).submit();

  }
}
