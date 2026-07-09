import type {
	CreateTrainingSessionInput,
	TrainingSessionDto,
	TrainingSessionFilters,
	TrainingSummaryDto,
} from '@live-software/contracts';

let sessionCounter = 4;
let trainingSummaryFetchCount = 0;

const mockSessions: TrainingSessionDto[] = [
	{
		id: 'training-session-3',
		date: '2026-07-07T18:30:00.000Z',
		type: 'strength',
		title: 'Torso fuerza',
		durationMinutes: 52,
	},
	{
		id: 'training-session-2',
		date: '2026-07-05T08:15:00.000Z',
		type: 'cardio',
		title: 'Zona 2',
		durationMinutes: 38,
	},
	{
		id: 'training-session-1',
		date: '2026-07-03T17:45:00.000Z',
		type: 'mobility',
		title: 'Movilidad cadera',
		durationMinutes: 24,
	},
];

function delay<TValue>(value: TValue): Promise<TValue> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(value), 160);
	});
}

export async function getTrainingSummary(): Promise<TrainingSummaryDto> {
	trainingSummaryFetchCount += 1;
	const lastSession = mockSessions[0];

	return delay({
		weeklySessions: mockSessions.length,
		weeklyTarget: 4,
		lastSessionDate: lastSession?.date ?? null,
		currentStreak: 3,
		debug: {
			fetchCount: trainingSummaryFetchCount,
			fetchedAt: new Date().toISOString(),
		},
	});
}

export async function getTrainingSessions(
	_filters: TrainingSessionFilters,
): Promise<TrainingSessionDto[]> {
	return delay([...mockSessions]);
}

export async function createTrainingSession(
	input: CreateTrainingSessionInput,
): Promise<TrainingSessionDto> {
	const session: TrainingSessionDto = {
		id: `training-session-${sessionCounter}`,
		date: new Date().toISOString(),
		type: input.type,
		title: input.title,
		durationMinutes: input.durationMinutes,
	};

	sessionCounter += 1;
	mockSessions.unshift(session);

	return delay(session);
}
