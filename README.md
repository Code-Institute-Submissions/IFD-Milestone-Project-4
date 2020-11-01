# Task Tracker | An Everyday Organiser

Live application demo can be found [**here**](https://michaelphann.github.io/IFD-Milestone-Project/)

## Table of Contents

* [UX](#UX)
  * [Application overview](#Application-overview)
  * [User stories](#User-stories)
  * [Design choices](#Design-choices)
  * [Wireframes](#Wireframes)
* [Features](#Features)
  * [Existing features](#Existing-features)
  * [Future features](#Future-features)
* [Technologies Used](#Technologies-Used)
* [Testing](#Testing)
  * [Implemented features](#Implemented-features)
  * [Functionality](#Functionality)
  * [Bugs](#Bugs)
* [Deployment](#Deployment)
* [Credits](#Credits)
  * [Content / Media](#Content-/-Media)
  * [Acknowledgements](#Acknowledgements)


_____

## UX

### Application overview

The purpose of this application is to provide the user with a simple yet functional everyday organisational tool. It is easy-access and versatile, acting as a user assistant for a variety of purposes, ranging from a daily task tracker to a paper-free shopping list to a handy digital jotter. The outlook view enables the user to keep track of the weather in their area, potentially helping them make smarter decisions if they need to venture outside.

### User stories
* As a new user I want to be able to quickly and intuitively understand how the app works and how I can put it to best use.
* As a user of the app whose daily schedule might be weather dependent, I want to be able to, at-a-glance, see the current weather conditions. E.g. a parent planning whether to take a child outside and, if so, how to dress the child based on the conditions.
* As a user who will utilise the app periodically throughout the day I want to have confidence that my task list or notes will be reliably stored and can be recalled at any stage.
* As a user of the app who is extremely busy I want to be able to quickly take stock, update/edit existing tasks and confirm tasks as complete in order to track progress.
* As a user who might utilise the app for a number of different purposes in one day I want to be able to quickly reset the app and begin to use for its next purpose.

### Design choices
* A minimalist user interface that enables quick access and straight forward functionality.
* Distinct input field and mobile-friendly large "ADD" button.
* Compact, clear date/weather banner to provide a simple summary for the user.
* Complementary colours throughout the app to ensure ease of reading of the user across device type.
* "Quicksand" font used throughout the app. It is an engaging, easy-to-read and versatile font. A variety of letter spacing used across device type.

### Wireframes
Wireframes for this website can be accessed in my wireframes folder within this github repository - [my wireframes](XXXXXXXX)


## Features

### Existing features
* **Current date & weather overview** - a summary banner that provides the user with an at-a-glance view of the date, user location and current weather. Location and current weather view are dependent on both geolocation being supported by the user's browser and the user allowing geolocation access.
* **Add task item** - an input feature to add individual task items. Items can be added by both return key, if being used on desktop or tablet, or via a mobile/tablet-friendly *Add Item* button.
* **Save to local storage** - the ability to store task list content, including the status of individual task items, e.g. complete/incomplete. Ensures task list is retained even if browser is refreshed or browser window closed. Task list/items will remain until user chooses to delete them via dedicated app features.
* **Individual item features**
  * *Mark task complete* - the ability to mark a task complete where it will appear with a green check box and text scored through. Items marked as complete will be updated in local storage.
  * *Edit task* - the ability to edit an individual task, whether to correct or add to it, without having to delete. Revised task wording will be updated in local storage.
  * *Delete task* - the ability to entirely delete an individual task and remove it from both the rendered list and local storage.
* **Delete all items marked complete** - a button that enables the user to delete all items that have been marked complete, so as to leave the list with only tasks not yet marked complete. Local storage will automatically refresh to reflect these items having been deleted. Feature includes a confirmation modal asking if the user is sure they wish to delete all completed items.
* **Delete all items** - a button that enables the user to delete all items in the current task list. Local storage will automatically refresh to reflect this. Feature includes a confirmation modal asking if the user is sure they wish to delete all items.

### Future features
* **Multiple task lists** - the ability to create and retain a number of separate task lists.
* **Integrated weather forecast** - to show weather outlook for a certain number of hours and/or days to come.
* **Task reminder alerts** - the ability to set a reminder on a particular task and send a text or email alert at a specified time.

_____

## Technologies Used

* [HTML5](https://en.wikipedia.org/wiki/HTML5) - used to build the structure of this application.
* [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - used for styling of the application.
* [JavaScript](https://www.javascript.com/) - used to provide application interactivity.
* [Google Fonts](https://fonts.google.com/) - used to style the application text fonts.
* [Font Awesome](https://fontawesome.com/) - used to style the application icons.
* [Open Weather API](https://openweathermap.org/api) - API plugin to access up-to-date weather data.
* [Tingle.js](https://tingle.robinparisi.com/) - API plugin modal template.
* [VS Code](https://code.visualstudio.com/) - used Visual Studio Code 2 source code editor for local development.
* [GIT](https://git-scm.com/) - used GitPod for version control.
* [GitHub](https://github.com/) - used GitHub for hosting the repository and the live website preview.

### Testing tools

* [Google Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) to test the device responsiveness of the application.
* [JSHint](https://jshint.com/) to validate the JavaScript code.
* [W3C CSS validation](https://jigsaw.w3.org/css-validator/) to validate CSS. 
* [W3C Markup Validation](https://validator.w3.org/) to validate HTML code.
* [Auto-prefixer](https://autoprefixer.github.io/) to ensure the css has all prefixes it needs, in order  to work properly on all modern browsers. 

## Testing

### Implemented features

1. Date/Weather banner
  1. Load application to browser.
  2. The current day & date should be displayed immediately.
  3. If the user's town/city location and local weather conditions are not immediately displayed, the user should enable the browser to access the user's location, i.e. enable geolocation functionality.
  4. Once *allowed*, the user's town/city location and local weather conditions should be displayed.
  5. Repeat Steps 1-3, however in Step 3, the user should deny the browser access to the user's location. This may need to be set prior to reloading the browser, depending on the user's normal setting.
  6. Once *denied*, a browser-generated error message, e.g. "User denied Geolocation" in Chrome will be displayed, in plact of a town/city location. Additionally, weather conditions will not be displayed.
  7. If the user's browser does not support Geolocation functionality, a browser-generated error will be displayed to confirm this.

2. Input task field
    1. Click on input field.
    2. Without typing any text or pressing the space bar, click the *ADD* button. There should be no response, with no task added to the list.
    3. Without typing any text or pressing the space bar, press the return key. There should be no response, with no task added to the list.
    4. Type an example task in the input field, click the *ADD* button. The example task should render below the input field to the task list. The example task text should clear from the input field with the placeholder "Add New Task" text returning.
    5. Type another example task in the input field, press the return key. The example task should render below the input field to the task list. The example task text should clear from the input field with the placeholder "Add New Task" text returning.

3. *Complete task* feature
    1. Render an example task to the task list.
    2. Click on the visible grey circle on that task item. The grey circle should change to a green circle with a tick. Additionally the text in the task item will change colour from black to grey and will be scored through.
    3. Refresh the browser and confirm that the task remains marked as complete - confirming the action of marking the task complete was updated to local storage.
    4. Click on the green circle (with tick). The green circle should rever to the original grey circle. Task text should no longer be scored through and should have changed colour from grey to black.
    5. Refresh the browser and confirm that the task remains marked as uncomplete - confirming the action of marking the task as not completed was updated to local storage.

4. *Edit task* feature
    1. Render an example task to the task list.
    2. Hover mouse over the example task item, where 2 icons should then appear.
    3. Click the blue edit symbol. The text field in the example task item should become editable, evidenced by an border outline appearing around the text, a flashing cursor position appearing at the start of the text field, and a *SAVE* icon appearing to the right of the task item, with all other icons disappearing.
    4. Update the example task text. Press the return key. Confirm that the outline border on the task item disappears, the flashing cursor position disappears, the *SAVE* icon disappears, and all other icons reappear.
    5. Repeat Steps 2-4, however in stead of *pressing the return key*, click the *SAVE* icon when the task item text has been updated. The same outcome as described in Step 4 should result.
    6. Following Steps 4 & 5, refresh the browser to ensure the edited task item text is retained - confirming the text has been update to local storage.

5. *Delete task* feature
    1. Render an example task to the task list.
    2. Hover mouse over the example task item, where 2 icons should then appear.
    3. Click the red trash symbol.
    4. The example task should disappear from the task list.
    5. Refresh the browser to ensure the example task remains deleted from the task list - confirming the action of deleting the task item has been updated to local storage.

6. *Delete completed tasks* feature
    1. Render 4 example tasks to the task list.
    2. Upon rendering the first example task, a button entitled "Delete Completed Tasks" should appear immediately below the task list.
    3. Mark one example task complete, as instructed in Test 3, above.
    4. Click on the "Delete Completed Tasks" button. A modal should appear asking for confirmation as to whether you wish to delete completed tasks.
    5. Select the "No" option. The modal should disappear, with the task list again visible. All 4 task items should remain, with one marked completed.
    6. Repeat Step 4.
    7. Select the "Yes" option. The modal should disappaer, with the task list again visible. There should be 3 task items remaining, with the task item marked complete having disappeared.
    8. Refresh the browser to ensure the example task that had been deleted remains excluded from the task list - confirming the action of deleting the task item has been updated to local storage.
    9. Repeat Steps 3-8, howevever mark 2 of the remaining 3 task items complete, so as to prove that the function works in the same way whether 1 or more task item is marked complete.

7. *Delete all tasks* feature
    1. Render 2 example tasks to the task list.
    2. Upon rendering the first example task, a button entitled "Delete All Tasks" should appear immediately below the task list.
    3. Click on the "Delete All Tasks" button. A modal should appear asking for confirmation as to whether you wish to delete all tasks.
    4. Select the "No" option. The modal should disappear, with the task list again visible. Both task items should remain.
    5. Repeat Step 3.
    6. Select the "Yes" option. The modal should disappear. There should be no remaining task list (only the input field).
    7. Refresh the browser to ensure that both example tasks remain excluded from the task list/there remains no task list displayed - confirming the action of deleting the task item has been updated to local storage.

### Functionality
Google Chrome Developer was the principal tool used throughout the build to text functionality and device responsiveness. Additionally, in the latter stages, application responsiveness was tested via live user testing across a range of mobile, tablet and deskotp devices. All feedback provided as part of this testing has been considered and, where necessary, incorporated into the application.

### Bugs
* Geolocation functionality, as currently developed, does not appear to be supported on Safari or Firefox.
* When utilising the *Edit task* feature on Safari and Firefox, the keypress event listener does not work. However, the click event listener on this feature does work.

## Deployment

This project was developed using VS Code, with the repository stored on GitHub.

* The GitHub repository is [here](https://github.com/MichaelpHann/IFD-Milestone-Project)
* The website is live [here](https://michaelphann.github.io/IFD-Milestone-Project/)

#### This application was deployed on GitHub Pages by undertaking the following steps:
1. On Github, navigate to the repository - https://github.com/MichaelpHann/IFD-Milestone-Project
2. In the GitHub header/navigation ribbon, select the **Settings** option.
3. Scroll to the **GitHub Pages** sub-section.
4. Under **Source** drop-down menu labelled **None** and select **Master Branch**.
5. Click to **Confirm** selection.
6. The website should now be live on GitHub Pages, with a link shown at the top of the **GitHub Pages** subsection.

For more information on how to deploy a website on GitHub, please visit [this website](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

#### Instructions to run the project locally:
You must first ensure:
  * you have installed a preferred IDE, such as [VS Code](https://code.visualstudio.com/)
  * you have installed [Git](https://git-scm.com/)

To clone this project from GitHub:

1. On GitHub, navigate to the project repository [here](https://github.com/MichaelpHann/IFD-Milestone-Project).
2. Under the repository name, select the green **Clone or download** dropdown button.
3. Highlight the URL provided or click the button to copy the URL.
4. Open your terminal.
5. Navigate to the working directory where the cloned repository will be placed.
6. In the command line type `git clone` and then paste the URL (copied in Step 3) immediately after.
  `git clone https://github.com/MichaelpHann/IFD-Milestone-Project.git`
7. Press **Enter**. Your local clone will be created.

For more information or guidance, please see the relevant help section [Cloning a Repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

## Credits

### Content / Media
* The weather icons used for this app were created by the graphic designer, Ashley Jager. The link to her repo is [here](https://github.com/manifestinteractive/weather-underground-icons).
* The weather API provider is [Open Weather API](http://www.OpenWeatherMap.org)

### Acknowledgements
I would like to thank my mentor, [Sandeep Aggarwal](https://github.com/asandeep), for his constructive feedback and guidance throughout the project.