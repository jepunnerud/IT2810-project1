# The project - countrify

To start the local server run `yarn dev` or `npm run dev`. <br />

The website shows a collection of all the independent countries in the world. <br />
The home page displays the flags and names of the countries. Using a dropdown bar, you can sort the countries based on name, population or size of area. The user can also search for specific countries. <br />
Clicking on a flag will lead the user to a page which displays more info about this country. Here, the user can add the country to favorites. This is a local storage, and after adding, the country can be found on the favorites page.

## The progress

We set up some tools at the start of the project:

- Prettier to avoid merge conflicts due to formatting
- CI pipeline to avoid merging code with build and linting errors
- Protection of the main branch to maintain integrity

### API and storage:

- The REST API is open, which gives us the advantage of avoiding using environment variables
- Local storage saves favorites. This saves the favorite to the browser even after exiting the project
- Session storage for the sorting parameter on the home page. This contributes to the countries being sorted by name on default when the website is first loaded
- State is being used to keep the info page updated

### Design:

- Extensive use of flexbox to ensure responsive design
- Use of Fuse.js library to implement fuzzy search since this would have taken too much time to implement on our own

## Testing

We have written tests for the Home page and the Favourites page components. We also have three snapshot test. <br />

The tests we wrote did not pass the build and lint pipeline due to use of type any. They all run and pass on the same branch: favorites-page-test. But to maintain code quality we decided not to force them to main. Following tests would have been included if we had managed in time:

When testing the Home page, we want to check that the page is rendering. We also wanted to test the sorting and filtering parameters. <br />

We also tested the core functonallity of the Favorites page. When no favourites are added to localStorage, no cardContainers (countries) are rendered. If a landcode is stored in localStorage, the country is supposed to be rendered in the favouritesPage. We chose to test for this functionality because it is the key functionality of the favouritespage as well as the program itself. We tested for this functionality by mocking the api, using Handlers.tsx, mock_data.json and queryprovider.tsx. <br />
