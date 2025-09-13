import { createClient } from "next-sanity"

export const client = createClient({
  projectId: '02bwb137', // from sanity.io/manage
  dataset: "production",
  apiVersion: "2025-09-13", // use today's date
  useCdn: true, // `false` if you need freshest data
})
