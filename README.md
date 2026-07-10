# React Todo List

A clean and responsive Todo List application built with React and Tailwind CSS.  
This project was created for study and portfolio purposes as part of my learning journey in frontend development.

## About the Project

React Todo List is a simple task management application where users can add, complete, delete, and filter tasks.

The main goal of this project is to practice React fundamentals in a real interface, focusing on component-based architecture, state management, props, conditional rendering, and user interaction.

## Features

- Add new tasks
- Mark tasks as completed or active
- Delete tasks
- Filter tasks by status:
  - All
  - Active
  - Completed
- Display the number of pending tasks
- Show an empty state when there are no tasks in the selected filter
- Responsive interface styled with Tailwind CSS
- Clean component-based structure

## React Concepts Used

This project uses important React concepts, including:

- `useState` to manage application state
- Component composition to split the UI into smaller parts
- Props to pass data and functions from the parent component to child components
- Event handling for adding, toggling, deleting, and filtering tasks
- Array methods such as `map`, `filter`, and spread syntax to update state immutably
- Conditional rendering to display different UI states
- Derived state to calculate filtered tasks and pending task count

## Components

### `TodoApp`

The main parent component of the application.

It stores the main state of the app, including the list of tasks and the selected filter. It also contains the main functions responsible for adding, toggling, deleting, and filtering todos.

### `TodoInput`

Responsible for receiving the text typed by the user and sending it to the parent component through the `onAdd` prop.

### `FilterTabs`

Responsible for changing the current task filter. It receives the active filter and the function used to update it.

### `TodoItem`

Responsible for rendering each individual task. It receives the task data and the functions used to toggle completion or delete the task.

## How It Works

The application starts with a few default tasks stored in React state.

When the user adds a new task, the app creates a new todo object with an `id`, `text`, and `completed` status. This new task is added to the existing list using the state updater function.

When a task is marked as completed, the app updates only that specific task by matching its `id`. The rest of the tasks remain unchanged.

When a task is deleted, the app creates a new list without that task.

The filter system controls which tasks are displayed on the screen:

- `all` shows every task
- `active` shows only tasks that are not completed
- `completed` shows only completed tasks

The pending counter is calculated based on how many tasks are still not completed.

## Technologies

- React
- JavaScript
- Tailwind CSS
- HTML5
- CSS3

## What I Learned

While building this project, I practiced:

- Creating and organizing React components
- Managing state with `useState`
- Passing functions and data through props
- Updating arrays in React without mutating state directly
- Rendering lists dynamically
- Creating filters based on application state
- Styling a modern interface with Tailwind CSS

## Future Improvements

- Save tasks in `localStorage`
- Add an edit task feature
- Add a clear completed button
- Add task categories or priorities
- Add drag-and-drop task reordering
- Improve accessibility
- Add animations for task creation and deletion

## Purpose

This project was developed as a student project for educational and portfolio purposes.  
It is not intended for commercial use, but as a practical way to improve and demonstrate frontend development skills.

# By Vitor Paixão
