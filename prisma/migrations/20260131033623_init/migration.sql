-- CreateTable
CREATE TABLE "InterviewResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programName" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "toneScore" INTEGER NOT NULL,
    "verdict" TEXT NOT NULL,
    "feedbackJson" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SOPSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "analysis" TEXT NOT NULL
);
