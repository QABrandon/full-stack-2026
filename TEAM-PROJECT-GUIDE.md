# Team Project Guide (Optional)

Most projects in this curriculum can be done **solo or in a small team (2-4 people)**. Solo is the default. This guide is for the rare student or pair who wants to try team mode — it walks you from "we want to team up" to "we shipped" without you having to invent the workflow yourself.

For final-project specifics (rubric, kickoff, idea/discovery), see [FS12-Week-14/Session-3/Final-Project](FS12-Week-14/Session-3/Final-Project).

If you've never done a team project before, **read this whole document before forming a team**. The collaboration overhead is real and you should know what you're signing up for.

---

## Should you team up?

Be honest with yourself before opting in. Team mode is a different skill set, not a shortcut.

### Reasons to do it
- You want practice with the **real-world** day-to-day of working with other devs (PRs, code review, merge conflicts, async standups).
- You want to ship a project bigger than what one person can build alone (more features, polish, deployment).
- You learn better when you have to explain your code out loud to a teammate.

### Reasons NOT to do it
- You think it'll be less work. **It is more work**, not less. Coordination overhead is real.
- You want to skip a topic. Team mode is not "I do the frontend, you do the auth, neither of us learns the other half." See the rules below.
- Your schedules don't overlap at all. You need at least one shared 60-90 minute window per week and reliable async communication in between.
- You haven't completed the merge-conflict practice from [FS12-Week-4/Session-1/Team-Practice/merge-conflict-practice](FS12-Week-4/Session-1/Team-Practice/merge-conflict-practice). That assignment is the floor for everything in this guide.

If you're still in, read on.

---

## Prerequisites

Before forming a team you must have personally done all of these:

- [ ] Completed [FS12-Week-4/Session-1/Team-Practice/merge-conflict-practice](FS12-Week-4/Session-1/Team-Practice/merge-conflict-practice) end-to-end (see [MERGE-CONFLICT-GUIDE.md](FS12-Week-4/Session-1/Team-Practice/merge-conflict-practice/MERGE-CONFLICT-GUIDE.md)). You should be comfortable creating, encountering, and resolving merge conflicts on your own.
- [ ] Have a GitHub account and have pushed at least one repo before.
- [ ] Have done at least one solo project that uses the same stack as the project you're picking. Don't choose team mode for the first project you ever try in a new stack — you'll just slow each other down.

---

## Forming a team

- **Size: 2-4 people.** Larger teams need more coordination than the curriculum justifies. If 5+ people want to work together, split into two teams.
- **Same project.** Everyone on the team works on the same project (e.g., all 3 of you do Option A). Mixing projects across one team makes review impossible.
- **Pick a Team Lead.** Not a manager — just one person who owns the GitHub repo, schedules the sync sessions, and resolves disputes about scope. Rotate this if your project has multiple sprints.

---

## The Workflow

### Day 1 — Sync Kickoff (90 minutes, EVERYONE present)

Get on a call (or in a room) together. Do not skip this even if you're remote. By the end of Day 1 you should have:

1. **One GitHub repo.** Team Lead creates it. Everyone is added as a collaborator.
2. **Branch protection enabled on `main`.** Settings → Branches → Add rule for `main`:
   - Require a pull request before merging
   - Require at least 1 approval
   - Require conversation resolution before merging
   - Do NOT allow force pushes to main
3. **The "shared core" of the project built TOGETHER.** What counts as "shared core" depends on the project but it's typically the foundation everyone else's work depends on:
   - **Auth-heavy projects** (see [FS12-Week-13](FS12-Week-13) — [bcrypt](FS12-Week-13/Session-1/01-bcrypt), [user auth](FS12-Week-13/Session-1/02-user-auth), [JWT](FS12-Week-13/Session-1/03-jwt), [protected routes middleware](FS12-Week-13/Session-2/01-protected-routes-middleware), [authorization/roles](FS12-Week-13/Session-2/02-authorization)): build register + login + JWT middleware as a team. Everyone watches every line. Take turns at the keyboard. This is non-negotiable — if the auth lane belongs to one person, the rest of the team doesn't actually learn auth.
   - **API-heavy projects** (see [FS12-Week-11](FS12-Week-11) — [Express setup](FS12-Week-11/Session-1/03-express-setup), [routing](FS12-Week-11/Session-2/01-routing), [middleware](FS12-Week-11/Session-2/02-middleware), [error handling](FS12-Week-11/Session-2/03-error-handling), [Express API project](FS12-Week-11/Session-3/module-078-express-api-project)): agree on the data shapes and route conventions. Build one example route end-to-end together so everyone knows the pattern.
   - **Frontend-heavy projects** (see [FS12-Week-9](FS12-Week-9) and [FS12-Week-10](FS12-Week-10) — [useState](FS12-Week-9/Session-2/2-useState), [lists & forms](FS12-Week-9/Session-2/5-list-keys-forms), [useEffect](FS12-Week-10/Session-1/1-useEffect-component-lifecycle), [React Router setup](FS12-Week-10/Session-2/module-59-60-react-router-setup-links-navigation)): agree on the file structure, routing, and API client. Build the layout shell together.
4. **Lanes assigned.** Each person picks a feature slice they own (see "Feature Lanes" below). Write them down in the README.
5. **Definition of Done agreed.** What does "this PR is ready to merge" mean for your team? At minimum: code works locally, README updated if needed, at least one teammate has approved.
6. **Async cadence agreed.** When are you syncing? A short check-in 2-3 times per week is the sweet spot — daily is overkill, weekly is too sparse.

### Day 2+ — Async Feature Lanes

Each teammate works on their own feature branch and opens a PR when ready.

#### The async loop

```
1. Pull latest main
2. Create a feature branch:   git checkout -b feat/your-thing
3. Code your feature
4. Commit small, often, with descriptive messages
5. Push your branch:           git push -u origin feat/your-thing
6. Open a PR on GitHub
7. Tag a teammate for review
8. Address review comments
9. Merge once approved
10. Pull main, repeat
```

You will hit merge conflicts. That's the whole reason we made you do the [merge-conflict-practice](FS12-Week-4/Session-1/Team-Practice/merge-conflict-practice) first. Resolve them on your branch (`git pull origin main`, fix conflicts, commit, push) — never on main.

---

## Feature Lanes

Lanes should be **vertical slices**, not horizontal layers. "I do all the frontend, you do all the backend" sounds clean but in practice it means one person blocks the other constantly. Better: each person owns a *feature*, including its frontend, backend, and tests.

For example, on a curated-lists style final project (see the [Final Project](FS12-Week-14/Session-3/Final-Project) and [rubric](FS12-Week-14/Session-3/Final-Project/module-117-final-major-project/final-full-stack-project-rubric.md)):

| Lane | Owns frontend | Owns backend |
| --- | --- | --- |
| Lists CRUD | List page, list form | GET/POST/PUT/DELETE /lists |
| Categories | Category page, dropdown | GET/POST/DELETE /categories |
| Admin Panel | Admin page, user table | GET/POST /admin/users |

For an auth-heavy project, every lane should include **at least one protected route** so everyone gets practice applying `authenticateToken` and `requireRole(...)` to their own code. Don't let one teammate own all the auth wiring.

---

## Code Review Rules

Code review is the most important learning lever in team mode. Take it seriously.

- **Every PR needs at least one approval from another teammate.** Branch protection enforces this.
- **The reviewer must understand the code.** If you're approving a PR you don't understand, you're cheating yourself out of the learning. Ask questions in the PR comments — that's what they're for.
- **Don't approve out of politeness.** "Looks good!" with no real review is worthless. Look for: does it work? does it match our conventions? are there obvious bugs? could the next person read it?
- **Small PRs > big PRs.** A 50-line PR gets a real review. A 500-line PR gets a rubber stamp. Break work down.

---

## Required Artifacts (in your repo)

Add these to your project so the instructor (and you, in 6 months) can see what happened:

1. **README.md "Team" section** with:
   - Team name and members
   - Each member's lane
   - Link to the project board (GitHub Projects, Trello, whatever)
2. **At minimum 1 PR per teammate** — and each PR shows another teammate's review. Solo "push to main" commits don't count.
3. **A short retro doc** at `/docs/RETRO.md` (one paragraph each):
   - What went well
   - What didn't
   - What would you change if you did this again
4. **Co-authored commits when you pair on something.** Use the GitHub `Co-Authored-By:` trailer:
   ```
   Add login form

   Co-Authored-By: Alice Smith <alice@example.com>
   Co-Authored-By: Bob Jones <bob@example.com>
   ```

---

## Common Pitfalls

### "We split the work cleanly and never talked again"
You will end up with three separate apps stitched together poorly. Sync at least 2-3x per week even if it's just a 10-minute Slack thread.

### "One person did everything"
The other teammates fail the project. Instructors look at PR authorship — having your name on the README isn't enough.

### "We let the auth lane belong to one person"
The other teammates pass the project knowing nothing about JWT, hashing, or middleware — which is the entire point of the module. Build auth together on Day 1, no exceptions.

### "We had so many merge conflicts we gave up"
This means you're not pulling `main` often enough or your PRs are too big. Pull every morning. Keep PRs under 200 lines when possible.

### "We had a teammate ghost"
Tell the instructor early — the same week it happens, not the day before submission. The remaining teammates can renegotiate scope.

### "We never enabled branch protection"
Then someone will push directly to main and overwrite someone else's work. Just turn it on Day 1.

---

## Quick Checklist Before You Submit

- [ ] README has Team section with members and lanes
- [ ] Branch protection is on for `main`
- [ ] Every teammate has at least one merged PR they authored
- [ ] Every teammate has reviewed at least one PR they didn't author
- [ ] `/docs/RETRO.md` exists with one paragraph per teammate
- [ ] At least one bonus/Could-Have feature is delivered per teammate
- [ ] No commits pushed directly to `main` (other than the initial scaffold)

---

## Final Thought

Team mode teaches you a different skill than solo mode. Both are valuable. If you choose team mode, commit to the *process* — the PRs, the reviews, the conflicts, the syncs — not just the deliverable. The deliverable is the easy part.
