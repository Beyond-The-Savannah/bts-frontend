"use server";

import { Client } from "@upstash/workflow";

const baseUrl = process.env.PUBLIC_BASE_URL;
const client = new Client({ token: process.env.QSTASH_TOKEN! });

export async function SendAllCandidatesEmailInvites() {
  const { workflowRunId } = await client.trigger({
    url: `${baseUrl}/api/send-bts-candidates-invite`,
  });
  return workflowRunId;
}
