export class Semaphore {
	private waiting: Array<() => void> = [];

	constructor(private capacity: number) {}

	async acquire() {
		this.capacity--;
		if (this.capacity < 0) {
			// eslint-disable-next-line @typescript-eslint/return-await
			return new Promise<void>((resolve) => this.waiting.push(resolve));
		}
	}

	release(): void {
		this.capacity++;
		this.waiting.shift()?.();
	}
}
