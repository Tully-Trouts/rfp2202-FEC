# rfp2202-FEC

## GIT WORKFLOW
## What to do **everyday** _before_ doing **ANY** work:
- [ ] Make sure your **main** branch is **up to date** _(make sure to CHECKOUT first or you might merge )_:
```
git checkout main
git pull origin main
```
- [ ] Make sure **develop** branch is **up to date** _(make sure to CHECKOUT first!)_:
```
git checkout develop
git pull origin develop
```
- [ ] Checkout a **NEW** branch for each **ticket** you work on:
```
git checkout -b readme_updates
```
- [ ] _**Immediately**_ push newly created branches up to origin:
```
git push origin readme_updates
```
- [ ] Do work, make frequent commits


## What to do after _**completing a ticket**_:
- [ ] Make your final commit, and push your branch up to origin:
```
git push origin readme_updates
```
- [ ] Go to **Github** and submit a _Pull Request_ to **develop**
- [ ] Ping Slack for code review
- [ ] **Do not do any more work on a branch with a pending Pull Request**
- [ ] Reviewer(s) should **delete** the new branch after merging to prevent stale branches

## What to do when _**starting a new a ticket**_:
- [ ] Make sure **develop** branch is **up to date** _(make sure to CHECKOUT first!)_:
```
git checkout develop
git pull origin develop
```
- [ ] Checkout a **NEW** branch for the new **ticket** you're working on:
```
git checkout -b more_readme_updates
```

## What to do _**at the end of the day**_:
- [ ] Make a final commit, push branch to origin, submit a PR to **develop**


## Tully Trouts Project Atelier
Follows suggested plan in Writing a Compelling README in Learn

## Overview
Fill in brief description of outline.

## Table of Contents
Link to different sections.

## Description
More detailed outline.

## Installation
1. Open an integrated terminal at the package.json level in the file directory
2. Run `npm install`


## Usage
Further details on how project is meant to be used.
