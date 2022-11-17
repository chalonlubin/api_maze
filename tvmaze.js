"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const URL_SHOW_SEARCH = "http://api.tvmaze.com/search/shows";
const URL_SHOW_ID = "http://api.tvmaze.com/shows"
const DEFAULT_IMAGE = "https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300";
// http://api.tvmaze.com/shows/[showid]/episodes // reference

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */


//**  getShowsByTerm: async function that gets response based on text in input field from tvmaze API and returns the data array. */
async function getShowsByTerm(input) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const response = await axios.get(
    `${URL_SHOW_SEARCH}`,
    { params: { q: input}}
  )
  // console.log(response.data[0].show.id); // TEST
  console.log(response);

  return response.data.map(apiResp => {

    const show = apiResp.show

    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : DEFAULT_IMAGE,
    };
  });
}



/** Given list of shows, create markup for each and to DOM */

//**  populateShows: appends the show vairable of each matching show called by the users input. If the show does not have an image, a placeholder is inserted. */
function populateShows(shows) {
  // console.log('all shows', shows) // TEST
  $showsList.empty();

  let image;

  for (let show of shows) {
    if(show.show.image?.medium === undefined){

    }
    else{
      image = show.show.image.medium;
    }
    // console.log('show', show); // TEST
    // console.log(show.show.image.medium) // TEST
    const $show = $(
        `<div data-show-id="${show.show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${image}
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.show.name}</h5>
             <div><small>${show.show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);  }
}


/** searchForShowAndDisplay: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */
async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
