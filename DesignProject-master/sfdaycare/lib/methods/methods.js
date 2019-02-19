Meteor.methods({


    'addChild' : function(childFNameVar, childLNameVar,enrollDateVar, childStatusVar, childDOBVar,
                          dietNeedsVar,specialCareVar, allergiesVar, guardianFNameVar, guardianLNameVar,
                          approvedPUGuardianVar, primaryPhoneVar, emergencyPhoneVar, emailAddressVar,
                          streetAddressVar, secondAddressVar, cityVar, stateVar, zipCodeVar ){

        
        
        Children.insert({
            //child info
            childFirstName: childFNameVar,
            childLastName:  childLNameVar,
            enrollDate: enrollDateVar,
            status: childStatusVar,
            DOB: childDOBVar,
            dietNeeds: dietNeedsVar,
            specialCare: specialCareVar,
            allergies: allergiesVar,

            //guardian info
            guardianFirstName: guardianFNameVar,
            guardianLastName: guardianLNameVar,
            approvedPickupGuardian: approvedPUGuardianVar,

            //contact info
            primaryPhone: primaryPhoneVar,
            emergencyPhone: emergencyPhoneVar,
            emailAddress: emailAddressVar,

            //address info
            streetAddress: streetAddressVar,
            secondAddress: secondAddressVar,
            city: cityVar,
            state: stateVar,
            zipCode: zipCodeVar,

            currentBalance: 0,
            totalHours: 0
  
        });
    },

    'editChild' : function(childId,childFNameVar, childLNameVar, enrollDateVar, childStatusVar, childDOBVar,
                            dietNeedsVar,specialCareVar, allergiesVar, guardianFNameVar, guardianLNameVar,
                            approvedPUGuardianVar, primaryPhoneVar, emergencyPhoneVar, emailAddressVar,
                            streetAddressVar, secondAddressVar, cityVar, stateVar, zipCodeVar) {
                                
        Children.update({_id: childId },{ $set: { childFirstName : childFNameVar }});
        Children.update({_id: childId}, { $set: { childLastName: childLNameVar }}); 
        Children.update({_id: childId}, { $set: { enrollDate : enrollDateVar }});
        Children.update({_id: childId}, { $set: { status: childStatusVar}});
        Children.update({_id: childId}, { $set: { DOB: childDOBVar }});
        Children.update({_id: childId}, { $set: { dietNeeds: dietNeedsVar }});
        Children.update({_id: childId}, { $set: { specialCare: specialCareVar }});
        Children.update({_id: childId}, { $set: { allergies: allergiesVar }});
        Children.update({_id: childId}, { $set: { guardianFirstName: guardianFNameVar }});
        Children.update({_id: childId}, { $set: { guardianLastName: guardianLNameVar }});
        Children.update({_id: childId}, { $set: { approvedPickupGuardian: approvedPUGuardianVar }});
        Children.update({_id: childId}, { $set: { primaryPhone: primaryPhoneVar }});
        Children.update({_id: childId}, { $set: { emergencyPhone: emergencyPhoneVar }});
        Children.update({_id: childId}, { $set: { emailAddress: emailAddressVar }});
        Children.update({_id: childId}, { $set: { streetAddress: streetAddressVar }});
        Children.update({_id: childId}, { $set: { secondAddress: secondAddressVar }});
        Children.update({_id: childId}, { $set: { city: cityVar }});
        Children.update({_id: childId}, { $set: { state: stateVar }});
        Children.update({_id: childId}, { $set: { zipCode: zipCodeVar }});


    },

    'deleteChild' : function(childId){

        Children.remove(childId);
},
        

// ============================= Care Tracker Methods ==========================
    'addCheckIn' : function(childId, childName, trackDateInVar, checkInTimeVar, checkInHourVar,
                            checkInMinuteVar) {

                             
        CareTracker.insert({

            childId: childId,
            childName: childName,
            trackDateIn: trackDateInVar, 
            checkIn: checkInTimeVar,
            checkInHour: checkInHourVar,
            checkInMinute: checkInMinuteVar,
            createdAt: new Date()

        });



    },

    'updateCheckIn' : function(childId, childName, trackDateInVar, checkInTimeVar, checkInHourVar, checkInMinuteVar) {

        CareTracker.update({childId: childId, trackDateIn: trackDateInVar}, { $set: { trackDateIn: trackDateInVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateInVar}, { $set: { checkIn: checkInTimeVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateInVar}, { $set: { checkInHour: checkInHourVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateInVar}, { $set: { checkInMinute: checkInMinuteVar}});



    },

    'addCheckOut' : function(childId, trackDateOutVar, checkOutTimeVar,
                             checkOutHourVar, checkOutMinuteVar, totalHoursVar ) {
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { trackDateOut: trackDateOutVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { checkOut: checkOutTimeVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { checkOutHour: checkOutHourVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { checkOutMinute: checkOutMinuteVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { totalHoursForDay: totalHoursVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { currentBalance: 25}});
        
        Children.update({_id: childId}, { $inc: { currentBalance: + 25 }});
        Children.update({_id: childId}, { $inc: { totalHours: +totalHoursVar }});



   
    },

    'updateCheckOut': function(childId, trackDateOutVar, checkOutTimeVar, checkOutHourVar, checkOutMinuteVar, totalHoursVar) {
        CareTracker.update({childId: childId, trackDateOut: trackDateOutVar}, { $set: { trackDateOut: trackDateOutVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { checkOut: checkOutTimeVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { checkOutHour: checkOutHourVar}});
        CareTracker.update({childId: childId, trackDateIn: trackDateOutVar}, { $set: { checkOutMinute: checkOutMinuteVar}});

      //  Children.update({_id: childId}, { $inc: { currentBalance: +25 }});
        Children.update({_id: childId}, { $set: { totalHours: +totalHoursVar }});

    },


    updateTotalTime: (childId,newTotalTime,trackDateInVar)=>{

        CareTracker.update({childId: childId,  trackDateIn: trackDateInVar}, { $set: { totalHoursForDay: newTotalTime}});

    },
    
    'deleteCareTrackRecord' : function(careTrackRecord) {
        CareTracker.remove(careTrackRecord);
    },
// ================================================================================




// ============================== Payment Manager Methods =========================



'updateChildCare' : function(childId, newBalance) {



Children.update({_id: childId}, { $set: {currentBalance: +(parseFloat(newBalance)).toPrecision(4)  }});
Children.update({_id: childId}, { $set: {totalHours: 0}});

},


// ================================================================================




// ========================== Curriculum Builder Methods ==========================


    'addCurriculum' : function(curriculumNameVar, curriculumDateVar, curriculumContentVar) {
        
        Curriculum.insert({
            curriculumName: curriculumNameVar,
            curriculumDate: curriculumDateVar,
            curriculumContent: curriculumContentVar
        });

    },

    'deleteCurriculumRecord' : function(curriculumId) {

        Curriculum.remove(curriculumId);
    
    },

    'editCurriculum' : function( curriculumId, curriculumNameVar, curriculumDateVar, curriculumContentVar) {

        Curriculum.update({_id: curriculumId}, { $set: { curriculumName: curriculumNameVar}});
        Curriculum.update({_id: curriculumId}, { $set: { curriculumDate: curriculumDateVar}});
        Curriculum.update({_id: curriculumId}, { $set: { curriculumContent: curriculumContentVar}});
    },


// ====================================================================================


// ============================= EXPENSE TRACKER METHODS ==============================

'addReceipts': function (ReceiptTypeVar, ReceiptTotalVar, ReceiptDateVar, ReceiptNotesVar) {

    Receipts.insert({
        ReceiptType: ReceiptTypeVar,
        ReceiptTotal: ReceiptTotalVar,
        ReceiptDate: ReceiptDateVar,
        ReceiptNotes: ReceiptNotesVar,
        ReceiptCreatedAt: new Date()

    })

},

'manageReceipts': function (receiptId, ReceiptTypeVar, ReceiptTotalVar, ReceiptDateVar, ReceiptNotesVar ) {

    Receipts.update({ _id: receiptId }, { $set: { receiptType: ReceiptTypeVar } });
    Receipts.update({ _id: receiptId }, { $set: { receiptTotal: ReceiptTotalVar } });
    Receipts.update({ _id: receiptId }, { $set: { receiptDate: ReceiptDateVar } });
    Receipts.update({ _id: receiptId }, { $set: { receiptNotes: ReceiptNotesVar } });
   

},

'deleteReceipts': function (receiptId) {

    Receipts.remove(receiptId);
    },


});