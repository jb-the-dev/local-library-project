const { partitionBooksByBorrowedStatus, getBorrowersForBook, findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  // returns the account object from accounts array that matches the input account id
  return accounts.find((account)=> account.id === id)
}


function sortAccountsByLastName(accounts) {
  // sorts accounts array by last name
  accounts.sort((a, b) => {
    const nameA = a.name.last.toLowerCase()
    const nameB = b.name.last.toLowerCase()
    return nameA < nameB ? -1 : 1;
  })
  return accounts;
}


function getTotalNumberOfBorrows(account, books) { 
  // returns an account's total number of borrows across all books at the library

  let totalBorrows = 0;
  for (let i = 0; i < books.length; i++){
    const borrows = books[i].borrows
    for (let j = 0; j < borrows.length; j++){
      if (books[i].borrows[j].id === account.id){
        totalBorrows++
      }
    }
  } return totalBorrows 
}

function getBooksPossessedByAccount(account, books, authors) {
  // returns an array of book objects that are checked out by given user account
  // each book object also has the author object's properties added into it
  
  return books.filter((book)=>{
    let borrow = book.borrows[0]
    return !borrow.returned && borrow.id === account.id

  }).map((book)=>{
    book.author = findAuthorById(authors, book.authorId)
    return book
  })
}

    // Alternative using `for` loop and pushing into a new array
    // technically more efficient, but less of a "best practice"
          // function getBooksPossessedByAccount(account, books, authors) {
            // let booksThatAccountHas = []
            // for(let i=0; i < books.length; i++){
            //   let book = books[i]
            //   let borrow = book.borrows[0]
            //   if(!borrow.returned && borrow.id === account.id){
            //     book.author = findAuthorById(authors, book.authorId)
            //     booksThatAccountHas.push(book)
            //   }
            // } 
            // return booksThatAccountHas
          //}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
