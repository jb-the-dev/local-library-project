function findAuthorById(authors, id) {
  // returns the author object from authors array that matches the input author id
  return authors.find((author) => author.id === id)
}


function findBookById(books, id) {
  // returns the book object from books array that matches the input book id
  return books.find((book)=> book.id === id)
}


function partitionBooksByBorrowedStatus(books) {
  // returns a two-dimensional array with two arrays: borrowed books first, then returned books
  const borrowedBks = [];
  const returnedBks = [];

  for (let book of books){
    let notReturned = !book.borrows[0].returned
   notReturned ? borrowedBks.push(book) : returnedBks.push(book)
  }
  return [borrowedBks, returnedBks]
}


function getBorrowersForBook(book, accounts) {
  // returns an array of up to 10 borrowers' accounts who've checked out a specific book
  // adds a `returned: true/false` property to each borrower's account in above array

 let bookBorrowers = []
 for(let acct of accounts){
   let acctId = acct.id
   for(let i = 0; i < book.borrows.length; i++){ // looping through list of borrowers
    let borrower = book.borrows[i]
    if(acctId === borrower.id){
      acct['returned'] = borrower.returned // creates new key.value pair in account object with return status
      bookBorrowers.push(acct) // adds borrower _with_ returned status^^ into bookBorrowers array
      }  
    }
  } 
  
  while (bookBorrowers.length > 10){    // shortening the array to 10 elements
    bookBorrowers.pop()
  }
    return bookBorrowers
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
