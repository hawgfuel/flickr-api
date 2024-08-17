import React, { useState, useEffect } from 'react';
import { FlickrApi } from "./pages/flickr/flickr";

function App() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [method, setMethod] = useState('flickr.people.getPhotos');

  const user_id = '12757364@N04';

  const getUserImages = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      const photos = jsonData.photos.photo;
      const parsedPhotos = photos.map((photo: any) => ({
        id: photo.id,
        owner: photo.owner,
        secret: photo.secret,
        server: photo.server,
        title: photo.title
      }));
      setLoading(false);
      setData(parsedPhotos);
      setCurrentPage(1);
    } catch (error) {
      console.log('error=', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${process.env.REACT_APP_flickr_api_key}&user_id=${user_id}&format=json&nojsoncallback=1`;
    getUserImages(url);
  }, [method]);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const previousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) setCurrentPage(currentPage + 1);
  };

  const getImageUrl = (serverid: string, id: string, secret: string, sizesuffix: string) => 
    `https://live.staticflickr.com/${serverid}/${id}_${secret}_${sizesuffix}.jpg`;

  return (
    <div className="App">
      <FlickrApi 
        data={data} 
        loading={loading}
        currentPage={currentPage} 
        postsPerPage={postsPerPage} 
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        getImageUrl={getImageUrl}
        setMethod={setMethod}
      />
    </div>
  );
}

export default App;
