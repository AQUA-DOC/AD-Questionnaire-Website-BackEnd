import { Resend } from "resend";
import { drainEmailQueue, queueSize } from "./store/emailQueue.js"; // adjust path
import { logger } from "./utils/logger.js";


const resend = new Resend(process.env.RESEND_API_KEY);

// Resend batch limit is 100 per call
const BATCH_SIZE = 100;

// Small helper
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * Convert your queued objects into Resend email payloads.
 * Your queue stores: { data, queuedAt }
 * Where data should be a Resend "send email" object: { from, to, subject, html, ... }
 */
function mapQueueItemToResendEmail(email) {
    let thisEmail = email.data;

    // TODO harden this to not accept variables NOT in a valid email format.

  return thisEmail;
}

/**
 * Runs one flush cycle: drain queue, send in /emails/batch calls (<=100 each)
 */
export async function flushEmailQueueOnce() {
  const batchItems = drainEmailQueue(); // empties queue
  if (batchItems.length === 0) return { sent: 0, batches: 0 };

  const emails = batchItems.map(mapQueueItemToResendEmail);
  const chunks = chunk(emails, BATCH_SIZE);

  let sent = 0;

  for (const emailsChunk of chunks) {
    // Resend SDK: resend.batch.send([...])
    const { data, error } = await resend.batch.send(emailsChunk);

    if (error) {
      // IMPORTANT:
      // If you want reliability, you should re-enqueue the failed chunk (or send to a dead-letter queue).
      // For now, we log and continue.
      // console.error("Resend batch send error:", error);
      logger.error("Error sending email.", {error} );
      logger.error("Data from Error:", {data});
      continue;
    }

    // data is array of results; count as "attempted sent"
    sent += emailsChunk.length;
     console.log("Batch sent results:", data);
  }

  // console.log(`sent = ${sent}`)
  // console.log(`batches = ${chunks.length}`);
  return { sent, batches: chunks.length };
}

/**
 * Starts a timer that runs the flush once per hour.
 * Call this once when your server boots.
 */
export function startHourlyEmailBatchWorker() {
  // Optional: run once at startup so you don't wait an hour
  // (comment out if you ONLY want hourly)
  //flushEmailQueueOnce().catch(err => console.error("Initial flush failed:", err));

  setInterval(() => {
    // Don’t overlap runs if one is still processing (simple lock)
    flushEmailQueueOnce().catch(err => console.error("Hourly flush failed:", err));
  }, 60 * 1000);

  console.log("Hourly email batch worker started.");
}