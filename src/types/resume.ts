export interface ResumeData {
  header: {
    name: string;
    title: string;
    email: string;
  };
  profileOverview: string;
  keyHighlights: string[];
  professionalExperience: ProfessionalExperience[];
  technicalSkills: TechnicalSkill[];
  projectExperience: ProjectExperience[];
}

export interface ProfessionalExperience {
  jobTitle: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface TechnicalSkill {
  category: string;
  skills: string;
}

export interface ProjectExperience {
  title: string;
  description: string;
}

// Default empty resume data
export const getDefaultResumeData = (): ResumeData => ({
  header: {
    name: '',
    title: '',
    email: ''
  },
  profileOverview: '',
  keyHighlights: [''],
  professionalExperience: [{
    jobTitle: '',
    company: '',
    duration: '',
    responsibilities: ['']
  }],
  technicalSkills: [{
    category: '',
    skills: ''
  }],
  projectExperience: [{
    title: '',
    description: ''
  }]
});
