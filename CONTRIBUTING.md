# Contributing to CTRCraft

Thank you for your interest in contributing to CTRCraft! This document provides guidelines and instructions for contributing to our AI-powered YouTube thumbnail generator.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style and Standards](#code-style-and-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before contributing, make sure you have:

- Node.js 18+ installed
- Git installed and configured
- A GitHub account
- Basic knowledge of React, Next.js, and TypeScript

### Setting Up Your Development Environment

1. **Fork the Repository**
   ```bash
   # Go to the CTRCraft repository on GitHub
   # Click the "Fork" button in the top-right corner
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ctrcraft.git
   cd ctrcraft
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/ctrcraft.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your development credentials
   ```

6. **Set Up Database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

7. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Keep Your Fork Updated

Before starting any new work, sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
# or
git checkout -b docs/update-readme
```

### 3. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update tests if applicable
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Test your changes manually
npm run dev
```

### 5. Commit Your Changes

Follow our commit message guidelines (see below).

### 6. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

- Go to your fork on GitHub
- Click "New Pull Request"
- Select your branch
- Fill out the PR template
- Submit the PR

## Branch Naming Convention

Use descriptive branch names that indicate the type of change:

### Format
```
<type>/<description>
```

### Types

- **feature/**: New features or enhancements
  - `feature/user-dashboard`
  - `feature/thumbnail-history`
  - `feature/credit-system`

- **fix/**: Bug fixes
  - `fix/auth-redirect-issue`
  - `fix/image-generation-error`
  - `fix/database-connection`

- **docs/**: Documentation updates
  - `docs/api-documentation`
  - `docs/setup-guide`
  - `docs/contributing-guide`

- **refactor/**: Code refactoring
  - `refactor/auth-middleware`
  - `refactor/database-queries`
  - `refactor/ui-components`

- **test/**: Adding or updating tests
  - `test/user-authentication`
  - `test/image-generation`
  - `test/api-endpoints`

- **chore/**: Maintenance tasks
  - `chore/update-dependencies`
  - `chore/cleanup-unused-code`
  - `chore/update-config`

### Examples of Good Branch Names

✅ **Good:**
- `feature/thumbnail-preview-modal`
- `fix/google-oauth-redirect-loop`
- `docs/api-endpoints-documentation`
- `refactor/prisma-client-setup`
- `test/user-credit-system`

❌ **Bad:**
- `new-stuff`
- `fix`
- `updates`
- `changes`
- `feature`

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```bash
feat(auth): add Google OAuth integration
fix(api): resolve image generation timeout issue
docs(readme): update setup instructions
refactor(ui): extract reusable button component
test(auth): add unit tests for login flow
chore(deps): update Next.js to version 15.5.3
```

### Commit Message Best Practices

- Use the imperative mood ("add feature" not "added feature")
- Keep the first line under 50 characters
- Capitalize the first letter
- Don't end with a period
- Use the body to explain what and why, not how
- Reference issues in the footer: `Fixes #123`

## Pull Request Guidelines

### PR Title Format
```
<type>: <description>
```

Examples:
- `feat: Add thumbnail preview modal`
- `fix: Resolve Google OAuth redirect loop`
- `docs: Update API documentation`

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] Browser testing

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Related Issues
Closes #123
```

### PR Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: At least one maintainer must approve
3. **Testing**: Verify changes work as expected
4. **Documentation**: Update docs if needed
5. **Merge**: Squash and merge when approved

## Code Style and Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add type annotations where helpful
- Use async/await instead of Promises when possible

### React/Next.js

- Use functional components with hooks
- Follow Next.js best practices
- Use proper prop types or TypeScript interfaces
- Implement proper error boundaries
- Use Next.js Image component for images

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use consistent spacing and typography
- Follow the existing design system

### File Organization

- Keep components in `/src/components`
- Use barrel exports (`index.ts`) for clean imports
- Group related files together
- Use descriptive file names

## Testing

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests for React components
- Aim for good test coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Document API endpoints
- Explain business logic
- Keep README files updated

### Pull Request Documentation

- Include clear descriptions
- Add screenshots for UI changes
- Document breaking changes
- Update relevant documentation

## Issue Reporting

### Before Creating an Issue

1. Check existing issues
2. Search closed issues
3. Verify it's not a duplicate

### Issue Template

```markdown
## Bug Report / Feature Request

### Description
Clear and concise description of the issue or feature request.

### Steps to Reproduce (for bugs)
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

### Expected Behavior
What you expected to happen.

### Actual Behavior
What actually happened.

### Environment
- OS: [e.g., Windows 10, macOS 12.0]
- Browser: [e.g., Chrome 91, Firefox 89]
- Node.js version: [e.g., 18.0.0]

### Additional Context
Add any other context about the problem here.
```

## Getting Help

If you need help:

1. Check the documentation
2. Search existing issues
3. Ask in discussions
4. Contact maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to CTRCraft! 🚀
