//ASSIGNMENT 4: 
//------------
//Movie Streaming Platform
//
//You are working on a movie recommendation system.
//
//Test data:
//const movies = [
//  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
//  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
//  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
//  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
//];
//
//
//Tasks:
//    1. filter() only "Sci-Fi" movies
//    2. map() to return:
//            "Inception (8.8)"
//
//    3. reduce() to find average movie rating
//    4. find() movie "Joker"
//    5. findIndex() of "Avengers"


const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

let r1=movies.filter((movie)=>movie.genre=="Sci-Fi")
console.log(r1)

//only Inception (8.8)

let r2=movies.map((movie)=>{
    return `${movie.title} (${movie.rating})`
})
console.log(r2[0])

let avg=movies.reduce((accumulator,movie)=>accumulator+movie.rating,0)/movies.length
console.log(avg)

let f=movies.find((movie)=>movie.title=="Joker")
console.log(f)

let i=movies.findIndex((movie)=>movie.title=="Avengers")
console.log(i)
