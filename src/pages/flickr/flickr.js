import React, {useState, useEffect} from 'react';

  //`https://api.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=29b2fa3defd68fd099b0a1e9260b0d73&per_page=10&format=json&nojsoncallback=1`

export function FlickrApi() {
  const interestingList = 'flickr.interestingness.getList';
  const userPhotos = 'flickr.panda.getPhotos';
  const [data, setData] = useState([]);
  const [method, setMethod] = useState(interestingList);
 
  const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=29b2fa3defd68fd099b0a1e9260b0d73&user_id=hawgfuel&limit=20`;
   
  useEffect(() => {
    async function getUserImages(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
        const photos = xmlDoc.getElementsByTagName('photo');
        const parsedPhotos = Array.from(photos).map(photo => ({
          id: photo.getAttribute('id'),
          owner: photo.getAttribute('owner'),
          secret: photo.getAttribute('secret'),
          server: photo.getAttribute('server'),
          title: photo.getAttribute('title')
        }));
        setData(parsedPhotos);
      } catch (error) {
        console.log('error=', error);
      }
    }
    getUserImages(url);
  }, [url]);


const getImageUrl= (serverid,id,secret,sizesuffix) => {
  // https://www.flickr.com/services/api/misc.urls.html documentation
  return `https://live.staticflickr.com/${serverid}/${id}_${secret}_${sizesuffix}.jpg`;
};

  return (
    <div className='container row bs-component mx-auto gap-3'>
      <h1 className='page-header p-2'>Flickr API</h1>
      <button type='button' onClick={() => setMethod(interestingList)}>Interesting list</button>
      <button type='button' onClick={() => setMethod(userPhotos)}>Hawgfuel photos</button>
        {data && data.map(photo => (
          <div className="gallery-image image-size-w" key={photo.id}>
            <img alt={photo.title} src={getImageUrl(photo.server,photo.id,photo.secret, 'w')} />
            <p>{photo.title} by {photo.owner}</p>
          </div>
        ))}
    </div>
  );
}