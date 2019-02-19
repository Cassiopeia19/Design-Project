import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
Meteor.startup(() => {
  // code to run on server at startup
  //process.env.MAIL_URL = "smtps://postmaster%40postmaster@sandbox8d00a43312d74d4092388af74860e360.mailgun.org:85f34843c033c5c6ec4218828ebbd87a-b3780ee5-84a73d1b@smtp.mailgun.org:587";
process.env.MAIL_URL='smtps://spanglerfdc@gmail.com:Force18!@smtp.gmail.com:465';

});


//if(Meteor.isServer){
Meteor.methods({

  sendEmail : function(childId ,senderEmailAddress, recipient, emailSubject, emailBody, ) {

    var childInfo = Children.findOne({_id: childId});

    this.unblock();

    var emailSignature =  "\n\n Please feel free to call Lisa Spangler at: (636)696-9590  or email at: spanglerfdc@gmail.com " +
    "if you have any questions." + "\n\n\nBest, \n\n\n Lisa Spangler\nSpangler Family Daycare";


    var body = emailBody + emailSignature;

    Email.send({
        to: recipient,
        from:  senderEmailAddress,
        subject: childInfo.childFirstName + " " + emailSubject,
        text: body
    });

},

sendEmailInvoice : function(childId ) {

  var childInfo = Children.findOne({_id: childId});

  Children.update({_id: childId}, {$set: {totalHours: 0}});

  this.unblock();




  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();


  if (day <10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  currentDate = month + '/' + day + '/' + year;


  var emailInvoiceBody = "Hello " + childInfo.guardianFirstName + " " + childInfo.guardianLastName + 
                         ",\n"+ "\n as of " + currentDate + ", "+ childInfo.childFirstName + " " +childInfo.childLastName +
                         " has received a total of " + childInfo.totalHours + " hours of care. This results in a current balance due of:\n\n " +
                          "$"+ childInfo.currentBalance  + "\n\n Please feel free to call Lisa Spangler at: (636)696-9590  or email at: spanglerfdc@gmail.com " +
                         "if you have any questions." + "\n\n\nBest, \n\n\n Lisa Spangler\nSpangler Family Daycare";

   Email.send({
       to: childInfo.emailAddress,
       from:  "spanglerfdc@gmail.com",
       subject: childInfo.childFirstName + " " + childInfo.childLastName + " | Invoice: " + currentDate,
       text: emailInvoiceBody

  });

}


});
// }

