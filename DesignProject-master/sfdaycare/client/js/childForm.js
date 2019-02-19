Template.childProf.events({
    'submit form': function(event)
    {
        //prevent default browser form execution
        //event.preventDefault();

        var childFNameVar = event.target.childFName.value;
        var childLNameVar = event.target.childLName.value;
        var enrollDateVar = event.target.enrollDate.value;       
        var childStatusVar = event.target.childStatus.value;
        var childDOBVar = event.target.DOB.value;
        var dietNeedsVar = event.target.dietNeeds.value;
        var specialCareVar = event.target.specialCare.value;
        var allergiesVar = event.target.allergies.value;
        var guardianFNameVar = event.target.guardianFName.value;             
        var guardianLNameVar = event.target.guardianLName.value;
        var approvedPUGuardianVar = event.target.approvedPUGuardian.value;
        var primaryPhoneVar = event.target.primaryPhone.value;
        var emergencyPhoneVar = event.target.emergencyPhone.value;
        var emailAddressVar = event.target.emailAddress.value;
        var streetAddressVar = event.target.streetAddress.value;
        var secondAddressVar = event.target.address2.value;
        var cityVar = event.target.city.value;
        var zipCodeVar = event.target.zipCode.value;
        var stateVar = event.target.state.value;

       

        

        
        // Form submission handler
        if(emptyInputCheck(childFNameVar) &&
            emptyInputCheck(childLNameVar) &&

            emptyInputCheck(childDOBVar) &&
            isValidBirthDate(childDOBVar) &&

            emptyInputCheck(enrollDateVar) &&
            isValidEnrollDate(enrollDateVar) &&

            emptyInputCheck(guardianFNameVar) &&
            emptyInputCheck(guardianLNameVar) &&

            emptyInputCheck(primaryPhoneVar) &&
            phoneIsValid(primaryPhoneVar) &&
            
            emptyInputCheck(emailAddressVar) && 
            emailIsValid(emailAddressVar) &&
            
            emptyInputCheck(streetAddressVar) &&
            emptyInputCheck(cityVar) &&
            emptyInputCheck(zipCodeVar) &&
            emptyInputCheck(stateVar) ) {

                Meteor.call('addChild',childFNameVar, childLNameVar, enrollDateVar,
                            childStatusVar, childDOBVar, dietNeedsVar, specialCareVar,
                            allergiesVar, guardianFNameVar, guardianLNameVar,approvedPUGuardianVar,
                            primaryPhoneVar, emergencyPhoneVar, emailAddressVar,
                            streetAddressVar, secondAddressVar, cityVar, stateVar, zipCodeVar);

                 
                Bert.alert("Child Added Successfully!" , "success", "growl-top-right");
            
                // Clear all fields after successful submission
                event.target.childFName.value ="";
                event.target.childLName.value ="";
                event.target.enrollDate.value ="";
                event.target.DOB.value ="";
                event.target.dietNeeds.value ="";
                event.target.specialCare.value ="";
                event.target.allergies.value ="";
                event.target.guardianFName.value ="";             
                event.target.guardianLName.value ="";
                event.target.approvedPUGuardian.value ="";
                event.target.primaryPhone.value ="";
                event.target.emergencyPhone.value ="";
                event.target.emailAddress.value ="";
                event.target.streetAddress.value ="";
                event.target.city.value ="";
                event.target.zipCode.value ="";

     

            }
        else {
          //  Bert.alert("Something went wrong", "danger", "growl-top-right");
        }
        return false;
    },



});

// Validation Rules

// None of the special characters should go through
// Trim Helper
var trimInput = function(val){
    return val.replace(/^\s*|\s*$/g, "");
}

// Makes sure the form isnt empty
var emptyInputCheck = function(value){
    if (value && value !== ''){
        return true;
    }
    Bert.alert("Please fill in all required fields", "danger", "growl-top-right");
    return false;
}

// Validate Email
emailIsValid = function(value){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // If the user entered correct format, return true - submit the form   
    if(filter.test(value)){
        return true;
    }
    Bert.alert("Please use a valid email address", "danger", "growl-top-right");
    return false;
};

phoneIsValid = function(value){
  //  var phonefilter = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
      var phonefilter = /^\d{3}-\d{3}-\d{4}$/;
    if (phonefilter.test(value)){
        return true;
    }
    Bert.alert("The phone number entered is in the incorrect format", "danger", "growl-top-right");
    return false;
}



ageIsValid = function(value){

}



function isValidBirthDate(inputtedDate)
{
    // First check for the pattern
    if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(inputtedDate))
    {
        return false;
    }
      // Parse the date parts to integers
     var parts = inputtedDate.split("-");
     var birthDay = parseInt(parts[2], 10);
     var birthMonth = parseInt(parts[1], 10);
     var birthYear = parseInt(parts[0], 10);

    // Grab current date info
    var date = new Date();
    var curDay = date.getDate();
    var curMonth = date.getMonth() + 1;
    var curYear = date.getFullYear();


// ==============================  IF THE USER TRIES TO INPUT BIRTHDATES IN THE FUTURE ==========================================
    if(birthYear > curYear)
    {
        // if the birth year is greater than the current year
        Bert.alert("birth date invalid - birth date is greater than the current date", "danger", "growl-top-right");
        return false;
    }
    if(birthYear == curYear && birthMonth > curMonth)
    {
        // if the year is the same, but the selected month is anywhere after the current month
        Bert.alert("birth date invalid - birth date is greater than the current date" , "danger", "growl-top-right");
        return false;
    }
    if(birthYear == curYear && birthMonth == curMonth && birthDay > curDay)
    {
        // if year is same, month is same, but selected day is greater than the current day
        Bert.alert("birth date invalid - birth date is greater than the current date", "danger", "growl-top-right");
        return false;
    }

// ==============================================================================================================================

    if (birthYear <= curYear-6)
    {
        //if the birth year is 6 years in the past - the child is too old
        Bert.alert("birth date invalid - child is older than 6 years old", "danger", "growl-top-right");
        return false;
    }

    if( birthYear == curYear && birthMonth == curMonth - 1 && curDay - birthDay < 0 )
    {
        // if same year, and birth month is the month before the current month, and the difference of the current day to the birth day
        // is less than 0
        Bert.alert("birth date invalid - child less than 1 month old", "danger", "growl-top-right");
        return false;
    }


    // THIS ONE HAD THE DATE BUG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if( birthMonth == 12 && curMonth == 1 && curYear == birthYear+1 && curDay - birthDay < 0)
    {
        //HANDLING DECEMBER TO JANUARY
        Bert.alert("birth date invalid - child less than 1 month old", "danger", "growl-top-right");
        return false;

    }

    if( birthYear == curYear && birthMonth == curMonth && curDay - birthDay <= 28)
    {
        // if the child was born in the same year and month, but they havent been born for longer than 30 days
        Bert.alert("birth date invalid - child less than 1 month old", "danger", "growl-top-right"); 
        return false;
    }

    return true;
    
};

function isValidEnrollDate(inputtedDate) {

    // First check for the pattern
    if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(inputtedDate))
    {
        
        return false;
    }
      // Parse the date parts to integers
     var parts = inputtedDate.split("-");
     var enrollDay = parseInt(parts[2], 10);
     var enrollMonth = parseInt(parts[1], 10);
     var enrollYear = parseInt(parts[0], 10);

    // Grab current date info
    var date = new Date();
    var curDay = date.getDate();
    var curMonth = date.getMonth() + 1;
    var curYear = date.getFullYear();

// =========================== IF THE USER ENTERS AN ENROLLMENT DATE MORE THAN A MONTH IN THE PAST ===========================
    
    if(enrollYear < curYear && curMonth == 1 && enrollMonth < 12)
    {
        // HANDLING DECEMBER TO JANUARY
        // if enrollment year is before the current year, and the current month is january, and the enroll month is November or before
        Bert.alert("enroll date invalid - date is more than a month in the past", "danger", "growl-top-right");
        return false; 
    }

    if(enrollYear < curYear && curMonth != 1)
    {
        // if year is less than current year and the current month is NOT  January
        Bert.alert("enroll date invalid - date is more than a month in the past", "danger", "growl-top-right");
        return false;
    }

    if(enrollYear == curYear && enrollMonth < curMonth -1)
    {
        //if the the desired enrollment month is more than a month behind the current month
        Bert.alert("enroll date invalid - date is more than a month in the past", "danger", "growl-top-right");
        return false;
    }

// ===========================================================================================================================


// =================================== IF USER ENTERS AN ENROLLMENT DATE  MORE THAN A MONTH IN THE FUTURE ====================

    if(enrollYear > curYear && enrollMonth != 1)
    {
        // HANDLING DECEMBER TO JANUARY
        // if enroll year is greater than the current year, and the current month is NOT January
        Bert.alert("enroll date invalid - date is more than a month in the future", "danger", "growl-top-right");
        return false;
    }

    if(enrollMonth > curMonth + 1)
    {
        // if enroll month is more than a month in the future
        Bert.alert("enroll date invalid - date is more than a month in the future");
        return false;
    }

    return true;

};