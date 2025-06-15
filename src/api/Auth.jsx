const baseURL = "https://api.themoviedb.org/3";
const apiKey = "5a52374df203113ebc1af1fd75927315    ";

export async function getMoviesTrending() {
  const response = await fetch(
    `${baseURL}/trending/movie/day?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getMovies() {
  const response = await fetch(`${baseURL}/movie/popular?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

export async function getTVSeries() {
  const response = await fetch(`${baseURL}/tv/popular?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

export async function getMoviesPopular() {
  const response = await fetch(`${baseURL}/person/popular?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}

export async function getMovieDetails(id) {
  const response = await fetch(`${baseURL}/movie/${id}?api_key=${apiKey}`);
  const data = await response.json();
  return data;
}
