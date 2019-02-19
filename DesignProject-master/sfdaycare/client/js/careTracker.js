Template.careTracker.helpers({

    trackActiveChildren: function(){
        var trackingChild = Children.find({_id: Session.get('childId')});

        return trackingChild;
    },



});


Template.careTracker.events({

    // Event handler for check-in
    'submit .submitTimeIn': function(event) {


        var childId = Session.get('childId');
        var trackDateInVar = event.target.trackDate.value;
        var checkInTimeVar = event.target.timeIn.value;
        var childName = event.target.childName.value;

        // Parse the time parts to integers
        var parts = checkInTimeVar.split(":");
        var checkInMinuteVar = parseInt(parts[1], 10);
        var checkInHourVar = parseInt(parts[0], 10);
        
       Session.set('sendCheckInHourVar',checkInHourVar);

        //DATE STUFF
         var date = new Date();
        var enteredDate = new Date(trackDateInVar);
        var enteredDateToDate = Date.parse(enteredDate);
        var jsDate = Date.parse(date);


        if (enteredDateToDate > jsDate) {
            Bert.alert("Date has not occured yet. Please enter a valid date", "danger", "growl-top-right");
            return false;
        }
        else {

            var id = Session.get('childId');

            var checker = CareTracker.findOne({childId: id ,trackDateIn: trackDateInVar});
     
            if (checker) {
     
             var alreadyExistsChoice = confirm("A record already exists for this child on " + trackDateInVar + "\n\n Click OK to overwrite, or cancel to go back");
                 if(alreadyExistsChoice == true ) {
                 
                
                     var newTotalTime = checker.checkOutHour - checkInHourVar;
                     var choice = confirm("The clock in time entered for " + trackDateInVar + " is:\n\n Time-In: " + checkInTimeVar +
                     "\n\n click OK to continue or cancel to make changes");
     
                     Meteor.call('updateCheckIn', childId, childName, trackDateInVar, checkInTimeVar, checkInHourVar, checkInMinuteVar); 
                     Meteor.call('updateTotalTime',childId,newTotalTime,trackDateInVar); 
                     Bert.alert("Record Saved Successfully!", "success", "growl-top-right");
                 }
     
     
            }
            else { 

                var choice = confirm("The clock in time entered for " + trackDateInVar + " is:\n\n Time-In: " + checkInTimeVar +
                "\n\n click OK to continue or cancel to make changes");
                
                if(choice == true) {
                 Meteor.call('addCheckIn', childId, childName, trackDateInVar, checkInTimeVar, checkInHourVar, checkInMinuteVar);
                 Bert.alert("Time Submitted Successfully", "success", "growl-top-right");
                }
            }
                      
                 return false;






        }
        //END DATE STUFF
        
       
    },


    // Event handler for check-out
    'submit .submitTimeOut': function(event) {


        var childId = Session.get('childId'); 
        var trackDateOutVar = event.target.trackDate.value;
        var checkOutTimeVar = event.target.timeOut.value;

        // Parse the time parts to integers
        var parts = checkOutTimeVar.split(":");
        var checkOutMinuteVar = parseInt(parts[1], 10);
        var checkOutHourVar = parseInt(parts[0], 10); 

        Session.get('sendCheckInHourVar');


        Session.set('sendCheckOutHourVar', checkOutHourVar);

        var sentCheckInHour = parseInt(Session.get('sendCheckInHourVar'));



        var totalHoursVar = checkOutHourVar - sentCheckInHour;

        if(totalHoursVar <= 0)
        {
            Bert.alert("Invalid time: total hours tracked is  0 or less\nTime-Out was not saved", "danger", "growl-top-right");
            return false;
        }
        else {
                    
            var id = Session.get('childId');

            var checker = CareTracker.findOne({childId: id ,trackDateOut: trackDateOutVar});
            // if it finds a record with a time out date 
            if(checker) {


                var overwriteChoice = confirm("A record already exists for this child on " + trackDateOutVar + "\n\n Click Ok to overwrite, or cancel to go back");
                
                if (overwriteChoice == true) {

                    Meteor.call('updateCheckOut', childId, trackDateOutVar, checkOutTimeVar, checkOutHourVar, checkOutMinuteVar, totalHoursVar); 
                    var newTotalTime =  checkOutHourVar-checker.checkInHour;
                    Meteor.call('updateTotalTime',childId,newTotalTime,trackDateOutVar); 
                    Bert.alert("Time-Out Successfully Overwritten", "success", "growl-top-right");
                }
            }
            else {

                //if we DON'T find a record with a time out on this date:

                var  checkIfTimeIn = CareTracker.findOne({childId: id ,trackDateIn: trackDateOutVar});
                
                if(checkIfTimeIn) {
                            

                    var choice = confirm("The clock-out time entered for " + trackDateOutVar + " is: " + 
                                         "\n\nTime-Out: " + checkOutTimeVar + "\n\nThe total hours for the day is: " + totalHoursVar +
                                         "\n\n click OK to contiue or cancel to make changes");
                    if (choice == true) {
                        
                       

                        Meteor.call('addCheckOut', childId, trackDateOutVar, checkOutTimeVar, checkOutHourVar, checkOutMinuteVar, totalHoursVar);

                        
         var checkHours = Children.findOne({_id: childId});


         //============================ METHOD STUFF I JUST COPIEDDDDDDDDDDD  ==========================
         if(checkHours.totalHours > 50)
         {

           Children.update({_id: childId}, { $inc: { currentBalance: +25 }});
           
   
                   alert("TOTAL HOURS OF CARE HAS EXCEEDED 50\n\n AN EXTRA $25 HAS BEEN ADDED TO THE BALANCE",
                       "success", "growl-top-right");
         }
//      ====================================================================================
                        Bert.alert("Time Submitted Successfully", "success", "growl-top-right");
                    }
                }
                else {
                
                    Bert.alert("No Check-In record found for that date \n Check-Out Not Saved" , "danger", "growl-top-right");
                
                }

                }
        }// END TOTALHOURS ELSE STATEMENT

//  



        return false;
    },


    'click .viewTimes' : function() {


    }
});






// Validation Rules

// Makes sure the form isnt empty
var emptyInputCheck = function(value){
    if (value && value !== ''){
        return true;
    }
    Bert.alert("Please fill in all required fields", "danger", "growl-top-right");
    return false;
}


function calcHours(inputtedTime){

          // Parse the time parts to integers
          var parts = inputtedTime.split(":");

          var minutes = parseInt(parts[1], 10);
          var hour = parseInt(parts[0], 10);
     


     

}

