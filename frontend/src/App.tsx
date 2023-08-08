import { useEffect, useState } from 'react';

import './App.css';
import { handleFileChange } from './utils/uploadFiles';
import { getImages, deleteImage } from './utils/api';

function App() {
   const [images, setImages] = useState<string[]>();

   const fetchDataAndSetState = () => {
      getImages().then(res => setImages(res));
   };

   useEffect(() => {
      fetchDataAndSetState();
   }, []);

   return (
      <div className="App">
         <div className="TopContainer">
            <h2>S3 이미지 업로드 in React</h2>
            <label htmlFor="file">파일 업로드</label>
            <input
               id="file"
               onChange={e => {
                  handleFileChange(e).then(() => setTimeout(() => fetchDataAndSetState(), 500));
               }}
               multiple
               type="file"
            />
         </div>
         <div className="ImageContainer">
            {images &&
               images.map(data => (
                  <div className="ImageBox" key={data}>
                     <img alt="fruits" src={`https://doromo-example.s3.ap-northeast-2.amazonaws.com/${data}`} />
                     <div className="InfoBox">
                        <p>{data}</p>
                        <span
                           onClick={() => {
                              deleteImage(data).then(() => fetchDataAndSetState());
                           }}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                              fill="white"
                           >
                              <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
                           </svg>
                        </span>
                     </div>
                  </div>
               ))}
         </div>
      </div>
   );
}

export default App;
