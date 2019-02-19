Router.configure({
    //  The front facing pages & login page have their declared layoutTemplate
    //  They will not be affected by this
        layoutTemplate: 'backLayout',
    
    });
    
    /*  Front Routes  */
    
    // Home Route
    Router.route('/', {
        layoutTemplate: "layout",
        name : "homePage"
    });
    
    // About Page Route
    Router.route('/about', {
        layoutTemplate: "layout",
        name : "aboutPage"
    });
    
    // Contact Page Route
    Router.route('/contact', {
        layoutTemplate: "layout",
        name : "contactPage"
    });
    
    
    
    /*  Back Routes  */
    
    // Admin Login Route
    Router.route('/admin', {
            layoutTemplate: "layout",
            name:'adminLogin'
        }
    
    );
    
    
    
    Router.route('/admin-dash', function(){
    
         this.render("admin-dash");
         //IF USER HAS LOGGED OUT
         if(Meteor.userId() == null)
         {          
             Router.go("/admin");
             this.render('adminLogin');
         }
         else{
             
    
             this.render("adminDash");
         }
    }); 
    
    
    //CHILD MANAGER ROUTE
    Router.route('/child-manager', function(){
    
        this.render("child-manager");
        //IF USER HAS LOGGED OUT
        // if(Meteor.userId() == null)
        // {          
        //     Router.go("/admin");
        //     this.render('adminLogin');
        // }
        // else{
        //     this.render("child-manager");
        // }
    });
    
    
    //PAYMENT MANAGER ROUTE
    // Router.route('/payment-manager', function(){
    
    //     this.render("payment-manager");
    //     //IF USER HAS LOGGED OUT
    //     if(Meteor.userId() == null)
    //     {          
    //         Router.go("/admin");
    //         this.render('adminLogin');
    //     }
    //     else{
    //         this.render("payment-manager");
    //     }
    // }); 
    
    
    //CURRICULUM BUILDER ROUTE
    Router.route('/curriculum-builder', function(){
    
        this.render("curriculum-builder");
//        IF USER HAS LOGGED OUT
        // if(Meteor.userId() == null)
        // {   Router.go("/admin");
        //     this.render('adminLogin');
        // }
        // else{
        //     this.render("curriculum-builder");
        // }

        
    }); 
    
    //EXPENSE TRACKER ROUTE
    Router.route('/expense-tracker', function(){
    
        this.render("expense-tracker");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {          
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("expense-tracker");
        }
    }); 
    
    
    Router.route('/care-tracker', function(){
    
        this.render("care-tracker");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {          Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("care-tracker");
        }
    }); 
    
    
    Router.route('/child-list', function() {
    
        this.render("childList");
        //IF USER HAS LOGGED OUT
        // if(Meteor.userId() == null)
        // {          Router.go("/admin");
        //     this.render('adminLogin');
        // }
        // else{
        //     this.render("childList");
        // }
    });
    
    Router.route('/edit-child', function() {
    
        this.render("editChild");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {          Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("editChild");
        }
    });
    
    Router.route('/daily-activity-report', function() {
    
        this.render("dailyActivityReport");
        //IF USER HAS LOGGED OUT
        // if(Meteor.userId() == null)
        // {          Router.go("/admin");
        //     this.render('adminLogin');
        // }
        // else{
        //     this.render("dailyActivityReport");
        // }
    });
    
    Router.route('/edit-curriculum', function() {
    
        this.render("editCurriculum");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {          Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("editCurriculum");
        }
    });
    
    Router.route('/care-tracker-records', function() {
    
        this.render("careTrackerRecords");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {          Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("careTrackerRecords");
        }
    });
    
    
    //WAIT LIST ROUTE
    Router.route('/wait-list', function(){
    
        this.render("waitList");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("waitList");
        }
    });
    
    
    //PAYMENT MANAGER ROUTE
    Router.route('/payment-manager', function(){
    
        this.render("paymentManager");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("paymentManager");
        }
    });
    
    //SEND INVOICE ROUTE
    Router.route('/send-invoice', function(){
    
        this.render("sendInvoice");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("sendInvoice");
        }
    });
    
    // EXPENSE TRACKER SEARCH ROUTE
    Router.route('/manage-receipts/:date/:datee/:type', function () {
    
        this.render("manageReceipts");
        //IF USER HAS LOGGED OUT
        if (Meteor.userId() == null) {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else {
            this.render("manageReceipts");
        }
    });
    
    
    // ========================================== HELP ROUTES =========================================================
    
    // ADD CHILD
    Router.route('/add-child-help', function(){
    
        this.render("addChildHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("addChildHelp");
        }
    });
    
    
    // CHILD ROSTER
    Router.route('/child-roster-help', function(){
    
        this.render("childRosterHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("childRosterHelp");
        }
    });
    
    // DAILY ACTIVITY REPORT HELP
    Router.route('/daily-activity-report-help', function(){
    
        this.render("dailyActivityReportHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("dailyActivityReportHelp");
        }
    });
    
    // EDIT CHILD HELP
    Router.route('/edit-child-help', function(){
    
        this.render("editChildHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("editChildHelp");
        }
    });
    
    // CARE TRACKER HELP
    Router.route('/care-tracker-help', function(){
    
        this.render("careTrackerHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("careTrackerHelp");
        }
    });
    
    // PAYMENT MANAGER HELP
    Router.route('/payment-manager-help', function(){
    
        this.render("paymentManagerHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("paymentManagerHelp");
        }
    });
    
    // CURRICULUM BUILDER HELP
    Router.route('/curriculum-builder-help', function(){
    
        this.render("curriculumBuilderHelp");
        //IF USER HAS LOGGED OUT
        if(Meteor.userId() == null)
        {
            Router.go("/admin");
            this.render('adminLogin');
        }
        else{
            this.render("curriculumBuilderHelp");
        }
    });
    
    
    // ========================================== END HELP ROUTES ===============================================

    Router.route('/googlec7c5776d66561db2.html', function(){
    
            this.render("google");
        
    });