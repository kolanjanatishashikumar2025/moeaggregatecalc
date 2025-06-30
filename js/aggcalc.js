
// // <!-- the following script block to collapse / expand the disclaimer DIV container -->
{/* //<script> */}

function toggleDisclaimer() {
    const content = document.getElementById('disclaimerContent');
    const icon = document.querySelector('.toggle-icon');
    
    content.classList.toggle('collapsed');
    icon.classList.toggle('rotated');
    
    // If collapsing and checkbox was checked, uncheck it
    if (content.classList.contains('collapsed')) {
        document.getElementById('disclaimerCheckbox').checked = false;
    }
}

// Optional: Start collapsed
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('disclaimerContent').classList.add('collapsed');
});
//</script>

// <!-- debugSubjects -->
//<script>
function debugSubjects() {
    const subjects = getSelectedSubjects();
    alert('Selected subjects:\n' + 
          subjects.map(s => `${s.name}: ${s.grade}`).join('\n') +
          '\n\nTotal: ' + subjects.length);
}
//</script>

// <!-- handleSubjectVisibility -->
//<script>


function handleSubjectVisibility() {
    //alert('handleSubjectVisibility-39');
    // Get the dropdown element
    const examTypeSelect = document.getElementById('exam-type');

    // Get all subject checkboxes
    const amathCheckbox = document.getElementById('amath');
    const humanitiesCheckbox = document.getElementById('humanities');
    const biologyCheckbox = document.getElementById('biology');
    const chemistryCheckbox = document.getElementById('chemistry');
    const physicsCheckbox = document.getElementById('physics');
    const poaCheckbox = document.getElementById('poa');
    const ebsCheckbox = document.getElementById('ebs');

    // Add event listener to the exam type dropdown
    examTypeSelect.addEventListener('change', function() {
        // Get selected value
        const selectedValue = this.value;

        // Function to handle checkbox state
        function setCheckboxState(checkbox, shouldDisable) {
            if (checkbox) {
                checkbox.disabled = shouldDisable;
                if (shouldDisable) {
                    checkbox.checked = false;
                }
            }
        }

        // Handle N(T)-level selection
        if (selectedValue === 'nt') {
            setCheckboxState(amathCheckbox, true);
            setCheckboxState(humanitiesCheckbox, true);
            setCheckboxState(biologyCheckbox, true);
            setCheckboxState(chemistryCheckbox, true);
            setCheckboxState(physicsCheckbox, true);
            setCheckboxState(poaCheckbox, true);
            setCheckboxState(ebsCheckbox, false);
        }
        // Handle N(A)-level and O-level selections
        else if (selectedValue === 'na' || selectedValue === 'olevel') {
            setCheckboxState(amathCheckbox, false);
            setCheckboxState(humanitiesCheckbox, false);
            setCheckboxState(biologyCheckbox, false);
            setCheckboxState(chemistryCheckbox, false);
            setCheckboxState(physicsCheckbox, false);
            setCheckboxState(poaCheckbox, false);
            setCheckboxState(ebsCheckbox, true);
        }
        // Handle Full SBB selection or no selection
        else {
            // Enable all checkboxes
            setCheckboxState(amathCheckbox, false);
            setCheckboxState(humanitiesCheckbox, false);
            setCheckboxState(biologyCheckbox, false);
            setCheckboxState(chemistryCheckbox, false);
            setCheckboxState(physicsCheckbox, false);
            setCheckboxState(poaCheckbox, false);
            setCheckboxState(ebsCheckbox, false);
        }
    });
}



//</script>

// <!-- handleSubjectSelections,handleScienceSelections  -->

//<script>
// Function to handle regular subject checkboxes and their dropdowns
function handleSubjectSelections() {
    //alert('handleSubjectSelections-110');
    // Select all checkboxes that are for subjects (excluding sciences which are handled separately)
    const subjectCheckboxes = document.querySelectorAll('input[type="checkbox"].subject-select');
    //console.log('Found subject checkboxes:', subjectCheckboxes.length); // Debug log

    subjectCheckboxes.forEach(checkbox => {
        // Initially enable dropdowns if checkbox is checked
        const row = checkbox.closest('tr');
        if (row) {
            const dropdowns = row.querySelectorAll('select');
            dropdowns.forEach(dropdown => {
                dropdown.disabled = !checkbox.checked;
            });
        }

        // Add change event listener
        checkbox.addEventListener('change', function() {
            //console.log('Checkbox changed:', this.id, 'Checked:', this.checked); // Debug log
            const row = this.closest('tr');
            if (row) {
                const dropdowns = row.querySelectorAll('select');
                //console.log('Found dropdowns:', dropdowns.length); // Debug log
                dropdowns.forEach(dropdown => {
                    dropdown.disabled = !this.checked;
                    if (!this.checked) {
                        dropdown.value = '';
                    }
                });
            }
        });
    });
////////15042025}



// Add CSS for disabled dropdowns
const style = document.createElement('style');
style.textContent = `
    select:disabled {
        background-color: #f0f0f0 !important;
        cursor: not-allowed !important;
        opacity: 0.6 !important;
    }
    select:not(:disabled) {
        background-color: #ffffff !important;
        cursor: pointer !important;
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

} //added 15042025


// Function to handle grade validation
function handleGradeValidation() {
    //alert('handleGradeValidation-166');
    const gradeDropdowns = document.querySelectorAll('select[id$="_g3"], select[id$="_g2"], select[id$="_g1"]');
    
    gradeDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            if (!this.disabled && this.value) {
                const currentId = this.id;
                const baseId = currentId.slice(0, -3);
                const row = this.closest('tr');
                
                if (row) {
                    ['_g3', '_g2', '_g1'].forEach(suffix => {
                        const otherDropdown = row.querySelector(`select[id="${baseId}${suffix}"]`);
                        if (otherDropdown && otherDropdown !== this) {
                            otherDropdown.value = '';
                        }
                    });
                }
            }
        });
    });
}


function handleScienceSelections() {
    //alert('handleScienceSelections-191');
    const combinedScience = document.getElementById('combined_science');
    const pureSciences = ['biology', 'chemistry', 'physics'].map(id => document.getElementById(id));
    // Define combinedScienceDropdowns at the function scope level
    const combinedScienceDropdowns = document.querySelectorAll('[id^="combined_science_"]');
    
    if (combinedScience) {
        // Set initial state
        combinedScienceDropdowns.forEach(dropdown => {
            dropdown.disabled = !combinedScience.checked;
        });

        combinedScience.addEventListener('change', function() {
            if (this.checked) {
                // Disable pure sciences
                pureSciences.forEach(science => {
                    if (science) {
                        science.checked = false;
                        science.disabled = true;
                        const scienceDropdowns = document.querySelectorAll(`[id^="${science.id}_"]`);
                        scienceDropdowns.forEach(dropdown => {
                            dropdown.disabled = true;
                            dropdown.value = '';
                        });
                    }
                });

                // Enable combined science dropdowns
                combinedScienceDropdowns.forEach(dropdown => {
                    dropdown.disabled = false;
                });
            } else {
                // Enable pure sciences
                pureSciences.forEach(science => {
                    if (science) {
                        science.disabled = false;
                    }
                });

                // Disable combined science dropdowns
                combinedScienceDropdowns.forEach(dropdown => {
                    dropdown.disabled = true;
                    dropdown.value = '';
                });
            }
        });
    }

    // Handle pure sciences
    pureSciences.forEach(science => {
        if (science) {
            // Set initial state
            const scienceDropdowns = document.querySelectorAll(`[id^="${science.id}_"]`);
            scienceDropdowns.forEach(dropdown => {
                dropdown.disabled = !science.checked;
            });

            science.addEventListener('change', function() {
                const scienceDropdowns = document.querySelectorAll(`[id^="${science.id}_"]`);
                if (this.checked) {
                    // Disable combined science
                    if (combinedScience) {
                        combinedScience.checked = false;
                        combinedScience.disabled = true;
                        combinedScienceDropdowns.forEach(dropdown => {
                            dropdown.disabled = true;
                            dropdown.value = '';
                        });
                    }
                    // Enable this science's dropdowns
                    scienceDropdowns.forEach(dropdown => {
                        dropdown.disabled = false;
                    });
                } else {
                    // Disable this science's dropdowns
                    scienceDropdowns.forEach(dropdown => {
                        dropdown.disabled = true;
                        dropdown.value = '';
                    });
                    
                    // If no pure science is selected, enable combined science
                    const anyPureScienceSelected = pureSciences.some(s => s && s.checked);
                    if (!anyPureScienceSelected && combinedScience) {
                        combinedScience.disabled = false;
                    }
                }
            });
        }
    });
}

// Make sure to call this function when the document is loaded
document.addEventListener('DOMContentLoaded', handleScienceSelections);



//</script>

// <!-- handleMotherTongueSelections, handleOtherSelections, -->

//<script>


function handleMotherTongueSelections() {
    //alert('handleMotherTongueSelections-291');
    const mtlRadios = document.querySelectorAll('input[name="mtl_option"]');
    
    // Function to disable all dropdowns and reset their values
    function disableAllDropdowns() {
        const allDropdowns = document.querySelectorAll('select[id^="hmtl_"], select[id^="mtl_g"], select[id^="mtl_lieu_"]');
        allDropdowns.forEach(dropdown => {
            dropdown.disabled = true;
            dropdown.value = '';
        });
    }

    // Function to handle grade selection validation
    function handleGradeValidation(dropdowns) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function() {
                if (this.value !== '') {
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== this) {
                            otherDropdown.value = '';
                        }
                    });
                }
            });
        });
    }

    // Initially disable all dropdowns
    disableAllDropdowns();

    mtlRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // First disable all dropdowns
            disableAllDropdowns();
            
            if (this.checked) {
                switch(this.id) {
                    case 'hmtl':
                        // For HMTL: Enable only g3
                        const hmtlG3 = document.getElementById('hmtl_g3');
                        if (hmtlG3) {
                            hmtlG3.disabled = false;
                        }
                        break;

                    case 'mtl':
                        // For MTL: Enable all three dropdowns
                        const mtlDropdowns = [
                            document.getElementById('mtl_g3'),
                            document.getElementById('mtl_g2'),
                            document.getElementById('mtl_g1')
                        ];
                        mtlDropdowns.forEach(dropdown => {
                            if (dropdown) {
                                dropdown.disabled = false;
                            }
                        });
                        // Add grade validation for MTL dropdowns
                        handleGradeValidation(mtlDropdowns);
                        break;

                    case 'mtl_lieu':
                        // For MTL-in-lieu: Enable only g3
                        const mtlLieuG3 = document.getElementById('mtl_lieu_g3');
                        if (mtlLieuG3) {
                            mtlLieuG3.disabled = false;
                        }
                        break;
                }
            }
        });
    });

    // Check if any radio is already selected on page load
    const selectedRadio = document.querySelector('input[name="mtl_option"]:checked');
    if (selectedRadio) {
        selectedRadio.dispatchEvent(new Event('change'));
    }
}
// Function to handle Others radio selections
function handleOtherSelections() {
    //alert('handleOtherSelections-376');
    // Get all Others radio buttons
    const othersRadios = document.querySelectorAll('input[name="others_group"]');
    
    // Get all dropdowns by specific prefixes
    const artDropdowns = document.querySelectorAll('select[id^="art_"]');
    //const computingDropdowns = document.querySelectorAll('select[id^="computing_"]');
    const dntDropdowns = document.querySelectorAll('select[id^="dnt_"]');
    const nfsDropdowns = document.querySelectorAll('select[id^="nfs_"]');
    const ebsDropdowns = document.querySelectorAll('select[id^="ebs_"]');
    
    // Function to disable all dropdowns
    // function disableAllDropdowns() {
    //     [artDropdowns, computingDropdowns, dntDropdowns, nfsDropdowns, ebsDropdowns].forEach(dropdownSet => {
    //         dropdownSet.forEach(dropdown => {
    //             dropdown.setAttribute('disabled', 'disabled');
    //             dropdown.value = '';
    //         });
    //     });
    // }

    function disableAllDropdowns() {
        [artDropdowns, dntDropdowns, nfsDropdowns, ebsDropdowns].forEach(dropdownSet => {
            dropdownSet.forEach(dropdown => {
                dropdown.setAttribute('disabled', 'disabled');
                dropdown.value = '';
            });
        });
    }

    // Initially disable all dropdowns
    disableAllDropdowns();

    // Add change event listener to each radio button
    othersRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            //console.log('Others Radio changed:', this.id);
            
            // First disable all dropdowns
            disableAllDropdowns();
            
            // Then enable only the relevant dropdowns based on radio button ID
            let dropdownsToEnable;
            switch(this.id) {
                case 'art':
                    dropdownsToEnable = artDropdowns;
                    break;
                // case 'computing':
                //     dropdownsToEnable = computingDropdowns;
                //     break;
                case 'dnt':
                    dropdownsToEnable = dntDropdowns;
                    break;
                case 'nfs':
                    dropdownsToEnable = nfsDropdowns;
                    break;
                case 'ebs':
                    dropdownsToEnable = ebsDropdowns;
                    break;
            }

            if (dropdownsToEnable) {
                dropdownsToEnable.forEach(dropdown => {
                    dropdown.removeAttribute('disabled');
                    //console.log('Enabled dropdown:', dropdown.id);
                });
            }
        });
    });

    // Check if any radio is already selected on page load
    const selectedRadio = document.querySelector('input[name="others_group"]:checked');
    if (selectedRadio) {
        selectedRadio.dispatchEvent(new Event('change'));
    }
}


//</script>



// <!-- handleDisclaimerAndDropdown, handleQ1Validations,handleSpecialSubjects  -->

//<script>

function handleDisclaimerAndDropdown() {
   //alert('handleDisclaimerAndDropdown-463');
    const examTypeSelect = document.getElementById('exam-type');
    const disclaimerCheckbox = document.getElementById('disclaimerCheckbox');
    const calculateButton = document.getElementById('calculateButton');

    function updateButtonState() {
        // Button is enabled only when checkbox is checked AND dropdown has a value other than empty
        calculateButton.disabled = !(disclaimerCheckbox.checked && examTypeSelect.value !== "");
        // alert(disclaimerCheckbox.checked);
        //     alert(examTypeSelect.value);
    }

    // Add event listeners to both elements
    disclaimerCheckbox.addEventListener('change', updateButtonState);
    examTypeSelect.addEventListener('change', updateButtonState);

    // Initial check
    updateButtonState();
}

function handleQ1Validations() {
    const q1Dropdown = document.getElementById('exam-type');
    
    q1Dropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        const allG3Dropdowns = document.querySelectorAll('select[id$="_g3"]');
        const allG2Dropdowns = document.querySelectorAll('select[id$="_g2"]');
        const allG1Dropdowns = document.querySelectorAll('select[id$="_g1"]');

        switch(selectedValue) {
            case 'non_full_sbb_o':
                // Disable NA/G2 & NT/G1 dropdowns
                allG2Dropdowns.forEach(dropdown => {
                    dropdown.disabled = true;
                    dropdown.value = '';
                });
                allG1Dropdowns.forEach(dropdown => {
                    dropdown.disabled = true;
                    dropdown.value = '';
                });
                break;

            case 'non_full_sbb_na':
                // Disable NT/G1 dropdowns
                allG1Dropdowns.forEach(dropdown => {
                    dropdown.disabled = true;
                    dropdown.value = '';
                });
                break;

            case 'non_full_sbb_nt':
                // Disable Exp/G3 dropdowns
                allG3Dropdowns.forEach(dropdown => {
                    dropdown.disabled = true;
                    dropdown.value = '';
                });
                break;
        }
    });
}

function handleSpecialSubjects() {
    //alert('handleSpecialSubjects-519');
    // Handle EBS dropdowns
    const ebsDropdowns = document.querySelectorAll('#ebs_g2, #ebs_g1');
    ebsDropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });

    // Handle Additional Mathematics and POA dropdowns
    //const amathG3 = document.querySelector('#amath_g3');
    const amathDropdowns = document.querySelectorAll('#amath_g2, #amath_g1');
    amathDropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
    //const poaG3 = document.querySelector('#poa_g3');
    const poaDropdowns = document.querySelectorAll('#poa_g2, #poa_g1');
    poaDropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });   
}
    
//</script>


// <!-- getSelectedSubjects,determineELR2B2Tag, initializeELR2B2-->

//<script>
function getSelectedSubjects() {
    const subjects = [];
    
    // Handle English - check all three grade dropdowns
    const englishGrades = ['eng_g3', 'eng_g2', 'eng_g1'].map(id => document.getElementById(id));
    const selectedEnglishGrade = englishGrades.find(select => select && select.value);
    
    if (selectedEnglishGrade) {
        subjects.push({
            name: 'English',
            grade: selectedEnglishGrade.value
        });
    }
    
    const subjectCheckboxes = document.querySelectorAll('.subject-select');
    
    subjectCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const subjectId = checkbox.id;
            const gradeSelects = [
                document.getElementById(`${subjectId}_g3`),
                document.getElementById(`${subjectId}_g2`),
                document.getElementById(`${subjectId}_g1`)
            ];
            
            const selectedGrade = gradeSelects.find(select => select && select.value);
            
            if (selectedGrade) {
                let subjectName = checkbox.nextSibling.textContent.trim();
                subjects.push({
                    name: subjectName,
                    grade: selectedGrade.value
                });
            }
        }
    });

    return subjects;
}

function determineELR2B2Tag() {
    console.log('determineELR2B2Tag called');
    const tagMessageDiv = document.getElementById('tagMessageDiv');
    
    if (!tagMessageDiv) {
        console.error('tagMessageDiv not found!');
        return;
    }
    
    const subjects = getSelectedSubjects();
    console.log('Selected subjects:', subjects);

    tagMessageDiv.innerHTML = '';

    const english = subjects.find(s => s.name.toLowerCase().includes('english'));
    if (!english) {
        tagMessageDiv.innerHTML = 'English grade is required';
        return;
    }

    if (subjects.length < 5) {
        tagMessageDiv.innerHTML = `
            <div class="tag-result">
                <h3>Insufficient Subjects</h3>
                <p>You have selected ${subjects.length} subjects.</p>
                <p>A minimum of 5 subjects is required:</p>
                <ul>
                    <li>English (mandatory)</li>
                    <li>2 subjects for R2</li>
                    <li>2 subjects for B2</li>
                </ul>
                <p>Currently selected subjects:</p>
                <ul>
                    ${subjects.map(s => `<li>${s.name}: ${s.grade}</li>`).join('')}
                </ul>
            </div>
        `;
        return;
    }

    const mathSubjects = ['Mathematics', 'Additional Mathematics'];
    const humanitiesSubjects = ['Combined Humanities'];
    const artSubjects = ['Art'];
    const poaSubjects = ['Principles of Accounts'];
    const scienceSubjects = ['Biology', 'Chemistry', 'Physics', 'Science'];
    const technicalSubjects = ['Design & Technology', 'Nutrition and Food Science', 'Elements of Business Skills'];

    const mathSubject = subjects.find(s => 
        mathSubjects.some(m => s.name.toLowerCase().includes(m.toLowerCase()))
    );

    let tag = null;
    let reason = '';
    let r2SecondSubject = '';

    if (mathSubject) {
    const otherSubjects = subjects.filter(s => 
        s.name !== 'English' && 
        s.name !== mathSubject.name
    );

    const hasHumanities = otherSubjects.some(s => humanitiesSubjects.includes(s.name));
    const hasArt = otherSubjects.some(s => artSubjects.includes(s.name));
    const hasPOA = otherSubjects.some(s => poaSubjects.includes(s.name));

    if (hasHumanities || hasArt || hasPOA) {
        tag = 'ELR2B2-B';
        r2SecondSubject = hasHumanities ? 'Combined Humanities' : 
                         hasArt ? 'Art' : 'Principles of Accounts';
        reason = `R2: ${mathSubject.name} + ${r2SecondSubject}`;

        // Filter out R2 subjects to get B2 subjects
        const b2Subjects = otherSubjects.filter(s => 
            s.name !== r2SecondSubject
        ).map(s => s.name);

        const subjectBreakdown = `
            <p>English: ${english.grade}</p>
            <p>R2 (First): ${mathSubject.name}</p>
            <p>R2 (Second): ${r2SecondSubject}</p>
            <p>B2 subjects: ${b2Subjects.join(', ')}</p>
        `;

        tagMessageDiv.innerHTML = `
            <div class="tag-result">
                <h3>Stream: ${tag}</h3>
                <p><strong>Reason:</strong> ${reason}</p>
                <div class="selected-subjects">
                    <h4>Selected Subjects:</h4>
                    ${subjectBreakdown}
                </div>
            </div>
        `;
    }
    } else {
        tagMessageDiv.innerHTML = `
            <div class="tag-result">
                <h3>No valid stream determined</h3>
                <p>Requirements:</p>
                <ul>
                    <li>English is mandatory</li>
                    <li>Mathematics or Additional Mathematics must be first R2 subject</li>
                    <li>Second R2 subject determines the stream (B/C/D)</li>
                    <li>Two additional subjects required for B2</li>
                </ul>
            </div>
        `;
    }

    console.log({
        subjects,
        mathSubject,
        tag,
        reason
    });

    return tag;
}

function initializeELR2B2() {
    console.log('Initializing ELR2B2...');
    const calculateButton = document.getElementById('calculateButton');
    
    if (calculateButton) {
        calculateButton.addEventListener('click', () => {
            determineELR2B2TagV2();
        });
    } else {
        console.error('Calculate button not found!');
    }
}
//</script>


// <!-- resetForm,initializeResetButton,initializeResetButtons -->
//<script>

function resetForm()
{
// alert('restForm-721');
console.log('Resetting form...');
    
// Log form elements before reset
console.log('Before reset - Disabled dropdowns:',    
document.querySelectorAll('select:disabled').length);

 // Reset all radio buttons
 document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;
});

// Reset all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
});
//enable all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.disabled = false;
});


// Reset any special states or visibility
handleSpecialSubjects();
handleSubjectVisibility();
handleSubjectSelections();
handleGradeValidation();
handleScienceSelections();
handleMotherTongueSelections();
handleOtherSelections();
handleDisclaimerAndDropdown();
initializeGrossAggregateCalculate();
//console.log('Form reset completed');

 // Reset gradeTotal div
 const gradeTotalDiv = document.getElementById('gradeTotal');
if (gradeTotalDiv) {
    gradeTotalDiv.innerHTML = 'Gross Aggregator';
}

// Reset and hide eligibility message
const eligibilityDiv = document.getElementById('eligibility-message');
if (eligibilityDiv) {
    eligibilityDiv.innerHTML = 'Eligibility for JC/MI and Polytechinics for selected exam type'; // Clear content
    eligibilityDiv.classList.remove('show'); // Hide the div
    eligibilityDiv.style.display = 'none'; // Ensure it's hidden
}

  // Reset calculate button to disabled state
  const calculateButton = document.getElementById('calculateButton');
if (calculateButton) {
    calculateButton.disabled = true;
}


// document.querySelectorAll('select').forEach(select => {
//     console.log('Resetting select:', select.id);
//     select.value = '';
// });
}

function resetForm_Old() {
   // alert('restForm-721');
    console.log('Resetting form...');
    
     // Log form elements before reset
     console.log('Before reset - Disabled dropdowns:', 
     document.querySelectorAll('select:disabled').length);


    // Reset all dropdowns
    document.querySelectorAll('select').forEach(select => {
        select.value = '';
    });

    // Reset all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Clear all validation messages
    document.querySelectorAll('.validation-message').forEach(div => {
        div.innerHTML = '';
    });

    // Reset mother tongue related fields
    const mtlFields = ['hmtl', 'mtl', 'mtl_lieu'];
    mtlFields.forEach(field => {
        const elements = document.querySelectorAll(`[id^="${field}"]`);
        elements.forEach(element => {
            if (element.tagName === 'SELECT') {
                element.value = '';
            }
            // Reset visibility of related elements
            const row = element.closest('tr');
            if (row) {
                row.style.display = '';
            }
        });
    });

    // Reset any disabled states
    document.querySelectorAll('select, input').forEach(element => {
        element.disabled = false;
    });

    // Reset any special states or visibility
    handleMotherTongueSelections(); // Call your existing function to reset MT selections
    handleSubjectVisibility(); // Call your existing function to reset subject visibility
    
    //console.log('Form reset completed');

     // Reset gradeTotal div
     const gradeTotalDiv = document.getElementById('gradeTotal');
    if (gradeTotalDiv) {
        gradeTotalDiv.innerHTML = 'Gross Aggregator';
    }

    // Reset and hide eligibility message
    const eligibilityDiv = document.getElementById('eligibility-message');
    if (eligibilityDiv) {
        eligibilityDiv.innerHTML = 'Eligibility for JC/MI and Polytechinics for selected exam type'; // Clear content
        eligibilityDiv.classList.remove('show'); // Hide the div
        eligibilityDiv.style.display = 'none'; // Ensure it's hidden
    }

      // Reset calculate button to disabled state
      const calculateButton = document.getElementById('calculateButton');
    if (calculateButton) {
        calculateButton.disabled = true;
    }


    document.querySelectorAll('select').forEach(select => {
        console.log('Resetting select:', select.id);
        select.value = '';
    });
    // Re-initialize validations
   // reinitializeAfterReset();
}

// function initializeResetButton() {
//     const resetButton = document.getElementById('resetButton');
//     if (resetButton) {
//         resetButton.addEventListener('click', resetForm);
//     } else {
//         console.error('Reset button not found!');
//     }
// }

function initializeResetButtons() {
    // Get both reset buttons
    const resetButtons = [
        document.getElementById('resetButton'),      // Bottom button
        document.getElementById('resetButtonTop')    // Top button
    ];

    // Add click handler to both buttons
    resetButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', resetForm);
        } else {
            console.error('A reset button was not found!');
        }
    });
}
//</script>


//<script>


function determineELR2B2TagV2() {
    const tagMessageDiv = document.getElementById('tagMessageDiv');
    const subjects = getSelectedSubjects();
    
    // Check for English
    const english = subjects.find(s => s.name.toLowerCase().includes('english'));
    if (!english) {
        tagMessageDiv.innerHTML = 'English grade is required';
        return;
    }

    // Check minimum subjects
    if (subjects.length < 5) {
        displayInsufficientSubjectsMessage(tagMessageDiv, subjects);
        return;
    }

    // Define subject groups
    const mathSubjects = ['Mathematics', 'Additional Mathematics'];
    const humanitiesSubjects = ['Combined Humanities'];
    const artSubjects = ['Art'];
    const scienceSubjects = ['Biology', 'Chemistry', 'Physics', 'Science'];
    const technicalSubjects = ['Design & Technology', 'Nutrition and Food Science'];
    const poaSubjects = ['Principles of Accounts'];
    const mtlSubjects = ['Mother Tongue Language', 'Higher Mother Tongue Language'];

    // Check for ELR2B2-A first
    const hasHumanities = subjects.some(s => s.name === 'Combined Humanities');
    const hasArt = subjects.some(s => s.name === 'Art');
    
    if (hasHumanities || hasArt) {
        const r1Subject = subjects.find(s => 
            s.name === 'Combined Humanities' || s.name === 'Art'
        );
        
        // Valid R2 subjects for ELR2B2-A
        const r2Subject = subjects.find(s => 
            (s.name === 'Mathematics' || 
             s.name === 'Additional Mathematics' ||
             s.name === 'Principles of Accounts' ||
             s.name === 'Design & Technology' ||
             s.name === 'Nutrition and Food Science' ||
             s.name === 'Mother Tongue Language' ||
             s.name === 'Higher Mother Tongue Language' ||
             (r1Subject.name === 'Combined Humanities' && s.name === 'Art') ||
             (r1Subject.name === 'Art' && s.name === 'Combined Humanities')) &&
            s.name !== r1Subject.name
        );

        if (r2Subject) {
            // Check for science subjects for B2
            const scienceSubjects = subjects.filter(s => 
                (s.name === 'Biology' || 
                 s.name === 'Chemistry' || 
                 s.name === 'Physics' || 
                 s.name === 'Science') &&
                s.name !== r1Subject.name &&
                s.name !== r2Subject.name
            );

            if (scienceSubjects.length >= 2) {
                return displayResult(tagMessageDiv, {
                    tag: 'ELR2B2-A',
                    english: english,
                    r1: r1Subject,
                    r2: r2Subject,
                    b2: scienceSubjects.slice(0, 2)
                });
            }
        }
    }

    // Check for ELR2B2-B
    const mathSubject = subjects.find(s => mathSubjects.some(m => s.name.includes(m)));
    if (mathSubject) {
        const r2PossibleSubjectsB = [...humanitiesSubjects, ...artSubjects];
        const r2SubjectB = subjects.find(s => 
            r2PossibleSubjectsB.some(r => s.name.includes(r))
        );

        if (r2SubjectB) {
            const remainingSubjectsB = subjects.filter(s => 
                s.name !== english.name && 
                s.name !== mathSubject.name && 
                s.name !== r2SubjectB.name &&
                !mathSubjects.some(m => s.name.includes(m)) &&
                !humanitiesSubjects.some(h => s.name.includes(h)) &&
                !artSubjects.some(a => s.name.includes(a))
            );

            if (remainingSubjectsB.length >= 2) {
                return displayResult(tagMessageDiv, {
                    tag: 'ELR2B2-B',
                    english: english,
                    r1: mathSubject,
                    r2: r2SubjectB,
                    b2: remainingSubjectsB.slice(0, 2)
                });
            }
        }
    }

    // Check for ELR2B2-C
    if (mathSubject) {
        const r2PossibleSubjectsC = [...scienceSubjects, ...technicalSubjects];
        const r2SubjectC = subjects.find(s => 
            r2PossibleSubjectsC.some(r => s.name.includes(r)) &&
            s.name !== mathSubject.name
        );

        if (r2SubjectC) {
            const remainingSubjectsC = subjects.filter(s => 
                s.name !== english.name && 
                s.name !== mathSubject.name && 
                s.name !== r2SubjectC.name &&
                !mathSubjects.some(m => s.name.includes(m)) &&
                !scienceSubjects.some(sci => s.name.includes(sci)) &&
                !technicalSubjects.some(t => s.name.includes(t)) &&
                !artSubjects.some(a => s.name.includes(a))
            );

            if (remainingSubjectsC.length >= 2) {
                return displayResult(tagMessageDiv, {
                    tag: 'ELR2B2-C',
                    english: english,
                    r1: mathSubject,
                    r2: r2SubjectC,
                    b2: remainingSubjectsC.slice(0, 2)
                });
            }
        }
    }

    // Check for ELR2B2-D
    if (mathSubject) {
        const r2PossibleSubjectsD = [
            ...scienceSubjects, 
            ...artSubjects, 
            ...technicalSubjects
        ];
        const r2SubjectD = subjects.find(s => 
            r2PossibleSubjectsD.some(r => s.name.includes(r)) &&
            s.name !== mathSubject.name
        );

        if (r2SubjectD) {
            const remainingSubjectsD = subjects.filter(s => 
                s.name !== english.name && 
                s.name !== mathSubject.name && 
                s.name !== r2SubjectD.name &&
                !mathSubjects.some(m => s.name.includes(m)) &&
                !scienceSubjects.some(sci => s.name.includes(sci)) &&
                !artSubjects.some(a => s.name.includes(a)) &&
                !technicalSubjects.some(t => s.name.includes(t))
            );

            if (remainingSubjectsD.length >= 2) {
                return displayResult(tagMessageDiv, {
                    tag: 'ELR2B2-D',
                    english: english,
                    r1: mathSubject,
                    r2: r2SubjectD,
                    b2: remainingSubjectsD.slice(0, 2)
                });
            }
        }
    }

    // No valid combination found
    displayNoValidCombinationMessage(tagMessageDiv);
}

function displayResult(tagMessageDiv, result) {
    tagMessageDiv.innerHTML = `
        <div class="tag-result">
            <h3>Stream: ${result.tag}</h3>
            <p><strong>Reason:</strong> R2: ${result.r1.name} + ${result.r2.name}</p>
            <div class="selected-subjects">
                <h4>Selected Subjects:</h4>
                <p>English: ${result.english.grade}</p>
                <p>R2 (First): ${result.r1.name}</p>
                <p>R2 (Second): ${result.r2.name}</p>
                <p>B2 subjects: ${result.b2.map(s => s.name).join(', ')}</p>
            </div>
        </div>
    `;
    return result.tag;
}

function displayInsufficientSubjectsMessage(tagMessageDiv, subjects) {
    tagMessageDiv.innerHTML = `
        <div class="tag-result">
            <h3>Insufficient Subjects</h3>
            <p>You have selected ${subjects.length} subjects.</p>
            <p>A minimum of 5 subjects is required:</p>
            <ul>
                <li>English (mandatory)</li>
                <li>2 subjects for R2</li>
                <li>2 subjects for B2</li>
            </ul>
            <p>Currently selected subjects:</p>
            <ul>
                ${subjects.map(s => `<li>${s.name}: ${s.grade}</li>`).join('')}
            </ul>
        </div>
    `;
}

function displayNoValidCombinationMessage(tagMessageDiv) {
    tagMessageDiv.innerHTML = `
        <div class="tag-result">
            <h3>No Valid Stream Determined</h3>
            <p>Your subject combination doesn't meet the criteria for any ELR2B2 stream.</p>
            <p>Requirements for each stream:</p>
            <ul>
                <li><strong>ELR2B2-A:</strong>
                    <ul>
                        <li>R1: Humanities or Art</li>
                        <li>R2: Math/A.Math/POA/D&T/NFS/MTL/HMTL or remaining from R1</li>
                        <li>B1 & B2: Must be from Bio/Chem/Physics/Science</li>
                    </ul>
                </li>
                <li><strong>ELR2B2-B:</strong>
                    <ul>
                        <li>R1: Math or A.Math</li>
                        <li>R2: Humanities or Art</li>
                        <li>B1 & B2: Cannot be Math/A.Math/Humanities/Art</li>
                    </ul>
                </li>
                <li><strong>ELR2B2-C:</strong>
                    <ul>
                        <li>R1: Math or A.Math</li>
                        <li>R2: Bio/Chem/Physics/Science/D&T/NFS</li>
                        <li>B1 & B2: Cannot be Math/A.Math/Bio/Chem/Physics/Science/D&T/NFS/Art</li>
                    </ul>
                </li>
                <li><strong>ELR2B2-D:</strong>
                    <ul>
                        <li>R1: Math or A.Math</li>
                        <li>R2: Bio/Chem/Physics/Science/Art/D&T/NFS</li>
                        <li>B1 & B2: Cannot be Math/A.Math/Bio/Chem/Physics/Science/Art/D&T/NFS</li>
                    </ul>
                </li>
            </ul>
            <p>Please review your subject selection and try again.</p>
        </div>
    `;
}
//</script>
// <!-- script block to calculate grade TOTALS -->
//<script>
    // Add this at the top of your JavaScript file
    const subjectNameMapping = {
        'eng': 'English Language',
        'hmtl': 'Higher Chinese/Malay/Tamil',
        'mtl': 'Chinese/Malay/Tamil',
        'mtl_lieu': 'MTL-in-lieu',
        'math': 'Mathematics',
        'amath': 'Additional Mathematics',
        'humanities': 'Combined Humanities',
        'biology': 'Biology',
        'chemistry': 'Chemistry',
        'physics': 'Physics',
        'combined_science': 'Science',
        'poa': 'Principles of Accounts',
        'art': 'Art',
        'dnt': 'Design & Technology',
        'nfs': 'Nutrition and Food Science',
        'ebs': 'Elements of Business Skills'
    };
    
    // Helper function to get subject name
    function getSubjectName(selectId) {
        const baseId = selectId.replace(/_g[123]$/, '');
        return subjectNameMapping[baseId] || selectId;
    }
        
       function calculateGradeTotal() {
        const selectIds = [
            'eng_g3', 'eng_g2', 'eng_g1',
           'hmtl_g3','hmtl_g2', 'hmtl_g1',
            'mtl_g3', 'mtl_g2', 'mtl_g1',
            'mtl_lieu_g3', 'mtl_lieu_g2', 'mtl_lieu_g1',
            'math_g3', 'math_g2', 'math_g1',
            'amath_g3', 'amath_g2', 'amath_g1',
            'humanities_g3', 'humanities_g2', 'humanities_g1',
            'biology_g3', 'biology_g2', 'biology_g1',
            'chemistry_g3', 'chemistry_g2', 'chemistry_g1',
            'physics_g3', 'physics_g2', 'physics_g1',
            'combined_science_g3', 'combined_science_g2', 'combined_science_g1',
            'poa_g3', 'poa_g2', 'poa_g1',
            'art_g3', 'art_g2', 'art_g1',
            'dnt_g3', 'dnt_g2', 'dnt_g1',
            'nfs_g3', 'nfs_g2', 'nfs_g1',
            'ebs_g3', 'ebs_g2', 'ebs_g1'
        ];
    
        let total = 0;
        let selectedGrades = [];
    
        selectIds.forEach(id => {
            const select = document.getElementById(id);
            if (select && select.value) {
                const grade = select.value;
                const numericValue = convertGradeToNumber(grade);
                if (numericValue !== null) {
                    total += numericValue;
                    // Get the subject name and stream type
                    const subjectName = getSubjectName(id);
                    const streamType = id.endsWith('_g3') ? 'Exp' : 
                                     id.endsWith('_g2') ? 'NA' : 'NT';
                    selectedGrades.push({
                        subject: subjectName,
                        grade: grade,
                        points: numericValue,
                        stream: streamType
                    });
                }
            }
        });
    
        return {
            total: total,
            selectedGrades: selectedGrades
        };
    }
    
    function convertGradeToNumber(grade) {
        // If grade is already a number (like "1", "2", "3", "9")
        if (!isNaN(grade)) {
            return parseInt(grade);
        }
    
        // For grades like A1, B3, C5, etc.
        if (grade.length === 2 && !isNaN(grade[1])) {
            return parseInt(grade[1]);
        }
    
        // For single letters (A, B, C, D, E)
        if (grade.length === 1) {
            switch(grade.toUpperCase()) {
                case 'A': return 1;
                case 'B': return 2;
                case 'C': return 3;
                case 'D': return 4;
                case 'E': return 5;
                default: return null;
            }
        }
    
        return null; // Invalid grade format
    }
    
   
    
    function calculateAndDisplayTotal() {
        const gradeTotalDiv = document.getElementById('gradeTotal');
        if (!gradeTotalDiv) {
            console.error('Grade total display element not found!');
            return;
        }
    
        const result = calculateGradeTotal();
        
        // Group grades by subject name to avoid duplicates
        const groupedGrades = result.selectedGrades.reduce((acc, grade) => {
            if (!acc[grade.subject]) {
                acc[grade.subject] = grade;
            }
            return acc;
        }, {});
    
        // Convert to array and sort alphabetically by subject name
        const sortedGrades = Object.values(groupedGrades).sort((a, b) => 
            a.subject.localeCompare(b.subject)
        );
    
        // Create the message with proper formatting
        let message = `<strong>Gross Aggregrate: ${result.total}</strong><br>`;
        message += `<small>Selected Subjects & Grades:<br>`;
        
        // Add each grade to the message
        sortedGrades.forEach(grade => {
            message += `${grade.subject} (${grade.stream}): ${grade.grade} (${grade.points})<br>`;
        });
        
        message += `</small>`;
        gradeTotalDiv.innerHTML = message;
    }
    function initializeGrossAggregateCalculate() {
        //alert('initializeGrossAggregateCalculate-1234');
        const selectIds = [
            'eng_g3', 'eng_g2', 'eng_g1',
            'hmtl_g3','hmtl_g2', 'hmtl_g1',
            'mtl_g3', 'mtl_g2', 'mtl_g1',
            'mtl_lieu_g3', 'mtl_lieu_g2', 'mtl_lieu_g1',
            'math_g3', 'math_g2', 'math_g1',
            'amath_g3', 'amath_g2', 'amath_g1',
            'humanities_g3', 'humanities_g2', 'humanities_g1',
            'biology_g3', 'biology_g2', 'biology_g1',
            'chemistry_g3', 'chemistry_g2', 'chemistry_g1',
            'physics_g3', 'physics_g2', 'physics_g1',
            'combined_science_g3', 'combined_science_g2', 'combined_science_g1',
            'poa_g3', 'poa_g2', 'poa_g1',
            'art_g3', 'art_g2', 'art_g1',
            'dnt_g3', 'dnt_g2', 'dnt_g1',
            'nfs_g3', 'nfs_g2', 'nfs_g1',
            'ebs_g3', 'ebs_g2', 'ebs_g1'
        ];
        
        // selectIds.forEach(id => {
        //     const select = document.getElementById(id);
        //     if (select) {
        //         select.addEventListener('change', calculateAndDisplayTotal);
        //     }
        // });
    
        // Initial calculation
      // calculateAndDisplayTotal();
    }
    
    // Initialize when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        initializeGrossAggregateCalculate();
    });

    // document.addEventListener('DOMContentLoaded', function() {
    // const calculateButton = document.getElementById('calculateButton');
    // if (calculateButton) {
    //     calculateButton.addEventListener('click', calculateAndDisplayTotal);

    //      // Show eligibility message
    //      const eligibilityDiv = document.getElementById('eligibility-message');
    //     // // //  alert(eligibilityDiv);
    //         if (eligibilityDiv) {
    //             eligibilityDiv.classList.add('show');
    //         }
    // }
    document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton');
    
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            // First call the calculation function
            calculateAndDisplayTotal();
            
            // Then show the eligibility div
            const eligibilityDiv = document.getElementById('eligibility-message');
            if (eligibilityDiv) {
             //   alert('1351');
                eligibilityDiv.classList.add('show');
            }
        });
    }
});
//</script>

// <!-- initialize -->

 // <!-- Initialize all functions immediately since script is at end of body -->
    //<script>
        function initialize() {
            // Initialize all functions immediately since script is at end of body
            //console.log('Initializing functions...'); // Debug log

              //the following function handles ebs, add. maths & poa having only single dropdown
            handleSpecialSubjects();
            //handleQ1Validations();

             //the following function toggles between disable / enable of each dropdown 
            //on selection of O-Level or NA-Level or NT-Level or FSBB
            handleSubjectVisibility();

             // Function to handle regular subject checkboxes and their dropdowns
            handleSubjectSelections();

              //the following function handles the resetting of the other 2 dropdowns
            handleGradeValidation();

             //the following function handles science subjects (bio,chem,phy or science)
            //with the selection of any of the 3 checkboxes, the 4th checkbox ~ science will disable AND vice-versa
            handleScienceSelections();

                       //the following function handles the mother tongue subjects 
           //with the selection of radiobutton to the corresponding 3 dropdowns
            handleMotherTongueSelections();

            //the following function handles the other subject radio buttons
            handleOtherSelections();    

            //the following function handles disabling the calculate grade button if the 
           //disclaimer check box or exam-type (ol,na,nt or fsbb) are not selected
            handleDisclaimerAndDropdown();

            //initializeELR2B2(); // Add this line     

        
            
            
            // the following functions does gross aggregate calculation
            initializeGrossAggregateCalculate();

                //the following function resets all the current selection of grades, checkboxes, radiobuttons
                initializeResetButtons();
        }
       
        
    initialize();
    // //</script>
