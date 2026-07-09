import type { TrainingSessionFilters } from '@live-software/contracts';
export declare function useTrainingSummary(): import("@tanstack/react-query").UseQueryResult<NoInfer<import("@live-software/contracts").TrainingSummaryDto>, Error>;
export declare function useTrainingSessions(filters: TrainingSessionFilters): import("@tanstack/react-query").UseQueryResult<NoInfer<import("@live-software/contracts").TrainingSessionDto[]>, Error>;
