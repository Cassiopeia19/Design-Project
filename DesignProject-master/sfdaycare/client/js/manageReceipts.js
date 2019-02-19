Template.manageReceipts.events({
 

    // Clicked Delete Button
    'click .deleteBtn': function () {

        var choice = confirm("Are you sure you want to delete this record?");
        if (choice == true) {

            Meteor.call('deleteReceipts', this._id);
            Bert.alert("You successfully deleted the record", "success", "growl-top-right");
        }
    },
})




Template.manageReceipts.events({
    'click #check': function (e) {
        var userId = Meteor.user()._id;
        var isChecked = e.target.checked;


        if (isChecked == true) {


        }
        Meteor.users.update({ _id: userId }, { $set: { "profile.isChecked": isChecked } });
    }
})

Template.manageReceipts.helpers({
    isChecked: function () {
        return Meteor.user().profile.isChecked;
        
    }
})








Template.manageReceipts.created = () => {
    var date = Router.current().params.date;
    var datee = Router.current().params.datee;
    var type = Router.current().params.type;


    if (date == 0 && datee == 0 && type !== "All Receipts") {


        Template.manageReceipts.helpers({
            receipts: function () {
                return Receipts.find(
                    {


                        ReceiptType: type

                    },
                    { sort: { createdAt: 1 } });
            }
        });
    } else if (date != 0 && datee !=0 && type == "All Receipts") {


        Template.manageReceipts.helpers({
            receipts: function () {
                return Receipts.find({
                    ReceiptDate: { $gte: date },
                    ReceiptDate: { $lte: datee }
                },
                    { sort: { createdAt: 1 } });
            }
        });

    } else if (date == 0 && datee == 0 && type == "All Receipts") {

        Template.manageReceipts.helpers({
            receipts: function () {
                return Receipts.find();
            }
        });

    } else if (date != 0 && datee != 0 && type != "All Receipts") {

        Template.manageReceipts.helpers({
            receipts: function () {
                return Receipts.find({
                    ReceiptDate: date,
                    ReceiptType: type
                },
                    { sort: { createdAt: 1 } });
            }
        });
    

 
    }// JAKARI'S CODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
     else if (date != 0 && datee != 0 && type != "All Receipts") {

        Template.manageReceipts.helpers({
            receipts: function () {
                return Receipts.find({
                    ReceiptDate: { $gte: date },
                    ReceiptDate: { $lte: datee },
                    ReceiptType: type
                },
                { sort: { createdAt: 1 } });
            }
        });
     

        }
}


// if (Meteor.isClient) {

//     Meteor.subscribe("receipts");
// }
