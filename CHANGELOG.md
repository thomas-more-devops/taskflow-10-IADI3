# Changelog

All notable changes to TaskFlow are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** - breaking changes
- **MINOR** - new features, backward compatible
- **PATCH** - bug fixes, backward compatible

## [Unreleased]

## [2.0.0] - 2026-11-05

Enhanced task management release.

### Added
- Task priority system with High, Medium and Low levels, priority badges,
  sorting and filtering ([#10], [#20])
- Due date system ([#12])
- Task categories with colour-coded badges and category filtering ([#11], [#15])
- Search tasks by text ([#13], [#14])
- Filter tasks by status: All, Pending and Completed ([#13], [#14])

### Improved
- Combined search, status and category filtering.
- Improved task management and usability.

## [1.1.0] - 2026-10-23

First feature release. Adds the two v2.0 enhancements that have been completed,
plus the remaining files expected of a professional repository.

Both features are backward compatible: tasks saved by 1.0.0 still load, and
tasks without a category fall back to "Uncategorized".

### Added
- Search tasks by text, filtering the list as you type ([#13], [#14])
- Filter tasks by status: All, Pending, Completed ([#13], [#14])
- A distinct "No matching tasks" state, separate from the empty-list state ([#14])
- Task categories (Work, Personal, Shopping) with colour-coded badges and
  category filtering ([#11], [#15])
- Pull request template ([#16])
- Contributing guidelines in `docs/CONTRIBUTING.md` ([#17])
- Code of conduct ([#18])

### Changed
- `renderTasks()` now renders only the tasks matching the active filters.
  The stored task list is never modified, and the statistics continue to count
  all tasks rather than just the visible ones ([#14], [#15])
- Search, status and category filters combine rather than overriding each other ([#15])

### Accessibility
- `aria-pressed` on the status filter buttons, `aria-label` on the search input,
  and `role="group"` on the filter button set ([#14])

## [1.0.0] - 2026-10-16

Initial release: the TaskFlow application together with the documentation and
error handling completed during week 2.

### Added
- Task management: create, complete, edit and delete tasks ([base])
- Persistence through `localStorage`, surviving a page reload ([base])
- Task statistics: total, completed and pending counts ([base])
- Responsive layout for desktop, tablet and mobile ([base])
- Expanded README with live demo, project status, course context and
  development workflow sections ([#1])
- Installation and setup guide in `docs/SETUP.md` ([#2])
- Feature documentation in `docs/FEATURES.md` ([#3])
- MIT licence ([#4])
- Explanatory comments throughout the HTML, documenting the element IDs that
  `scripts/app.js` depends on ([#5])
- Comments recording the CSS design decisions: palette, elevation and radius
  scales, and the shared motion token ([#6])
- Architecture documentation in `docs/ARCHITECTURE.md` ([#8])
- All four team members credited, and the v2.0 roadmap items assigned to
  feature owners ([#9])

### Fixed
Nine defects in `scripts/app.js`, each verified against the previous
behaviour ([#7]):

- A corrupt `taskflow_counter` produced `NaN` task IDs. Because `NaN !== NaN`,
  `find()` could never match them again and toggle, edit and delete silently
  stopped working
- Stored tasks that were not an array threw an uncaught
  `TypeError: this.tasks is not iterable`, leaving the application dead
- Malformed task entries threw while reading `'completed'` of `null`
- `escapeHtml()` threw on a non-string value
- A renamed element ID threw inside the constructor, leaving a half-built
  application and only a console error
- Acting on an unknown task ID silently did nothing
- Task descriptions had no length limit
- `removeChild()` could throw on an already-detached notification node
- `exportTasks()` had no error handling, and revoked its object URL
  immediately after `click()`, which can cancel the download

[Unreleased]: https://github.com/thomas-more-devops/taskflow-10-IADI3/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/thomas-more-devops/taskflow-10-IADI3/releases/tag/v2.0.0
[1.1.0]: https://github.com/thomas-more-devops/taskflow-10-IADI3/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/thomas-more-devops/taskflow-10-IADI3/releases/tag/v1.0.0

[base]: https://github.com/thomas-more-devops/taskflow-10-IADI3/commit/11db952
[#1]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/1
[#2]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/2
[#3]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/3
[#4]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/4
[#5]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/5
[#6]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/6
[#7]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/7
[#8]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/8
[#9]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/9
[#10]: https://github.com/thomas-more-devops/taskflow-10-IADI3/issues/10
[#11]: https://github.com/thomas-more-devops/taskflow-10-IADI3/issues/11
[#12]: https://github.com/thomas-more-devops/taskflow-10-IADI3/issues/12
[#13]: https://github.com/thomas-more-devops/taskflow-10-IADI3/issues/13
[#14]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/14
[#15]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/15
[#16]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/16
[#17]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/17
[#18]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/18
[#20]: https://github.com/thomas-more-devops/taskflow-10-IADI3/pull/20