Template.dailyActivityReport.helpers({

    displayChildName: function(){ 

        var displayedChild = Children.find({_id: Session.get('childIdReport')});

        return displayedChild;
    }

});


Template.dailyActivityReport.events({

    'submit form' : function(event) {
        var childId = Session.get('childIdReport');
        
        var senderEmailAddress = "spanglerfdc@gmail.com";
        var recipient = event.target.email.value;
        var emailSubject = event.target.sub.value;         
        var emailBody = event.target.reportContent.value;

        if(emailIsValid(recipient) &&
           emptySubjectCheck(emailSubject) &&
           emptyBodyCheck(emailBody) ){

            Meteor.call('sendEmail', childId, senderEmailAddress, recipient, emailSubject, emailBody );
            Bert.alert("Email Sent!", "success", "growl-top-right");
           }

        return false;
    }

});


// Validation Rules

// Validate Email
emailIsValid = function(value){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // If the user entered correct format, return true - submit the form   
    if(filter.test(value)){
        return true;
    }
    Bert.alert("Please enter a valid email address", "danger", "growl-top-right");
    return false;
};

// Makes sure the subject isnt empty
var emptySubjectCheck = function(value){
    if (value && value !== ''){
        return true;
    }
    Bert.alert("Please enter a subject in the subject field", "danger", "growl-top-right");
    return false;
}

emptyBodyCheck = function(value){
    if (value && value !== ''){
        return true;
    }
    Bert.alert("Please enter a message in the body", "danger", "growl-top-right");
    return false;    
}