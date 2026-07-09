import type { CreateTrainingSessionInput, TrainingSessionDto, TrainingSessionFilters, TrainingSummaryDto } from '@live-software/contracts';
export declare function getTrainingSummary(): Promise<TrainingSummaryDto>;
export declare function getTrainingSessions(_filters: TrainingSessionFilters): Promise<TrainingSessionDto[]>;
export declare function createTrainingSession(input: CreateTrainingSessionInput): Promise<TrainingSessionDto>;
