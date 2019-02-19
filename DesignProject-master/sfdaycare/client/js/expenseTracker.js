
Template.expenseTracker.events({
    'submit form': function (event) {
        //prevent default browser form execution
        //event.preventDefault();

        var ReceiptTypeVar = event.target.ReceiptType.value;
        var ReceiptTotalVar = event.target.ReceiptTotal.value;
        var ReceiptDateVar = event.target.ReceiptDate.value;
        var ReceiptNotesVar = event.target.ReceiptNotes.value;

        
        // Empty form subission handler
        if (emptyInputCheck(ReceiptTypeVar) &&
            emptyInputCheck(ReceiptTotalVar) &&
            emptyInputCheck(ReceiptDateVar) &&
            emptyInputCheck(ReceiptNotesVar)) {

            Meteor.call('addReceipts', ReceiptTypeVar, ReceiptTotalVar, ReceiptDateVar, ReceiptNotesVar);
            Bert.alert("Receipts Added Successfully!", "success", "growl-top-right");

            // CLear all fields after succeussful submission
            // event.target.ReceiptType.value = "";
            // event.target.ReceiptTotal.value = "";
            // event.target.ReceiptDate.value = "";
            // event.target.ReceiptNotes.value = "";

        }
        else {
            Bert.alert("Something went wrong", "danger", "growl-top-right");
        }
        return false;

    },
});




// Validation Rules

// None of the special characters should go through
// Trim Helper
var trimInput = function (val) {
    return val.replace(/^\s*|\s*$/g, "");
}

// Makes sure the form isnt empty
var emptyInputCheck = function (value) {
    if (value && value !== '') {
        return true;
    }
    Bert.alert("Please fill in all required fields", "danger", "growl-top-right");
    return false;
}

// Validate Email
emailIsValid = function (value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // If the user entered correct format, return true - submit the form   
    if (filter.test(value)) {
        return true;
    }
    Bert.alert("Please use a valid email address", "danger", "growl-top-right");
    return false;
};



if (Meteor.isServer) {
    Meteor.publish("receipts", function () {
        return Receipts.find();
    });
}

if (Meteor.isClient) {

    Meteor.subscribe("receipts");

    Template.manageReceipts.helpers({
        receipts: function () {
            return Receipts.find({},
                { sort: { createdAt: 1 } });
        }
    });
}





Template.expenseTracker.events({
    'click .ManageReceipts': function (event) {

        var enteredDate = document.getElementById('SearchDate').value;
        var enteredDate1 = document.getElementById('SearchDate1').value;//
        var enteredType = document.getElementById('SearchType').value;

        //if (enteredDate && enteredType) {
        //    Router.go('/manage-receipts/' + enteredDate + '/' + enteredType);

        if (enteredDate && enteredDate1 && enteredType) {//
            Router.go('/manage-receipts/' + enteredDate + '/' + enteredDate1 + '/' + enteredType);//

        } else if (enteredType) {
            Router.go('/manage-receipts/' + 0 + '/' + 0 + '/' + enteredType);

        } else {
            Router.go('/manage-receipts/' + enteredDate + '/' + enteredDate1 + '/' + 0);

        }

    }
})