interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: Error) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly successCallback: SuccessCallback,
		private readonly errorCallback: ErrorCallback,
	) {}

	public async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);
			if (!req.ok) {
				throw new Error(`Error on check service ${url}`);
			}
			this.successCallback();

			return true;
		} catch (error) {
			this.errorCallback(error as Error);

			return false;
		}
	}
}
