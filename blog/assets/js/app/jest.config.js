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
    "components": "<rootDir>/src/components/",
    "services": "<rootDir>/src/services/",
    "store": "<rootDir>/src/store/"
  },
  "moduleFileExtensions": ["js", "jsx", "ts", "tsx", "json", "node"],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
}