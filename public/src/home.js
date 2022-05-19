const { partitionBooksByBorrowedStatus, findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  // returns the total number of books in the array
  return books.length
}


function getTotalAccountsCount(accounts) { 
  // returns the total number of accounts in the array
  return accounts.length
}


function getBooksBorrowedCount(books) {
  // returns the total number of books that are currently borrowed
  // an array of only borrowed books already exists from another formula 
  const borrowedBooks = partitionBooksByBorrowedStatus(books)[0]
  return borrowedBooks.length
}


function getMostCommonGenres(books) {
  // returns a top 5 list of the most common genres
  // each genre is an object with a name and a count of total books in that genre

    let countGenres = books.reduce((acc, book)=>{   // creates a counter to track number of books in each genre
      if (acc[book.genre]){
        acc[book.genre] += 1;
      }else{
        acc[book.genre] = 1;
      }
      return acc
    }, {})

    let keys = Object.keys(countGenres); // converts object of objects, into array of object keys to use with array methods

    let sortedGenres = keys.map((genre)=>({name: genre, count: countGenres[genre]})) // reformats objects to final properties that were requested 

    _sortAndFiveArray(sortedGenres) // sorts and shortens to top 5 books

    return sortedGenres
  }



//ALTERNATIVE WAYS TO SOLVE (with nested alternative code blocks, separated by //TODO's)
        // function getMostCommonGenres(books){  
          //   let countGenres = {} 
          //   books.map((book)=>{
          //     (!countGenres[book.genre]) ? countGenres[book.genre] = 1 : countGenres[book.genre]++;
          //   })
          //   const popularGenres = []
          //   for(let genre in countGenres){
          //     popularGenres.push({name: genre, count: countGenres[genre]})
          //   }

          //   _sortAndFiveArray(popularGenres)

          //   return popularGenres
        // }  

              //TODO Alternative array creation using `for...of` looping through an `Object.entries()` array of countGenres
              // const popularGenres = []
              // for(let [key, value] of Object.entries(countGenres)){
              //   popularGenres.push({
              //     "name": key,
              //     "count": value
              //   })
              // }
        // }


function getMostPopularBooks(books) {
  // returns top 5 books that have been checked out

  let popularBooks = books.map((book)=>{    // reformats objects to final properties that were requested
    const name = book.title;
    const count = book.borrows.length;
    const popularBook = {name, count}
    // let popularBook = {             
    //   "name": book.title,
    //   "count": book.borrows.length
    // };
    return popularBook
  });

_sortAndFiveArray(popularBooks) // sorts and shortens to top 5 books
return popularBooks
}


function getMostPopularAuthors(books, authors) {
  // returns top 5 authors whose books have been borrowed

  let authorsListObj = {}
  for (let book of books){
    let borrowCount = book.borrows.length

    if (authorsListObj[book.authorId]){     // accumulates the total borrows for each author
      let currentCount = authorsListObj[book.authorId]
      let totalBorrows = currentCount + borrowCount
      authorsListObj[book.authorId] = totalBorrows
    }else{
      authorsListObj[book.authorId] = borrowCount
    }
  }

  let popularAuthors = authors.map((author)=>{    // places final objects into array
    const {name: {first, last}} = author
    let popAuthor = {  
         "name": `${first} ${last}`,
         "count": authorsListObj[author.id] // pulls accumulated count from object into array
       }
       return popAuthor
  })

  _sortAndFiveArray(popularAuthors) // sorts and shortens to top five authors
  console.log(popularAuthors)
  return popularAuthors
  
}


// ALTERNATIVE - this passed tests, but did not actually accumulate borrows for each author
        // function getMostPopularAuthors(books, authors){
          // let author = findAuthorById(authors, book.authorId)
          // const {name: {first, last}} = author
          // let popAuthor = {  
          //   "name": `${first} ${last}`,
          //   "count": borrowCount
          // }
          // popularAuthors.push(popAuthor)
          // _sortAndFiveArray(popularAuthors)
          // return popularAuthors
        // }



// HELPER FUNCTIONS
function _sortAndFiveArray(array){ 
  let sortedArray = array.sort((elemA, elemB)=>elemB.count - elemA.count)
  while (sortedArray.length > 5) array.pop()
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
