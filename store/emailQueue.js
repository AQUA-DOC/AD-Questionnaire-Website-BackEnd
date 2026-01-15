// Simple in-memory store (singleton per Node process)

const queue = [];

export function enqueueEmail(data) {
  queue.push({
    data,
    queuedAt: new Date().toISOString(),
  });
}

export function drainEmailQueue() {
  const batch = [...queue];
  queue.length = 0; // clear in place
  return batch;
}

export function queueSize() {
  return queue.length;
}