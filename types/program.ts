export interface ProgramData {
    university: string;
    programName: string;
    degreeLevel: 'Bachelor' | 'Master' | 'PhD';
    country: string;
    overview: string;
    admissionRequirements: string[];
    tuitionFees: string;
    applicationDeadline: string;
    interviewRequirement: boolean;
    interviewFormat?: string;
    sourceUrl?: string;
    lastUpdated?: string;
    confidenceScore: 'High' | 'Medium' | 'Low';
}

export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}
