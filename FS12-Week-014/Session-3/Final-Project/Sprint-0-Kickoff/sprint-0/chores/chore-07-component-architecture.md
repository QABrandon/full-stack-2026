# Chore 7: Plan Component Architecture (Simplified)

**Estimated Time:** 45 minutes - 1 hour (TIME-BOXED)

## Task
Break down your UI into components and plan state management strategy

## Steps

### Part 1: Identify Components (20 minutes - TIME-BOXED)
- [ ] Review your mockups from Planning Chore 5
- [ ] For each page, identify UI components by drawing boxes around them
- [ ] Name each component (Navigation, TaskCard, LoginForm, etc.)
- [ ] Identify which components can be reused across pages
- [ ] List 5-8 main components with brief description
- [ ] Stop after 20 minutes - you can refine during coding

**Quick Component Checklist:**
- Navigation/Header
- Form components (Login, Register, Create/Edit)
- List/Card components (display your main resource)
- Button components
- Any modals or dialogs

### Part 2: Plan State Location (15 minutes - TIME-BOXED)
- [ ] For each component, ask: "What data does this need?"
- [ ] Identify where state should live:
  - **Local state:** Form inputs, toggles, component-specific data
  - **Shared state:** User authentication, data shown across multiple components
- [ ] Mark which components will fetch data from API
- [ ] Stop after 15 minutes - you can adjust during coding

### Part 3: Choose State Management Strategy (10 minutes)

**State Management Guidelines:**

**Use Props Drilling when:**
- Passing data 2-3 levels deep maximum
- Simple, straightforward data flow
- WARNING: Can create tightly coupled components if overused

**Use Context API (useContext) when:**
- State needed across most or all of your app
- Examples: AuthContext (user login state), ThemeContext (dark mode)
- Good for: Authentication, user preferences, theme

**Use Custom Hooks when:**
- Reusing stateful logic across components
- Examples: useFetch, useAuth, useLocalStorage
- Keeps components clean and logic reusable

**Decision:**
- [ ] Document which approach you'll use for authentication
- [ ] Document which approach you'll use for your main resource data
- [ ] Keep it simple - you can always refactor later

## Example Component Plan

```
Pages and Components:

1. Home Page
   - Navigation (shared component)
   - HeroSection
   - FeatureList

2. Login Page
   - Navigation (shared component)
   - LoginForm (local state: email, password)

3. Dashboard Page
   - Navigation (shared component)
   - TaskList (fetches tasks from API)
   - TaskCard (receives task as prop)
   - CreateTaskButton

State Management:
- AuthContext: User login state (global - used in Navigation, Dashboard)
- Local state: Form inputs, individual component toggles
- API calls: Dashboard fetches tasks, stores in local state
```

## Acceptance Criteria

- [ ] 5-8 main components identified and named
- [ ] Reusable components marked (used on multiple pages)
- [ ] State location decided (local vs shared)
- [ ] State management strategy chosen for:
  - Authentication state
  - Main resource data
- [ ] Component plan documented (can be simple list or sketch)
- [ ] TIME-BOXED: Stopped after 45 minutes to 1 hour

## Important Note

This is a PLANNING exercise, not final architecture. You will refine and adjust as you code. The goal is to think through the basics so you can start coding with direction, not to create a perfect plan. Keep it simple and move forward.
