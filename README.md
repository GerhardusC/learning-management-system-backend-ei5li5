# Explain In 5 Like I'm 5

## Table of contents:

1. Preface
2. Introduction
3. Glossary
4. User requirements definition
5. System architecture
6. System requirements specification
7. System models
8. System evolution
9. User stories
10. How to use the app

## 1. Preface

This document is intended for stakeholders involved in the development
process of the web app called "Explain in 5 like I'm 5".

## 2. Introduction

'Explain In 5 Like I'm 5' is a lightweight simplified Learning Management System, which
allows the creation of short lessons that include videos, explanations and quiz questions.
Lessons are created by content creators and learners can see and interact with these lessons.
The amount of lessons a learner completes gets tracked and their name gets displayed on a leaderboard.

## 3. Glossary

<b>Learning Management System</b> - Often referred to as an LMS for short, this is a platform where the
learning path of a student is managed.

<b>Explain In 5 Like I'm 5</b> - The name of the web app.

<b>Lesson</b> - A web page composed of various elements to enhance learning.

<b>Creator</b> - A person who signs up to the website with privilages of creating content.

<b>Learner</b> - A person who signs up to the website with privilages of viewing content only.

<b>Learning designer</b> - A person who creates a lesson or learning path.

<b>Granularised content</b> - Content broken up into small managable chunks that make it easier for learners to understand.

## 4. User requirements definition

Learning designers often look for simple ways to make interactive content on a website. They
are often pressed for time having to get content out rapidly. Simplifying the process
of writing content will save them time.

Explain In 5 Like I'm 5 presents a solution where the content creation process is simplified.

Importantly, learning designers, or other creators must be able to create interactive lessons with a simple UI.
These creators need to be verified to be able to add content to the website and learners need to be able to log
in and see this content.

## 5. System architecture

In this system there are two types of users. There are "creators" and "learners". Both learners and
creators must be authenticated to access their respective dashboards.

Creators can add lessons, and learners can only view lessons. Lessons can contain a variety of content types
including 'headings', 'paragraphs', 'videos', 'multiple-choice questions' and 'short answer questions'.

I will be using Next.js to manage the front end of the site with global state managed by Redux.
This is because I feel like the new next.js app router will help a lot in handling async functions
while reading from and writing to the database.

I will be using Express.js to handle middleware including authentication and connect up to a mongoDB.
In the mongoDB there will be two sets of data, one for users and one for courses.
For data structures, see section 7.

The UI will also be quite simplistic, so I can style it using standard CSS.

## 6. System requirements specification

### 6.1 Functional requirements:

    Content creators and learners must be able to create an account and log in.

    Content creators must be able to create lessons. If an account is not marked as a content creator, they
    should not be able to interact with a lesson beyond just viewing the lesson and interacting with the existing
    content.

    Learners must be able to view lessons. Learners should not be able to edit lessons, but their completion of
    each lesson should be validated.

### 6.2 Non-functional requirements:

    Lessons should be simple and easy to create for content creators. The content creator should be able to choose
    from a variety of different content types to create interactive lessons.

    Any loading states while a content creator is adding a lesson should be displayed so the creator knows that their
    request is processed.

    The application should be reliable and it needs to have a high uptime.

    Creating a lesson and viewing a lesson should feel smooth, so the app needs to be performant.

    All endpoints need to be secure. Inappropriate requrests must be handled properly.

## 7. System models

There are three key models that describe the system. These are the creators, the learners and the lessons.

The following schematics describe each of these models using object models:

Creator:
Name and surname
Email address
Creator role

Learner:
Name and surname
Email address
Learner role
Completed lessons

Lesson:
components:
Video
Heading text
Paragraph text
Multiple choice question
Short answer question

## 8. System evolution

The assumption made by the system is that these learners are casual learners and are not interested in any sort
of accreditation for the material they learn about. The learning done on this LMS is for enrichment only.

Should this change, another version of the app with accreddited content might be a future prospect.

## 9. User stories

Gerhardus:
I really would like an app where I can easily create lessons without having to spend a lot of time
learning a complex Learning Management System. This app sounds like the ideal candidate.

Peter:
A lot of time in learning design on complex Learning Management Systems is spent trying
to make things look uniform across different courses and ensure consistency. This is not an issue
with the modular nature of EI5LI5.

Stephanie:
Granularising content really makes it more digestible for learners. The concise nature of the lessons
that you can create in EI5LI5 makes it a really powerful to for short impactful learning experiences.

## 10. How to use the app

There are two types of users of this app. There are creators and there are learners. Creators are able
to create lessons and learners are able to view them. Let's look at how to use the app for both of
these parties separately.

### 10.1 How to use the app as a creator

Start clicking on the "register" button. Once here, you can enter your details to create your account. During registration, make sure to select "Creator" as your role.

Once you registered, you will arrive at the creator dashboard. Here, you are able to view all the lessons you have created. You can always come back to this page by clicking on "My lessons" on the navigation bar.

To add a new lesson, click on the "Add lesson" button. Once here, you need to add a title to the lesson. I recommend keeping the title concise.

Start by clicking on the green plus at the bottom of the screen. This will bring up a window where you can select the type of component you would like to add.

Once you select a component type, a form will appear prompting you to enter information about the component.

Most of the forms are self explanatory, however when adding an image or video you must note the following:

The image url has to exist. This website does not host images, but rather only displays images that already exist on the web. If you would like to add an image that is not currently on the web, upload the image to Google Drive and ensure the sharing permissions are set to public.

The video ID is the ID of a YouTube video. For example in the link "https://www.youtube.com/watch?v=JU6sl_yyZqs", the ID is JU6sl_yyZqs.

### 10.2 How to use the app as a learner

Start clicking on the "register" button. Once here, you can enter your details to create your account. During registration, make sure to select "Learner" as your role.

Once you registered, you will arrive at the learner dashboard. Here, you are able to view all the lessons available on the platform.

You can view lessons by clicking on the "View lesson" button per lesson. You will only be able to complete a lesson once you complete all interactive elements on the page. To complete the lesson you simply have to click the finish lesson button after completing all interactive elements.

Once you have completed a lesson, its background will change colour on your home page. You can also access all of your completed lessons by clicking on the "Completed lessons" link in the navigation bar.

## 11. Installing, running and testing locally

Navigate to the backend directory. Run the command "npm start". This will start the backend server.

Navigate to the frontend directory. Run the command "npm run build" followed by the command "npm start".

You can now open the app on http://localhost:3000 in your browser.

## 12. Security

The express backend is secured using Helmet middleware.
Users are authenticated using json web tokens.
The secret key is in a .env file and is added to the .gitignore file.

## 13. Deployment
