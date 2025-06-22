// Get all Necessary elements
const input = document.getElementById('Input');
const btn = document.getElementById('button');
const result_container = document.getElementById('movie-results');

// OMDB API key
const API_KEY = '';//Add Your ApiKey 

// Add EventListener
btn.addEventListener("click", ()=>{
   valid_input();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    valid_input();
  }
});


// Function to validate the input
 const valid_input =() =>{
  const userinput = input.value.trim()
  if(userinput){
    fetchData(userinput);
    input.value = ''; // Clear input field after fetching
  }
  else{
    alert('Plese Enter Movie Name')
   
  }
 }

  async function fetchData(userinput){
 console.log('Fetching Movie:', userinput);
  // Show loader and clear previous results
  document.getElementById('loader').style.display = 'inline-grid';
 
 try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=f5c9727e&s=${encodeURIComponent(userinput)}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // await to parse JSON
        console.log(data);

        // If movie not found
    if (data.Response === "False") {
       alert('Movie not found. Please try another search.')
    }
    else{
      // Loop through top 10 search results
       const movie_data = data.Search.slice(0,10).map(item=>{
        console.log(item)
        return`
    <div class="movie-card">
      <img src="${item.Poster !== "N/A" ? item.Poster : 'https://via.placeholder.com/150'}"  alt="Movie Poster" />
      <h2>${item.Title}</h2>
      <p>${item.Year}</p>
   </div>
        `
       }).join('');
       // Display movie cards inside result container
       result_container.innerHTML = movie_data;
    }
  
  } catch (error) {
    console.error('Fetch error:', error);
     result_container.innerHTML = "";
    
  }
   finally {
    // Always hide loader
    document.getElementById('loader').style.display = 'none';
  }

}

