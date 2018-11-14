// First, some preliminary setup
const $colors = $('#colors-js-puns');
const $creditCard = $('#credit-card');
const $paypal = $('#credit-card').next();
const $bitcoin = $('#credit-card').next().next();

// Initially hide the fields that won't be revealed
// unless a certain option is selected
$('#other-role').prev().hide();
$('#other-role').hide();
$paypal.hide();
$bitcoin.hide();

// Dynamically keep track of cost
let $runningTotal = $(`<span>Total: $ 0 </span>`);
$('.activities').append($runningTotal);

// This function returns the cost of each activity.
function cost(str){
  const amount = str.slice(-3);
  return parseInt(amount);
}

// validate Name input
function invalidName(){
  if ($('#name').val() === ""){
    $('#name').addClass('alert');
    return true;
  } else {
    $('#name').removeClass('alert');
    return false;
  }
}
// validate Email input
function invalidEmail(){
  const emailRegex = /^(\w)+@(\w)+.(\w)+$/;
  const $email = $('#mail').val();
  if(emailRegex.test($email) === false || $email === ""){
    $('#mail').addClass('alert');
    return true;
  } else {
    $('#mail').removeClass('alert');
    return false;
  }
}
// validate Activities input
function invalidActivities(){
  if($('input:checked').length === 0){
    $('.activities legend').addClass('alert-message');
    $runningTotal.addClass('alert-message');
    return true;
  } else {
    $('.activities legend').removeClass('alert-message');
    $runningTotal.removeClass('alert-message');
    return false;
  }
}
// validate credit card input
function creditcardRegexTest() {
  const creditCardRegex = /^(\d){13,16}$/;
  const $creditCard = $('#cc-num').val();
  if(creditCardRegex.test($creditCard) === false){
    $('#cc-num').addClass('alert');
    return true;
  } else {
    $('#cc-num').removeClass('alert');
  }
}
function zipcodeRegexTest() {
  const zipcodeRegex = /^(\d){5}$/;
  const $zipcode = $('#zip').val();
  if(zipcodeRegex.test($zipcode) === false){
    $('#zip').addClass('alert');
    return true;
  } else {
    $('#zip').removeClass('alert');
  }
}
function cvvRegexTest(){
  const cvvRegex = /^(\d){3}$/;
  const $cvv = $('#cvv').val();
  if(cvvRegex.test($cvv) === false){
    $('#cvv').addClass('alert');
    return true;
  } else {
    $('#cvv').removeClass('alert');
  }
}
function invalidCreditCard() {
  if ($('#payment option:selected').val() === "credit card" ||
      $('#payment option:selected').val() === "select_method"){
        const ccError = creditcardRegexTest();
        const zcError = zipcodeRegexTest();
        const cvvError = cvvRegexTest();
        if (ccError || zcError || cvvError){
          return true;
        }


  }
}

/*****************
BASIC INFO SECTION
******************/
// Assign focus to the first input element for better UX
$('#name').focus();

// If the user selects 'Other' for job role,
// show a new input field where they can enter their job title
$('[name="user_title"]').on('change', function(){
  if ($(this).val() === "other"){
    $('#other-role').prev().show();
    $('#other-role').show();
  }
});

/*******************
T-SHIRT INFO SECTION
********************/
// Ensure that the t-shirt color options are consistent with the
// theme option selected under Design
$('[name="user_design"]').on('change', function(){
  if ($(this).val() === "js puns"){
    $('#color option').eq(0).attr('selected', true);
    $('#color option').eq(3).attr('selected', false);
    $('#color').children().show();
    $('#color option').eq(3).hide();
    $('#color option').eq(4).hide();
    $('#color option').eq(5).hide();
  } else if ($(this).val() === "heart js"){
    $('#color option').eq(3).attr('selected', true);
    $('#color option').eq(0).attr('selected', false);
    $('#color').children().show();
    $('#color option').eq(0).hide();
    $('#color option').eq(1).hide();
    $('#color option').eq(2).hide();
  }
});

/******************************
REGISTER FOR ACTIVITIES SECTION
*******************************/
// Prevent users from booking multiple activities for the same time block
$('[type=checkbox]').change(function(){
    const activityName = $(this).attr('name');
    switch (activityName) {
        case "js-frameworks":
          $(this).parent().next().next().toggleClass('unavailable');
          break;
        case "js-libs":
          $(this).parent().next().next().toggleClass('unavailable');
          break;
        case "express":
          $(this).parent().prev().prev().toggleClass('unavailable');
          break;
        case "node":
          $(this).parent().prev().prev().toggleClass('unavailable');
      }
      // Update the total cost based on the user's activities selections
      let total = 0;
      $('[type=checkbox]').each(function(){
        if ($(this).is(':checked')){
          const value = $(this).parent().text();
          const price = cost(value);
          total += price;
        }
      });
      $runningTotal.html(`<span>Total: $ ${total} </span>`);
});

/*******************
PAYMENT INFO SECTION
********************/
// Display relevant payment instructions depending on
// how the user wants to pay
$('[name="user_payment"]').on('change', function(){
  $('#payment option').eq(0).attr('disabled', 'disabled');
  if ($(this).val() === "credit card"){
    $creditCard.show();
    $paypal.hide();
    $bitcoin.hide();
  } else if ($(this).val() === "paypal"){
    $creditCard.hide();
    $paypal.show();
    $bitcoin.hide();
  } else if ($(this).val() === "bitcoin") {
    $creditCard.hide();
    $paypal.hide();
    $bitcoin.show();
  }
});

/***************************************
FORM VALIDATION WHEN THE USER SUBMITS
***************************************/
$('button').on('click', function(e){
  const nameError = invalidName();
  const emailError = invalidEmail();
  const activitiesError = invalidActivities();
  const creditCardError = invalidCreditCard();
  if (nameError || emailError || activitiesError || creditCardError){
    e.preventDefault();
  } else {
    $('form').submit();
  }
})
