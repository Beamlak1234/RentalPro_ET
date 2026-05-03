const queue: string[] = []

export function enqueueAccessFlashBanner(message: string): void {
  queue.push(message)
}

export function dequeueAccessFlashBanner(): string | null {
  return queue.shift() ?? null
}
