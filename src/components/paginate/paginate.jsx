import React from 'react';
 
export const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage, currentPage }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <nav>
         <ul className="pagination">
            <li onClick={previousPage} className={"page-number + " + (currentPage === 1 ? ' disable' : '')}>Prev</li>
            {currentPage > 3 && (
                  <>
                  <li
                     key={pageNumbers[0]} onClick={() => paginate(pageNumbers[0])}
                     className={"page-number page-item" + (currentPage === pageNumbers[0] ? ' active' : '')}>
                     {pageNumbers[0]}
                  </li>
                  <li className='page-number page-item ellipsis'>...</li>
                  </>
               )}
            {pageNumbers
               .filter((number) => 
                  number === currentPage - 1 || number === currentPage || number === currentPage + 1
               )
               .map((number) => (
                  <li
                     key={number}
                     onClick={() => paginate(number)}
                     className={"page-number page-item" + (currentPage === number ? ' active' : '')}
                  >
                     {number}
                  </li>
               ))}
               {currentPage !== pageNumbers.length && currentPage + 1 !== pageNumbers.length && (
                  <>
                  <li className='page-number page-item ellipsis'>...</li>
                  <li
                     key={pageNumbers.length} onClick={() => paginate(pageNumbers.length)}
                     className={"page-number page-item" + (currentPage === pageNumbers.length ? ' active' : '')}>
                     {pageNumbers.length}
                  </li>
                  </>
               )}
               <li onClick={nextPage} className={"page-number + " + (currentPage === pageNumbers.length? ' disable' : '')}>Next</li>
         </ul>
      </nav>
   );
};
 
export default Paginate;