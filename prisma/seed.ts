import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function readCSV(filePath: string): Promise<any[]> {
    const results: any[] = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

async function main() {
    console.log('Starting seed...');

    // 1. Seed Universities
    const uniData = await readCSV(path.join(__dirname, 'data', 'university_seed.csv'));
    console.log(`Read ${uniData.length} universities from CSV.`);

    for (const uni of uniData) {
        await prisma.university.upsert({
            where: { name: uni.name.trim() },
            update: {
                country: uni.country.trim(),
                qs_global_rank: parseInt(uni.qs_global_rank) || null,
                qs_europe_rank: parseInt(uni.qs_europe_rank) || null,
                founding_year: parseInt(uni.founding_year) || null,
                focus_areas: uni.focus_areas.trim(),
                research_strengths: uni.research_strengths.trim(),
                faculty_count: parseInt(uni.faculty_count) || null,
                international_percent: parseInt(uni.international_percent) || null,
                language_of_teaching: uni.language_of_teaching.trim(),
                website_url: uni.website_url ? uni.website_url.trim() : null,
                university_type: uni.university_type.trim(),
                gdpr_compliance_note: uni.gdpr_compliance_note ? uni.gdpr_compliance_note.trim() : null,
                eu_ai_act_aligned: uni.eu_ai_act_aligned === 'true'
            },
            create: {
                id: uni.id ? uni.id.trim() : undefined,
                name: uni.name.trim(),
                country: uni.country.trim(),
                qs_global_rank: parseInt(uni.qs_global_rank) || null,
                qs_europe_rank: parseInt(uni.qs_europe_rank) || null,
                founding_year: parseInt(uni.founding_year) || null,
                focus_areas: uni.focus_areas.trim(),
                research_strengths: uni.research_strengths.trim(),
                faculty_count: parseInt(uni.faculty_count) || null,
                international_percent: parseInt(uni.international_percent) || null,
                language_of_teaching: uni.language_of_teaching.trim(),
                website_url: uni.website_url ? uni.website_url.trim() : null,
                university_type: uni.university_type.trim(),
                gdpr_compliance_note: uni.gdpr_compliance_note ? uni.gdpr_compliance_note.trim() : null,
                eu_ai_act_aligned: uni.eu_ai_act_aligned === 'true'
            }
        });
    }
    console.log('Universities seeded.');

    // 2. Seed Programs
    const programData = await readCSV(path.join(__dirname, 'data', 'program_seed.csv'));
    console.log(`Read ${programData.length} programs from CSV.`);

    for (const prog of programData) {
        const university = await prisma.university.findUnique({
            where: { name: prog.university_name.trim() }
        });

        if (university) {
            await prisma.program.upsert({
                where: {
                    university_id_name_level: {
                        university_id: university.id,
                        name: prog.name.trim(),
                        level: prog.level.trim()
                    }
                },
                update: {
                    field_of_study: prog.field_of_study.trim(),
                    duration_months: parseInt(prog.duration_months) || null,
                    language: prog.language.trim(),
                    intake_month: prog.intake_month ? prog.intake_month.trim() : null,
                    research_focused: prog.research_focused === 'true',
                    thesis_required: prog.thesis_required === 'true',
                    internship_included: prog.internship_included === 'true',
                    faculty_advisors: prog.faculty_advisors.trim()
                },
                create: {
                    name: prog.name.trim(),
                    level: prog.level.trim(),
                    field_of_study: prog.field_of_study.trim(),
                    university_id: university.id,
                    duration_months: parseInt(prog.duration_months) || null,
                    language: prog.language.trim(),
                    intake_month: prog.intake_month ? prog.intake_month.trim() : null,
                    research_focused: prog.research_focused === 'true',
                    thesis_required: prog.thesis_required === 'true',
                    internship_included: prog.internship_included === 'true',
                    faculty_advisors: prog.faculty_advisors.trim()
                }
            });
        } else {
            console.warn(`University "${prog.university_name}" not found for program "${prog.name}".`);
        }
    }
    console.log('Programs seeded.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
