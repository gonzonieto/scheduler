# Scheduler

Scheduler is a single-page app for interview scheduling that lets you easily book, edit, and cancel interviews.

- [Scheduler App](https://profound-youtiao-1c29c4.netlify.app/)
- API Endpoints — [Appointments](https://scheduler-api-test.herokuapp.com/api/appointments) | [Interviewers](https://scheduler-api-test.herokuapp.com/api/interviewers) | [Days](https://scheduler-api-test.herokuapp.com/api/days)

## Objectives

- use React functional components for all page elements
- practice using useState, useEffect, and custom hooks
- learn about integration, unit, and end-to-end testing
- get first-hand experience with a continuous integration/continuous development workflow using Netlify and CircleCI

## Setup

To set up a local copy of Scheduler, follow these instructions:

- have `npm` installed
- clone this repo to your machine
- install dependencies — `npm install`
- run the webpack dev server — `npm start`
- once the server is running, a browser tab with your server should automatically open up; otherwise, you can visit it at `http://localhost:8000/`

## Testing

If you run into issues, try using our tests to diagnose the problem:

- Unit tests — `npm test`
- End-to-end tests — `npm run storybook`

## Screenshots

Homepage
!["Homepage"](https://github.com/gonzonieto/scheduler/blob/master/docs/index.png?raw=true)

Editing/adding an interview
!["Editing/adding an interview"](https://github.com/gonzonieto/scheduler/blob/master/docs/edit.png?raw=true)

Confirmation dialog before deleting an interview
!["Confirmation dialog before deleting an interview"](https://github.com/gonzonieto/scheduler/blob/master/docs/confirm_delete.png?raw=true)
