handleSpecialSubjects();
handleSubjectVisibility();
handleSubjectSelections();
handleGradeValidation();
handleScienceSelections();
handleMotherTongueSelections();
handleOtherSelections();
handleDisclaimerAndDropdown();
initializeGrossAggregateCalculate();


    // Main initialization function
    function initialize() {
        // alert('1346');
         initializeFormControls();    // Initial setup of form controls
         initializeValidations();     // Setup all validation handlers
         initializeCalculations();    // Setup calculation handlers
     }
     
     // Setup form controls
     function initializeFormControls() {
         handleSpecialSubjects();
         handleSubjectSelections();
         handleScienceSelections();
         handleMotherTongueSelections();
         handleOtherSelections();
         initializeResetButtons();
     }
     
     
     // Setup all validation handlers
     function initializeValidations() {
         handleSubjectVisibility();
         handleGradeValidation();
         handleDisclaimerAndDropdown();
     }
     
     // Setup calculation handlers
     function initializeCalculations() {
         initializeGrossAggregateCalculate();
     }
     
     // New function to handle re-initialization after reset
     function reinitializeAfterReset() {
         // Re-run all validation handlers
         handleSubjectVisibility();
         handleGradeValidation();
         handleMotherTongueSelections();
         handleScienceSelections();
         handleSpecialSubjects();
         handleSubjectSelections();
         handleOtherSelections();
         handleDisclaimerAndDropdown();
     }
     initialize();
     // Usage
     // document.addEventListener('DOMContentLoaded', function() {
     //     FormState.initialize();
     // });
