# Using AI to Speed Through Sprint 0 Chores

AI (ChatGPT, Claude, etc.) is a great pair-partner for the planning chores in Sprint 0. Below are the tactics that actually save time, plus copy-paste prompts.

## Tactics that work

1. **Paste the chore description directly.** Don't paraphrase — give the AI the same checklist your instructor gave you.
2. **Add your constraints up front:** timeline, hours available, stack, experience level. Without this the AI gives generic answers.
3. **Ask it to push back.** "Tell me where this idea is weak" beats "tell me if this is good."
4. **Time-box the conversation.** Tell it "I have 15 min — rapid-fire questions only."
5. **Then paste the rubric** so its suggestions stay in scope. AI loves to over-scope; the rubric reins it in.
6. **Iterate, don't accept.** Reject weak user stories, ask for replacements, trim until tight.

## Prompts to copy

**Chore 1 — Project Selection**
> I have 15 min to pick a project. Here is the chore: [paste]. Here is the rubric: [paste]. My constraints: [timeline, hours, stack, experience]. Ask me rapid-fire questions then recommend one option decisively.

**Chore 4 — MVP / Core Features**
> Here is my project idea: [1 sentence]. Here is the rubric: [paste]. Give me 10–15 user stories in "As a [user], I want to [X], so that [Y]" format. Then label 3–5 as MVP and the rest as Nice-to-Have.

**Chore 8 — User Stories → Trello cards**
> Convert these user stories into a Trello CSV import using this template. Order from last to first. Label MVP green, Nice-to-Have yellow. Add a 2-item Implementation checklist per card.
>
> ```csv
> Card Name,Card Description,Labels,Members,Due Date,Start Date,List Name,Checklist,Checklist item,Checklist item due,Checklist item member
> Example Card Name,,"labelname (green), (yellow)","Robin Warren, Elvis Presley",,,Todo,,,,
> ,,,,,,,Checklist,One of the money,,
> ,,,,,,,Checklist,Two for the show,,
> ,,,,,,,Checklist,Three to get ready,,
> ,,,,,,,Checklist,Go cat go,,
> ```

**Chore 9 — Database Schema**
> Given these MVP user stories: [paste], design a Postgres schema with at least 2 tables and a relationship. Show columns, types, and FKs.

## Where AI helps vs. where it doesn't

- **Great for:** brainstorming ideas, writing user stories, drafting README problem statements, generating CSVs, schema sketches, trimming scope.
- **Don't trust without checking:** instructor approval, real user validation (you still need to talk to 3 humans), final scope decisions.

## One rule

If the AI suggests a feature that isn't in the rubric or your MVP — cut it. Finishing beats clever.
