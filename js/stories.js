"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
  putFavoriteStoriesOnPage();
  $favoriteStoriesLoadingMsg.remove();
  $favoriteStoriesList.hide();


  putMyStoriesOnPage();
  $myStoriesLoadingMsg.remove();
  $myStoriesList.hide();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
   console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const currentFavorites =  currentUser.favorites.map(set => {return set.storyId});

  //console.log(currentFavorites);

  let checkedValue = '';

  if (currentFavorites.includes(story.storyId)){

    checkedValue = 'checked';

  }
  
  return $(`
      
      <li id="${story.storyId}">
      <input class="star" type="checkbox" ${checkedValue}>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}


/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

 function generateFavoriteStoryMarkup(story) {
  console.debug("generateFavoriteStoryMarkup", story);

 const hostName = story.getHostName();


 const currentFavorites =  currentUser.favorites.map(set => {return set.storyId});

  //console.log(currentFavorites);

  let checkedValue = '';

  if (currentFavorites.includes(story.storyId)){

    checkedValue = 'checked';

  }

 
 
 return $(`
     
     <li id="${story.storyId}">
     <input class="star" type="checkbox" ${checkedValue}>
       <a href="${story.url}" target="a_blank" class="story-link">
         ${story.title}
       </a>
       <small class="story-hostname">(${hostName})</small>
       <small class="story-author">by ${story.author}</small>
       <small class="story-user">posted by ${story.username}</small>
     </li>
   `);
}


function generateMyStoryMarkup(story) {
  console.debug("generateFavoriteStoryMarkup", story);

 const hostName = story.getHostName();


 const currentFavorites =  currentUser.favorites.map(set => {return set.storyId});

  //console.log(currentFavorites);

  let checkedValue = '';

  if (currentFavorites.includes(story.storyId)){

    checkedValue = 'checked';

  }

 
 
 return $(`
     
     <li id="${story.storyId}">
       <button class="remove-button">x</button>
       <input class="star" type="checkbox" ${checkedValue}>
       <a href="${story.url}" target="a_blank" class="story-link">
         ${story.title}
       </a>
       <small class="story-hostname">(${hostName})</small>
       <small class="story-author">by ${story.author}</small>
       <small class="story-user">posted by ${story.username}</small>
     </li>
   `);
}





/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }


 
  $allStoriesList.show();
}

/** Gets list of favorite stories from server, generates their HTML, and puts on page. */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");


  

  $favoriteStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateFavoriteStoryMarkup(story);
    $favoriteStoriesList.append($story);
  }

  


 
  
}

/** Gets list of favorite stories from server, generates their HTML, and puts on page. */

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");


  

  $myStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateMyStoryMarkup(story);
    $myStoriesList.append($story);
  }

  


 
  
}



//** Submits a story from the Story Form on the page */

async function submitStory(evt)
{

  console.debug("submit story", evt);
  evt.preventDefault();

  const storyTitle = $("#story-title").val();
  const storyAuthor = $("#story-author").val();
  const storyURL = $("#story-url").val();


  

  const newStory = {title: storyTitle, author: storyAuthor, url: storyURL};



  

  

  const addedStory = await storyList.addStory(currentUser,newStory);




  

  $submitForm.trigger("reset");

  getAndShowStoriesOnStart();
}


$submitForm.on("submit", submitStory);




async function addRemoveFavorite(evt)
{

    const currentLiId = $(evt.target).parent().attr('id');

    if($(evt.target).is(':checked')){

      

      
      let favoriteArray = await currentUser.addFavorite(currentLiId,currentUser.username,currentUser.loginToken);

      
      
      let currentLocalItem = localStorage.getItem("favorites").split(",");
      
      if(!currentLocalItem.includes(currentLiId)){

        currentLocalItem.push(currentLiId);
      }

      
      localStorage.setItem("favorites", currentLocalItem);

      

    }else{

      //console.log($(evt.target).parent().attr('id') + " Removed");
        

      let favoriteArray = await currentUser.removeFavorite(currentLiId,currentUser.username,currentUser.loginToken);

     
        

        let currentLocalItem = localStorage.getItem("favorites").split(",");
        
        if(currentLocalItem.includes(currentLiId)){
  
          currentLocalItem.pop(currentLiId);
        }
  
        
        
  
        localStorage.setItem("favorites", currentLocalItem);
  
        

        
 
    };

    


}



$('ol').on("change","input",addRemoveFavorite);






async function removeCurrentStory(evt){

    const currentLiId = $(evt.target).parent().attr('id');

    console.log(currentLiId);


    let removedStory = await storyList.removeStory(currentUser,currentLiId );

    $(evt.target).parent().remove();
   

}



$('ol').on("click","button",removeCurrentStory);




