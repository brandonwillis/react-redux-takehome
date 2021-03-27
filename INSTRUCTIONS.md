# react-redux-takehome

The goal of this takehome challenge is to model an actual dev task at Frame as closely as possible. That means: no gotchas, let's just build something with an emphasis on readability, working functionality, and testing!

## Business Need
When a new client signs up on the Frame platform, they are asked to fill out a series of forms. The forms include basic biographical information like `name` and `age`, as well as questions about the type of treatment the client is seeking. Frame collects and stores this info to build the client's user profile, as well as to match the client to potential therapists.

## Your Task
Your task is to implement a signup flow for onboarding new clients to the frame platform using react and redux. At the end of the flow, clients will have the opportunity to review their inputs, and go back to make changes.

## Requirements
- A page to collect Biographical Information (see below)
- A page to collect Matching Criteria (see below)
- A review page where the client can see all of their inputs and "Submit" them. The submit button can be a no-op!
- The ability to cycle back and forward through the 3 pages

##### Biographical Info to Collect
- Client Name
- Email
- Phone Number
- Have you been to therapy before?

##### Matching Criteria to Collect
- Reason(s) for Seeking Therapy - (should be a multiselect)
  - Available options are dynamic and should be pulled from the API https://api.tryframe.com/common/accepting-criteria. When thinking of where to store this data, remember that it might be used somewhere else in the app.
- Do you have a preferred therapist gender?
  - If no, mark as N/A
  - If yes, present the following options: Female, Male, Non-Binary
  - Options should not be visible if the user selects "no".
- Location: City and State
  - States can be found at https://api.tryframe.com/common/states When thinking of where to store this data, remember that it might be used somewhere else in the app.

Feel free to use a library such as Formik[https://formik.org/] to help with your forms. It has lots of built-in features like validation that will help you on your way. In many cases, form data is considered ephemeral and shouldn't be stored in Redux. For our purposes here, please _do_ use Redux to store your form data, the point being a demonstration of your knowledge of redux :)

## Must Have

- The application should be divided into components
- Your code should be readable, with clear naming
- Form validation
- Very basic styling - bootstrap ok!
- The application should include 1 or 2 meaningful tests (meaningful tests validate logic or component behavior)

## Nice to Have

- TypeScript is used
- Any styling or UI flourishes
- The app is responsive / cross-browser techniques are implemented

## Time limit
There is no hard time limit for this coding challenge. However, we believe that ~4 hours is sufficient for the must-have parts of the application. While we appreciate all the effort put into the challenge, we also do not want to take up too much of your time. Our advice is to focus on making sure that the application works properly and has some tests before moving on to secondary objectives.

## Submit Your Response

- Create a git bundle: `git bundle create your_name.bundle --all`
- Email your bundle to mike@tryframe.com

### Please do not hesitate to reach out with any questions - Happy Coding!
