import React from 'react';
 
export const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage, currentPage }) => {
   const pageNumbers = [];
 
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }
 
   return (
      <nav>
         <ul className="pagination">
         <li onClick={previousPage} className="page-number">
               Prev
            </li>
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)}
                  className={"page-number page-item " + (currentPage === number ? 'active' : '')}
               >
                  {number}
               </li>
            ))}
            <li onClick={nextPage} className="page-number">
               Next
            </li>
         </ul>
      </nav>
   );
};
 
export default Paginate;