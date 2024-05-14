import React, {useState, useEffect} from 'react';
import {Paginate} from '../../components/paginate/paginate';

export function FlickrApi() {
  const interestingList = 'flickr.interestingness.getList';
  const userPhotos = 'flickr.people.getPhotos';
  const favorites = 'flickr.favorites.getList';
  const user_id = '12757364@N04';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState(userPhotos);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
 };
 
  const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${process.env.REACT_APP_flickr_api_key}&user_id=${user_id}&format=json&nojsoncallback=1`;
   // TODO: update with react pagination.
  useEffect(() => {
    async function getUserImages(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        const photos = jsonData.photos.photo;
        const parsedPhotos = photos.map(photo => ({
          id: photo.id,
          owner: photo.owner,
          secret: photo.secret,
          server: photo.server,
          title: photo.title
        }));
        setLoading(false);
        setData(parsedPhotos);
      } catch (error) {
        console.log('error=', error);
        setLoading(false);
      }
    }
    getUserImages(url);
  }, [url]);

  const previousPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };

 const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) {
       setCurrentPage(currentPage + 1);
    }
 };

const getImageUrl= (serverid,id,secret,sizesuffix) => {
  // https://www.flickr.com/services/api/misc.urls.html documentation
  return `https://live.staticflickr.com/${serverid}/${id}_${secret}_${sizesuffix}.jpg`;
};

  return (
    <div className='container row bs-component mx-auto gap-3'>
      <h1 className='page-header p-2'>Flickr API</h1>
      <div>
        <button type='button' onClick={() => setMethod(interestingList)}>Interesting list</button> | 
        <button type='button' onClick={() => setMethod(userPhotos)}>Hawgfuel's photos</button> |
        <button type='button' onClick={() => setMethod(favorites)}>Hawgfuel's favorites</button>
      </div>
      {loading && <h1>Loading...</h1>}
        {data && currentPosts.map(photo => (
          <div className="gallery-image image-size-w" key={photo.id}>
            <img alt={photo.title} src={getImageUrl(photo.server,photo.id,photo.secret, 'w')} />
            <p>{photo.title} by {photo.owner}</p>
          </div>
        ))
    }
    <div className=''>
        <Paginate
           postsPerPage={postsPerPage}
           totalPosts={data.length}
           paginate={paginate}
           previousPage={previousPage}
          nextPage={nextPage}
        />
        </div>
    </div>
  );
}