-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "qs_global_rank" INTEGER,
    "qs_europe_rank" INTEGER,
    "founding_year" INTEGER,
    "focus_areas" TEXT NOT NULL,
    "research_strengths" TEXT NOT NULL,
    "faculty_count" INTEGER,
    "international_percent" INTEGER,
    "language_of_teaching" TEXT NOT NULL,
    "website_url" TEXT,
    "university_type" TEXT NOT NULL,
    "gdpr_compliance_note" TEXT,
    "eu_ai_act_aligned" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "field_of_study" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,
    "duration_months" INTEGER,
    "language" TEXT NOT NULL,
    "intake_month" TEXT,
    "application_deadline" DATETIME,
    "research_focused" BOOLEAN NOT NULL DEFAULT true,
    "thesis_required" BOOLEAN NOT NULL DEFAULT true,
    "internship_included" BOOLEAN NOT NULL DEFAULT false,
    "faculty_advisors" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Program_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- CreateIndex
CREATE INDEX "University_qs_global_rank_idx" ON "University"("qs_global_rank");

-- CreateIndex
CREATE INDEX "University_qs_europe_rank_idx" ON "University"("qs_europe_rank");

-- CreateIndex
CREATE INDEX "University_country_idx" ON "University"("country");

-- CreateIndex
CREATE INDEX "Program_field_of_study_idx" ON "Program"("field_of_study");

-- CreateIndex
CREATE INDEX "Program_level_idx" ON "Program"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Program_university_id_name_level_key" ON "Program"("university_id", "name", "level");
