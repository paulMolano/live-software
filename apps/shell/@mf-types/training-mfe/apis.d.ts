
    export type RemoteKeys = 'training-mfe/App' | 'training-mfe/RemoteEntry';
    type PackageType<T> = T extends 'training-mfe/RemoteEntry' ? typeof import('training-mfe/RemoteEntry') :T extends 'training-mfe/App' ? typeof import('training-mfe/App') :any;