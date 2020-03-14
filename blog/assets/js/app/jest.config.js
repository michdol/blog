module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "moduleDirectories": ['node_modules', 'src'],
  "moduleNameMapper": {
    "src": "<rootDir>/src/",
    "api": "<rootDir>/src/api/",
    "store": "<rootDir>/src/store/",
    "components": "<rootDir>/src/components/",
  },
  "moduleFileExtensions": ["js", "jsx", "ts", "tsx", "json", "node"],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
}