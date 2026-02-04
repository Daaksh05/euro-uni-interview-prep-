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
    // University Metadata
    qsGlobalRank?: number;
    qsEuropeRank?: number;
    researchStrengths?: string;
    focusAreas?: string;
    foundingYear?: number;
    gdprCompliance?: string;
    euAiActAligned?: boolean;
}

export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}
