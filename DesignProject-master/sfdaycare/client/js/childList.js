Template.childList.helpers({
    listActiveChildren: function() {
        var listAChildren = Children.find({status: "active"},{ sort: {childFirstName: 1}});
        //Users.find({}, { sort: { createdAt: -1 } });

        return listAChildren;
    },

    listInactiveChildren: function() {
        var listIChildren = Children.find({status: "inactive"});
        return listIChildren;
    }
});

Template.childList.events({

    // Clicked Delete Button
    'click .deleteBtn': function() {

        var choice = confirm("Are you sure you want to delete this record?");
        if (choice == true){

            Meteor.call('deleteChild', this._id);
            Bert.alert("You successfully deleted the record", "success", "growl-top-right");
        }
    },

    // Clicked Edit Button
    'click .editMe': function() {

      Session.set('childId',this._id);
            
    },

    // Clicked Daily Activity Report Button
    'click .dailyActivityReportBtn' : function() {

        Session.set('childIdReport',this._id);   
    
    },

    // Clicked Time-In/out button
    'click .trackTimeBtn': function() {

        Session.set('childId',this._id);
        
    },

    //Clicked Payment Manager Button

    'click .paymentManagerBtn' : function() { 
        Session.set('childId', this._id);
    }
    
});


Template.editChild.helpers({
    editSelectedChild: function(){

    }
});

