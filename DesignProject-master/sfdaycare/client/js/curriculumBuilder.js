Template.curriculumBuilder.helpers({

    displayAllCurriculum : function() {
        var listAllCurriculum = Curriculum.find();
        return listAllCurriculum;
    }

});

Template.curriculumBuilder.events({

    'submit .saveCurric' : function(event) {

        var curriculumNameVar = event.target.curriculumName.value;
        var curriculumDateVar = event.target.dateCurriculumCreated.value;
        var curriculumContentVar = event.target.curriculumContent.value;

        Meteor.call('addCurriculum', curriculumNameVar, curriculumDateVar, curriculumContentVar);
        Bert.alert("Curriculum Added Successfully", "success", "growl-top-right");

        return false;
    },

    'click .deleteBtn' : function() {
        var choice = confirm("Are you sure you want to delete this record?\n\n" +
                              "Click Ok to delete, or cancel to return to the page");
        
        if (choice == true) {
            Meteor.call('deleteCurriculumRecord', this._id);
            Bert.alert("You successfully deleted the record", "success", "growl-top-right");
        }
    },


    'click .editCurriculum' : function() {

        Session.set('curriculumId', this._id);

    },


});