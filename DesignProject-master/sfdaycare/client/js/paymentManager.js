Template.paymentManager.helpers({
    displayStuff: function() {

         var displayChildInfo = Children.find({_id: Session.get('childId')});


         return displayChildInfo;

        // var stuff = CareTracker.find();

        // return stuff;
    }


});

Template.paymentManager.events({


    'submit .adjustCurBal' : function(event) {

        var childId = Session.get('childId');
        var curBalanceVar = event.target.currentBalance.value;
        var amountPaidVar = event.target.paymentAmount.value;
        var totalHoursVar = event.target.totalHours.value;
        var newBalance = curBalanceVar -amountPaidVar ;


        var parsedAmount = parseFloat(amountPaidVar);
        var parsedCurBal = parseFloat(curBalanceVar);

        //If the child has no balance on them
        if(curBalanceVar == 0){
            Bert.alert("ERROR: The current balance is 0", "danger", "growl-top-right");

        }
        else{ //If the child has a balance on them

                // if the amount paid is greater than the current balance
                // if(amountPaidVar > curBalanceVar) {
                //     Bert.alert("ERROR: Payment amount greater than current balance", "danger","growl-top-right");
                //     return false;
                // }
                if(parsedAmount > parsedCurBal) {
                    Bert.alert("ERROR: Payment amount greater than current balance", "danger","growl-top-right");
                    return false;
                }

            Meteor.call('updateChildCare', childId, newBalance);
            Bert.alert("Payment Submitted Successfully" , "success", "growl-top-right");
            return false;
        }
        
        event.target.paymentAmount.value ="";
        return false;

    },
    
    
    'click .sendEmailInvoice' : function() {

        var childId = Session.get('childId');

        Meteor.call('sendEmailInvoice', childId);
        Bert.alert("Invoice sent successfully!\nCheck your Google Inbox for details", "success", "growl-top-right");
    }

});