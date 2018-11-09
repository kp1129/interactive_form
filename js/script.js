/****************************************
          Treehouse Techdegree
    FSJS project 3 - Interactive Form
****************************************/

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

////////////////////////////
const $runningTotal = $('<span>Total: </span>');
$('.activities').append($runningTotal);

function cost(str){
  const amount = str.slice(-3);
  return parseInt(amount);
}
///////////////////////////

// Ensure that users don't accidentally sign up for activities that take place
// at the same time
$('[type=checkbox]').change(function(){
    const activityName = $(this).attr('name');
    const value = $(this).val();
    switch (activityName) {
      case "all":
      //figure out how to get the content from checkbox inputs
      //then run function cost on each string, and either add or subtract
      //from total depending on whether or not the box is checked



        //////
        break;
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
});

// Keep a running total
