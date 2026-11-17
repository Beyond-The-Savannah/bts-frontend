import { z } from "zod";

const requirementStatus = z.enum(["proven", "partial", "not_found"]);

export const resumeSchema2 = z.object({
  // ---------- JOB A: analysis ----------
  overallScore: z.number().describe("0-100, computed from the breakdown using the stated weights"),
  scoreLabel: z.string().describe("e.g. 'Strong match', from the scoring framework"),
  scoreJustification: z.string(),

  scoreBreakdown: z.object({
    requiredSkills: z.number().describe("0-100, weight 35%"),
    experienceRelevance: z.number().describe("0-100, weight 30%"),
    keywordCoverage: z.number().describe("0-100, weight 15%"),
    educationAndCertifications: z.number().describe("0-100, weight 10%"),
    atsFormatting: z.number().describe("0-100, weight 10%, of the ORIGINAL resume"),
  }),

  requirements: z.array(
    z.object({
      requirement: z.string().describe("Requirement as written in the job description"),
      importance: z.enum(["must_have", "preferred"]),
      status: requirementStatus,
      evidence: z.string().describe("Verbatim resume quote, or 'Not found / Unable to determine from resume.'"),
      location: z.string().describe("Resume section/page of the quote, or empty"),
    })
  ),

  strengths: z.array(z.object({ strength: z.string(), evidence: z.string() })),

  missingRequirements: z.array(
    z.object({
      requirement: z.string(),
      importance: z.enum(["must_have", "preferred"]),
      howToAddIfTrue: z.string().describe("Where/how to add it to the resume if the candidate genuinely has it"),
    })
  ),

  atsFormatIssues: z.array(z.string()).describe("Problems in the original resume's structure/formatting"),
  recommendations: z.array(z.string()).describe("Training/skills suggestions. NOT resume facts."),
  summary: z.string(),
  cvRevampRecommended: z.boolean().describe("true only if score < 70 AND there is an industry mismatch"),

  // ---------- JOB B: regenerated resume ----------
  regeneratedResume: z.object({
    fullName: z.string(),
    // professionalBackground: z.string().describe("Empty string if not supported by the resume"),
    professionalTitle:z.string().describe("Empty string if not supported by the resume"),
    contact: z.object({
      email: z.string(),
      phone: z.string(),
    //   location: z.string(),
      links: z.array(z.string()),
    }),
    professionalSummary: z.string(),
    technicalSkills: z.array(
      z.object({ category: z.string().describe("Empty string if uncategorised"), skills: z.array(z.string()) })
    ),
    experience: z.array(
      z.object({
        title: z.string(),
        employer: z.string(),
        dates: z.string(),
        bullets: z.array(z.string()),
      })
    ),
    education: z.array(
      z.object({ degree: z.string(), institution: z.string(), dates: z.string() })
    ),
    certifications: z.array(z.string()),
  }),

  keywordsMirrored: z.array(
    z.object({
      jobKeyword: z.string(),
      resumeEvidence: z.string().describe("Verbatim resume text that justified using this keyword"),
    })
  ),

  itemsToAddManually: z.array(z.string()).describe("Things the resume lacks. 'Add only if true.'"),
});

export type ResumeAnalysis = z.infer<typeof resumeSchema2>;