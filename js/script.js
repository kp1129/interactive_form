/*****************
BASIC INFO SECTION
******************/
// First things first! Assign focus to the first input element for better UX
$('#name').focus();

// Initially hide the fields that won't be revealed
// unless a certain option is selected
$('#other-role').prev().hide();
$('#other-role').hide();

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
    $('#color').children().show();
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

/*******************
PAYMENT INFO SECTION
********************/
