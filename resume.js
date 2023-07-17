
const personalInfoForm = document.querySelector('#personal-info-form');
const educationForm = document.querySelector('#education-form');
const experienceForm = document.querySelector('#experience-form');
const skillsForm = document.querySelector('#skills-form');
const resumePreview = document.querySelector('#resume-preview');
const generateBtn = document.querySelector('#generate-btn');


const resumeData = {
  personalInfo: {},
  education: [],
  experience: [],
  skills: [],
};


personalInfoForm.addEventListener('submit', savePersonalInfo);
educationForm.addEventListener('submit', saveEducation);
experienceForm.addEventListener('submit', saveExperience);
skillsForm.addEventListener('submit', saveSkills);
generateBtn.addEventListener('click', generateResume);


function savePersonalInfo(event) {
  event.preventDefault();
  resumeData.personalInfo = getFormValues(personalInfoForm);
  personalInfoForm.reset();
}

function saveEducation(event) {
  event.preventDefault();
  const educationDetails = getFormValues(educationForm);
  resumeData.education.push(educationDetails);
  educationForm.reset();
}

function saveExperience(event) {
  event.preventDefault();
  const experienceDetails = getFormValues(experienceForm);
  resumeData.experience.push(experienceDetails);
  experienceForm.reset();
}

function saveSkills(event) {
  event.preventDefault();
  const skills = getFormValues(skillsForm).skills.split(',').map(skill => skill.trim());
  resumeData.skills = skills;
  skillsForm.reset();
}


function generateResume() {
  const resumeTemplate = `
    <h2>Personal Information</h2>
    <ul>
      <li>Name: ${resumeData.personalInfo.name}</li>
      <li>Email: ${resumeData.personalInfo.email}</li>
      <li>Phone: ${resumeData.personalInfo.phone}</li>
    </ul>

    <h2>Education</h2>
    <ul>
      ${generateListItems(resumeData.education)}
    </ul>

    <h2>Experience</h2>
    <ul>
      ${generateListItems(resumeData.experience)}
    </ul>

    <h2>Skills</h2>
    <ul>
      ${generateListItems(resumeData.skills)}
    </ul>
  `;

  resumePreview.innerHTML = resumeTemplate;
}


function getFormValues(form) {
  const formData = new FormData(form);
  const values = {};

  for (let pair of formData.entries()) {
    values[pair[0]] = pair[1];
  }

  return values;
}


function generateListItems(items) {
  return items
    .map(item => `<li>${Object.values(item).join(' - ')}</li>`)
    .join('');
}
