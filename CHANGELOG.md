# Changelog

All notable changes to the Pass Manager project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Round 2: Documentation & Cleanup**
    - Added comprehensive JSDoc to all 17 utility files in `web/src/utils/`.
    - Cleaned up formatting and removed trailing newlines in utility files.
    - Updated project constants and configuration metadata.
- **Round 2: Unit Testing**
    - Setup Vitest in the `web/` directory for frontend unit testing.
    - Added 41 unit tests for core utilities (`validation.ts`, `numbers.ts`, `address.ts`).
    - Fixed several type errors in `object.ts` and `array.ts` identified during testing.
- **Clarity 4 Enhancements**
    - Added `check-contract-health` and `log-diagnostic` functions to `pass-manager.clar`.
- Initial project setup with Clarity contract
- Next.js frontend with wallet connection
- Comprehensive test suite
- Deployment scripts for testnet
- CI/CD workflows
- Documentation (README, DEPLOYMENT, ARCHITECTURE)
- Analytics utility contract
- TypeScript types for contract interactions
- Custom React hooks for contract operations
- UI components (Header, Footer, PassStatus, Analytics, LoadingSpinner)
- Transaction history component
- Toast notification system
- Validation utilities
- Formatting utilities

### Changed
- Improved Header component with better styling
- Enhanced error handling with ErrorBoundary

### Fixed
- Line ending warnings in Git (Windows compatibility)

## [0.1.0] - 2025-12-11

### Added
- Initial release
- Pass Manager smart contract with fee splitting
- Frontend application
- Test suite
- Basic documentation




