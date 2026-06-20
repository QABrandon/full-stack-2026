# Module 113 Sprint Practice: Trello Board & Wireframes

## Overview
In this quick practice, you will create a Trello board to manage user stories and create wireframes for a Todo Dashboard application. This combines Scrum artifacts (Product Backlog, Sprint Backlog) with prototyping skills.

**Time:** 25-30 minutes

---

## Part 1: Setup Your Trello Board (5 minutes)

### Step 1: Create a New Trello Board
1. Go to [Trello.com](https://trello.com) and sign in (or create a free account)
2. Click "Create new board"
3. Name it: "Todo Dashboard - Sprint 1"
4. Choose a background color or image

### Step 2: Create Three Lists (Columns)
Create these three lists in order:
- **Product Backlog** (all stories waiting to be worked on)
- **Doing** (stories currently in progress)
- **Done** (completed stories)

---

## Part 2: Write User Stories (10 minutes)

### Step 3: Create 5 User Story Cards
Create a card in the "Product Backlog" list for each of these user stories:

#### Story 1: View All Tasks
```
Title: View All Tasks

Description:
As a user
I want to view all my tasks in a list
So that I can see what I need to accomplish

Acceptance Criteria:
- Given I am on the dashboard
  When the page loads
  Then I see a list of all my tasks

- Given I have no tasks
  When the page loads
  Then I see a message "No tasks yet. Create your first task!"

- Given I have multiple tasks
  When the page loads
  Then tasks are displayed with title, description, and due date
```

#### Story 2: Create New Task
```
Title: Create New Task

Description:
As a user
I want to create a new task
So that I can track things I need to do

Acceptance Criteria:
- Given I am on the dashboard
  When I click the "Add Task" button
  Then I see a form with title, description, and due date fields

- Given I am on the create task form
  When I enter valid information and click "Save"
  Then the new task appears in my task list

- Given I am on the create task form
  When I leave the title field empty and click "Save"
  Then I see an error message "Title is required"
```

#### Story 3: Mark Task as Complete
```
Title: Mark Task as Complete

Description:
As a user
I want to mark tasks as complete
So that I can track my progress

Acceptance Criteria:
- Given I am viewing my task list
  When I click the checkbox next to a task
  Then the task shows a strikethrough and moves to the bottom

- Given I have marked a task as complete
  When I click the checkbox again
  Then the task is marked as incomplete and moves back to active tasks

- Given I mark a task as complete
  When the page refreshes
  Then the task remains marked as complete
```

#### Story 4: Delete Task
```
Title: Delete Task

Description:
As a user
I want to delete tasks I no longer need
So that my task list stays organized

Acceptance Criteria:
- Given I am viewing my task list
  When I click the delete icon on a task
  Then I see a confirmation dialog "Are you sure you want to delete this task?"

- Given I see the delete confirmation dialog
  When I click "Yes"
  Then the task is removed from my list

- Given I see the delete confirmation dialog
  When I click "Cancel"
  Then the task remains in my list
```

#### Story 5: Filter Tasks by Status
```
Title: Filter Tasks by Status

Description:
As a user
I want to filter tasks by active or completed
So that I can focus on what needs to be done

Acceptance Criteria:
- Given I am viewing my task list
  When I click the "Active" filter button
  Then I see only incomplete tasks

- Given I am viewing my task list
  When I click the "Completed" filter button
  Then I see only completed tasks

- Given I am viewing my task list
  When I click the "All" filter button
  Then I see all tasks regardless of status
```

### Step 4: Add Story Point Estimates
Add a label to each card with estimated story points:
- Story 1: 5 points
- Story 2: 8 points
- Story 3: 5 points
- Story 4: 3 points
- Story 5: 5 points

---

## Part 3: Create Wireframes (12 minutes)

### Step 5: Choose Your Tool
Pick one:
- **Figma:** [figma.com](https://figma.com) (sign up for free account)
- **Excalidraw:** [excalidraw.com](https://excalidraw.com) (no sign up required)

### Step 6: Create 3 Wireframes
Create wireframes for these screens:

#### Wireframe 1: Dashboard View (Main Screen)
Include these elements:
- [ ] App title: "Todo Dashboard"
- [ ] "Add Task" button (top right)
- [ ] Filter buttons: All / Active / Completed
- [ ] Task list with 3 sample tasks showing:
  - [ ] Checkbox
  - [ ] Task title
  - [ ] Task description
  - [ ] Due date
  - [ ] Delete icon
- [ ] Footer with task count

#### Wireframe 2: Create Task Form
Include these elements:
- [ ] Form title: "New Task"
- [ ] Input field: "Title" (required)
- [ ] Text area: "Description"
- [ ] Date picker: "Due Date"
- [ ] "Save" button
- [ ] "Cancel" button
- [ ] Back arrow to return to dashboard

#### Wireframe 3: Empty State
Include these elements:
- [ ] App title: "Todo Dashboard"
- [ ] Empty state illustration (simple icon or box)
- [ ] Message: "No tasks yet. Create your first task!"
- [ ] "Add Task" button

### Step 7: Add Wireframe Links to Trello
For each wireframe:
1. Export or take screenshot
2. Attach the image to the relevant Trello card
3. OR add a link to your Figma/Excalidraw file in the card description

---

## Part 4: Simulate a Sprint (3 minutes)

### Step 8: Select Stories for Sprint
Move 2-3 user stories from "Product Backlog" to "Doing" based on:
- Total story points should be 15-20 points
- Priority (Story 1 and 2 are highest priority)

### Step 9: Mark One Story as Done
Pick one story that you feel confident about and move it to "Done" column.

---

## Submission Checklist

- [ ] Trello board created with 3 columns (Product Backlog, Doing, Done)
- [ ] 5 user story cards created with full descriptions and acceptance criteria
- [ ] Story point estimates added to each card
- [ ] 3 wireframes created (Dashboard, Create Form, Empty State)
- [ ] Wireframes attached or linked to relevant Trello cards
- [ ] At least 2 stories moved to "Doing" column
- [ ] At least 1 story moved to "Done" column

---

## Reflection Questions

After completing this practice, answer these questions:

1. **Which user story was hardest to write acceptance criteria for? Why?**

2. **How did creating wireframes help clarify the acceptance criteria?**

3. **If you could only complete 3 stories in this Sprint, which would you prioritize and why?**

4. **What would you add to your Definition of Done for this project?**

---

## Bonus Challenge

Add these enhancements to your Trello board:

- [ ] Add checklist items to one story card showing technical tasks needed
- [ ] Add a "Sprint Backlog" column between "Product Backlog" and "Doing"
- [ ] Create labels for story types: Feature, Bug Fix, Enhancement
- [ ] Add due dates to cards based on a 2-week Sprint timeline
- [ ] Create a fourth wireframe for "Edit Task" functionality

---

## Share Your Work

Take a screenshot of your completed Trello board and wireframes to share on #project-showcase
