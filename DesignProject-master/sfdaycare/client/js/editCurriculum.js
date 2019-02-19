Template.editCurriculum.helpers({

    editSelectedCurriculum: function() {

          var selectedCurriCulum = Curriculum.find({_id: Session.get('curriculumId')});

          return selectedCurriCulum;  
    }


});

Template.editCurriculum.events({

    'submit form': function(event) {

        var curriculumId = Session.get('curriculumId');

        var curriculumNameVar = event.target.curriculumName.value;
        var curriculumDateVar = event.target.dateCurriculumCreated.value;
        var curriculumContentVar = event.target.curriculumContent.value;

        Meteor.call('editCurriculum', curriculumId, curriculumNameVar, curriculumDateVar, curriculumContentVar);
        Bert.alert("Changes Saved Successfully!", "success", "growl-top-right");

        return false;
    }

});