import React from 'react';
import { Paginate } from '../../components/paginate/paginate';

interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

interface FlickrApiProps {
  data: Photo[];
  loading: boolean;
  currentPage: number;
  postsPerPage: number;
  paginate: (pageNumber: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  getImageUrl: (serverid: string, id: string, secret: string, sizesuffix: string) => string;
  setMethod: (method: string) => void;
}

export function FlickrApi({
  data,
  loading,
  currentPage,
  postsPerPage,
  paginate,
  previousPage,
  nextPage,
  getImageUrl,
  setMethod
}: FlickrApiProps) {
  const interestingList = 'flickr.interestingness.getList';
  const userPhotos = 'flickr.people.getPhotos';
  const favorites = 'flickr.favorites.getList';

  return (
    <div className='container row bs-component mx-auto gap-3'>
      <h1 className='page-header p-2'>Flickr API</h1>
      <div>
        <button type='button' onClick={() => setMethod(interestingList)}>Interesting list</button> | 
        <button type='button' onClick={() => setMethod(userPhotos)}>Hawgfuel's photos</button> |
        <button type='button' onClick={() => setMethod(favorites)}>Hawgfuel's favorites</button>
      </div>
      {loading && <h1>Loading...</h1>}
      {!loading && data && data.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map(photo => (
        <div className="gallery-image image-size-w" key={photo.id}>
          <img alt={photo.title} src={getImageUrl(photo.server, photo.id, photo.secret, 'w')} />
          <p>{photo.title} by {photo.owner}</p>
        </div>
      ))}
      <div className=''>
        <Paginate
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={paginate}
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}
