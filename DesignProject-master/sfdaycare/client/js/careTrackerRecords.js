Template.careTrackerRecords.helpers({

    displayTrackedRecords: function() {
        var childTrackedRecords = CareTracker.find({ childId: Session.get('childId') });

        return childTrackedRecords;
    }

});

Template.careTrackerRecords.events({
    'click .deleteBtn' : function() {

        var choice = confirm("Are you sure you want to delete this record?");
        if (choice == true){

            Meteor.call('deleteCareTrackRecord', this._id);
            Bert.alert("You successfully deleted the record", "success", "growl-top-right");
        }

    }
});