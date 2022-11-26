"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const $myModal = $("#my-modal");
const $modalBody = $(".modal-body");

const URL_SHOW_SEARCH = "http://api.tvmaze.com/search/shows";
const URL_SHOW_ID = "http://api.tvmaze.com/shows/";
const DEFAULT_IMAGE =
  "https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300";
const URL_EPISODE_SEARCH = "http://api.tvmaze.com/shows/[showid]/episodes";

//TODO: Add Docstrings.
$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** searchForShowAndDisplay: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */
async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  // $episodesArea.hide();
  populateShows(shows);
}

//**  getShowsByTerm: async function that gets response based on text in input field from tvmaze API and returns the data array. */
async function getShowsByTerm(term) {
  const response = await axios.get(`${URL_SHOW_SEARCH}`, {
    params: { q: term },
  });

  return response.data.map((apiResp) => {
    const show = apiResp.show;

    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : DEFAULT_IMAGE,
    };
  });
}

//**  populateShows: appends the show vairable of each matching show called by the users input. If the show does not have an image, a placeholder is inserted. */
function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-danger btn-sm getEpisodes" data-bs-toggle="modal" data-bs-target="#my-modal"> Episodes
             </button>
             <button class="btn btn-outline-success btn-sm Show-Actors">
               Actors
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }

  // $("Show-Actors").on("click", function (e) {
  //   actorDisplay(e);
  // });

  $(".getEpisodes").on("click", function (e) {
    episodeConstruct(e);
  });
}

//TODO: add docstrings.
async function episodeConstruct(evt) {
  const showId = getBtnId(evt);
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
}

//TODO: add docstrings.
function getBtnId(evt) {
  return $(evt.target).closest(".Show").data("show-id");
}

//TODO: adddotrings.
async function getEpisodesOfShow(id) {
  const episodes = await axios.get(`${URL_SHOW_ID}${id}/episodes`);

  return episodes.data.map((episode) => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    };
  });
}

//TODO: add docstrings
function populateEpisodes(episodes) {

  $modalBody.empty();

  for (let episode of episodes) {
    const $newLi = $("<li>");
    $modalBody.append(
      $newLi.text(
        `${episode.name}, Season: ${episode.season}, Number: ${episode.number}`
      )
    )
  }
  // $episodesArea.show();
}


const myModal = document.getElementById('my-modal')
const myInput = document.querySelector('.modalBody')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
