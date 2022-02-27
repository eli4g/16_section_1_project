"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show sumbit form for story submission */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
  
}

$navSubmit.on("click", navSubmitClick);


/** Show favorites list */

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  
  $favoriteStoriesList.show();
  
  
}


$navFavorites.on("click", navFavoritesClick);




/** Show favorites list */

function navMyStoriesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  
  $myStoriesList.show();
  
  
}


$navMyStories.on("click", navMyStoriesClick);





/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
