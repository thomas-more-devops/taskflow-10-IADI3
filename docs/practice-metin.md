# Git practice - Metin
Exercise 1: Interactive rebase
Exercise 2: Cherry-pick
Exercise 3: Stash
WIP: working on search feature

## git log --oneline BEFORE the interactive rebase
```
9e18ab0 more stuff
0d7d349 fix typo
34ab3e8 wip
d2945fb docs: add practice file
cc1af0d Merge pull request #31 from thomas-more-devops/release/v2.0.0
```

## git log --oneline AFTER the interactive rebase
```
ed1a200 more stuff
9898ccf docs: add cherry-pick section
ee558f5 docs: add practice file with rebase section
cc1af0d Merge pull request #31 from thomas-more-devops/release/v2.0.0
ea158eb release: prepare TaskFlow v2.0.0
```

## git reflog (latest 30 entries)
```
d934b90 HEAD@{0}: checkout: moving from hotfix/urgent-bug to practice/metin
701a66f HEAD@{1}: commit: fix: apply urgent bug fix
cc1af0d HEAD@{2}: checkout: moving from main to hotfix/urgent-bug
cc1af0d HEAD@{3}: checkout: moving from practice/metin to main
d934b90 HEAD@{4}: reset: moving to HEAD
d934b90 HEAD@{5}: cherry-pick: feat: add cherry-pick note
ed1a200 HEAD@{6}: checkout: moving from practice/metin-feature to practice/metin
2fee81b HEAD@{7}: commit: docs: add unrelated change
1c960b6 HEAD@{8}: commit: feat: add cherry-pick note
ed1a200 HEAD@{9}: checkout: moving from practice/metin to practice/metin-feature
ed1a200 HEAD@{10}: rebase (finish): returning to refs/heads/practice/metin
ed1a200 HEAD@{11}: rebase (pick): more stuff
9898ccf HEAD@{12}: rebase (reword): docs: add cherry-pick section
438bb9e HEAD@{13}: rebase (reword): fix typo
ee558f5 HEAD@{14}: rebase (squash): docs: add practice file with rebase section
d2945fb HEAD@{15}: rebase (start): checkout HEAD~4
9e18ab0 HEAD@{16}: commit: more stuff
0d7d349 HEAD@{17}: commit: fix typo
34ab3e8 HEAD@{18}: commit: wip
d2945fb HEAD@{19}: commit: docs: add practice file
cc1af0d HEAD@{20}: checkout: moving from main to practice/metin
cc1af0d HEAD@{21}: checkout: moving from main to main
cc1af0d HEAD@{22}: pull: Fast-forward
ef03e3e HEAD@{23}: checkout: moving from main to main
ef03e3e HEAD@{24}: pull: Fast-forward
a481dc7 HEAD@{25}: checkout: moving from main to main
a481dc7 HEAD@{26}: pull: Fast-forward
16753f9 HEAD@{27}: checkout: moving from docs/test-issue-linking to main
1762936 HEAD@{28}: commit: docs: mention issue templates in readme
16753f9 HEAD@{29}: checkout: moving from main to docs/test-issue-linking
```

## git stash list (taken before git stash pop)
```
stash@{0}: On practice/metin: WIP: working on search feature
```
