# rfp2202-FEC
charlie making changes

changes here






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
- [ ] Cut a new branch (and push it to origin) to begin work on another ticket
- [ ] Reviewer(s) should **delete** the new branch after merging to prevent stale branches



