module.exports = {
  root: true,
  ignorePatterns: [
    '**/dist/**',
    '**/node_modules/**',
    '**/.next/**',
    'apps/shell/@mf-types/**',
  ],
  plugins: ['@nx', '@typescript-eslint'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: 'type:app',
                onlyDependOnLibsWithTags: ['scope:shared'],
              },
              {
                sourceTag: 'scope:shared',
                onlyDependOnLibsWithTags: ['scope:shared'],
              },
            ],
          },
        ],
      },
    },
  ],
};
