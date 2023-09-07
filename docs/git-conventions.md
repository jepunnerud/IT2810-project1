## Git conventions

### Issues

Always connect your commits and merge requests to at least one issue on GitLab.

---

### Branching

Branches should have names describing what you are doing on that branch. The name should be in kebab-case, thus in the format `something-something` whith lowercase letters and a dash if more than one word is needed.

---

### Commits

Commit messages shuld be on this format:

```
GL-xxx: This is my commit message

Co-authored-by: Firstname LastName <username@stud.ntnu.no>
```

The `GL-xxx` will link the commit to an issue on GitLab with issue number xxx.

### Merge requests

```
- I did this
- And this

Closes issue #1 #2 etc

Co-authored-by: Firstname Lastname <username@stud.ntnu.no>
```
