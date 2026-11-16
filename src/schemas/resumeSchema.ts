import {z} from "zod";

export const resumeSchema=z.object({
    resume:z.object({
        mainHeaderSection:z.object({
            firstName:z.string(),
            lastName:z.string(),
            profession:z.string(),
        }),
        subHeaderSection:z.object({
            // phoneNumber:z.e164(),
            phoneNumber:z.string(),
            emailLink:z.string().email(),
            // NOTE: OpenAI structured outputs rejects `format: "uri"`, which is
            // what `z.string().url()` emits. Keep these plain strings.
            linkedInLink:z.string().describe("LinkedIn profile URL, or empty string if the resume has none"),
            githubLink:z.string().describe("GitHub profile URL, or empty string if the resume has none"),
            portfolioLink:z.string().describe("Portfolio URL, or empty string if the resume has none"),
        }),
        professionalSummary:z.string(),
        technicallSkills:z.array(z.string()),
        professionalExperience:z.array(z.object({
            role:z.string(),
            company:z.string(),
            duration:z.string(),
            responsibilies:z.array(z.string())
        })),
        education:z.array(z.string()),
        certifications:z.array(z.string()),
    })
})