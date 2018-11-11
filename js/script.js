/*****************
BASIC INFO SECTION
******************/
// First things first! Assign focus to the first input element for better UX
$('#name').focus();

if ($('#name').val() === ""){
  $('#name').addClass('alert');
}

$('#name').on('change', function() {
  if ($('#name').val() !== ""){
    $('#name').removeClass('alert');
  }
})



const emailRegex = /^(\w)+@(\w)+.(\w)+$/;
$('#mail').on('blur change', function() {
  const $email = $('#mail').val();


  if(emailRegex.test($email) === false || $email === ""){

    // cool, now get it to not append multiple times and disappear once the email is valid
    const $emailErrorMessage = $('<span>Please enter a vaild email address</span>');
    $emailErrorMessage.addClass('alert');
    $emailErrorMessage.insertAfter('#mail');

    $('#mail').addClass('alert');

  } else {
    $('#mail').removeClass('alert');
  }
})

// Initially hide the fields that won't be revealed
// unless a certain option is selected
$('#other-role').prev().hide();
$('#other-role').hide();

const $colors = $('#colors-js-puns');
$colors.hide();

const $creditCard = $('#credit-card');
const $paypal = $('#credit-card').next();
const $bitcoin = $('#credit-card').next().next();

$paypal.hide();
$bitcoin.hide();

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
    $colors.show();
    //edit the code below to reflect that we now have a const for this selector
    $('#color').children().show();
    $('#color option').eq(4).hide();
    $('#color option').eq(5).hide();
    $('#color option').eq(6).hide();
  } else if ($(this).val() === "heart js"){
    $('#color').children().show();
    $('#color option').eq(1).hide();
    $('#color option').eq(2).hide();
    $('#color option').eq(3).hide();
  } else {
    $colors.hide();
  }
});

/******************************
REGISTER FOR ACTIVITIES SECTION
*******************************/
let $runningTotal = $(`<span>Total: $ 0 </span>`);
$('.activities').append($runningTotal);

// This function returns the cost of each activity.
function cost(str){
  const amount = str.slice(-3);
  return parseInt(amount);
}

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


$('.activities').on('focusout', function(){
  if($('input:checked').length === 0){
    //fix the appearance but the functionality works
    const $alertMessage = $('<span>You must register for at least one activity</span>');
    $alertMessage.addClass('alert');
    $alertMessage.insertAfter('.activities legend');

  } else {
    $('.activities').removeClass('alert');
  }
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

    // blur doesn't work but focus out does
    // refactor so that each cc related field gets its own focusout listener
    //probably easier with a function

    $creditCard.on('blur change', function() {
      const creditCardRegex = /^(\d){13,16}$/;
      const $creditCard = $('#cc-num').val();

      const zipcodeRegex = /^(\d){5}$/;
      const $zipcode = $('#zip').val();

      const cvvRegex = /^(\d){3}$/;
      const $cvv = $('#cvv');

      if(creditCardRegex.test($creditCard) === false){
        $('#cc-num').addClass('alert');
      } else {
        $('#cc-num').removeClass('alert');
      }

      if(zipcodeRegex.test($zipcode) === false){
        $('#zip').addClass('alert');
      } else {
        $('#zip').removeClass('alert');
      }

      if(cvvRegex.test($cvv) === false){
        $('#cvv').addClass('alert');
      } else {
        $('#cvv').removeClass('alert');
      }

    })

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
