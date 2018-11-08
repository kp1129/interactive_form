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
// show an input field where they can enter their job title
$('[name="user_title"]').on('change', function(){
  if ($(this).val() === "other"){
    $('#other-role').prev().show();
    $('#other-role').show();
  }
});
