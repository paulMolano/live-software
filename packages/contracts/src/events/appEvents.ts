export type AppEvent =
	| {
			type: 'training.session.created';
			payload: {
				sessionId: string;
			};
	  }
	| {
			type: 'finance.transaction.created';
			payload: {
				transactionId: string;
			};
	  }
	| {
			type: 'finance.debt.updated';
			payload: {
				debtId: string;
			};
	  }
	| {
			type: 'platform.remote.error';
			payload: {
				remoteName: string;
				message: string;
			};
	  };

export type AppEventType = AppEvent['type'];

export type AppEventByType<TType extends AppEventType> = Extract<
	AppEvent,
	{ type: TType }
>;

export type AppEventHandler<TType extends AppEventType> = (
	event: AppEventByType<TType>,
) => void;

