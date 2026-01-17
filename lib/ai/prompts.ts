export const EXTRACTION_PROMPT = `
You are an expert academic researcher. Extract the following details from the provided university program text:
- Program Name
- Degree Level (Bachelor/Master/PhD)
- Overview (summary)
- Admission Requirements (list)
- Tuition Fees
- Interview Requirement (Boolean)
- Interview Format (if mentioned)

Return as JSON.
`;

export const INTERVIEW_STRUCTURE_PROMPT = `
Based on the program details below, determine the likely interview structure.
Program: {programName} at {university}
Details: {overview}

Output Format:
- Duration
- Panel composition
- Key topics
`;

export const QUESTION_GENERATION_PROMPT = `
Generate 25 interview questions for {programName} at {university}.
Categories:
1. Technical/Subject-specific
2. Motivation
3. Behavioral
4. Research (if applicable)

Ensure questions reflect European academic culture (critical thinking, theoretical depth).
`;
