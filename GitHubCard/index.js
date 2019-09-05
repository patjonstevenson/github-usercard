/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector(".cards");
const userLink = `https://api.github.com/users/${window.prompt(
  "Enter GitHub username: "
)}`;
//addCard(makeUserCard(userLink), cards);
//addFollowers(userLink, cards);
userPage(userLink, cards);

function userPage(userLink, entry) {
  entry.childNodes.forEach(node => cards.removeChild(node));
  addCard(makeUserCard(userLink), entry);
  addFollowers(userLink, entry);
}

function makeUserCard(link) {
  return axios
    .get(link)
    .then(response => {
      return userCard(response.data);
    })
    .catch(err => console.log(err));
}

function addCard(userPromise, entry) {
  userPromise
    .then(user => entry.appendChild(user))
    .catch(err => console.log(err));
}

function followersUrl(link) {
  return axios
    .get(link)
    .then(response => response.data.followers_url)
    .catch(err => console.log(err));
}

function followersUrlList(link) {
  return axios
    .get(link)
    .then(response => response.data.map(user => user.url))
    .catch(err => console.log(err));
}

function addFollowers(userLink, entry) {
  followersUrl(userLink)
    .then(link => {
      followersUrlList(link)
        .then(list => {
          list.forEach(user => addCard(makeUserCard(user), entry));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/
//makeUsers(userLink, cards);
/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function userCard(obj) {
  // Create card elements
  const card = document.createElement("div");
  const image = document.createElement("img");
  const info = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const link = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  // Add classes
  card.classList.add("card");
  info.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  // Add content
  image.src = obj.avatar_url;
  name.textContent = obj.name;
  username.textContent = obj.login;
  location.textContent = `Location: ${obj.location}`;
  profile.textContent = `Profile: `;
  link.textContent = obj.html_url;
  followers.textContent = `Followers: ${obj.followers}`;
  following.textContent = `Following: ${obj.following}`;
  bio.textContent = `Bio: ${obj.bio}`;

  // Add event listener to card
  card.addEventListener("click", event => userPage(obj.url, cards));

  // Structure nesting of children
  card.appendChild(image);
  info.appendChild(name);
  info.appendChild(username);
  info.appendChild(location);
  info.appendChild(profile);
  profile.appendChild(link);
  info.appendChild(followers);
  info.appendChild(following);
  info.appendChild(bio);
  card.appendChild(info);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
