import "./App.css";
import ab from "./Assests/images(2).jpg";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import NewPost from './components/NewPost';
function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    // file && console.log(URL.createObjectURL(file))
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };
    file && getImage();
  }, [file]);
  console.log(image);
  return (
    <div>
      <Navbar />
      {image?(<NewPost image={image}/>):(

        <div className="newPostCard">
        <div className="addPost">
          <img src={ab} alt="" className="avatar" />
          <div className="postForm">
            <input
              type="text"
              placeholder="Whats on your mind?"
              className="postInput"
            />
            <label htmlFor="file">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="adding"
              />
              <img
                src="data:image/png;base64,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"
                alt=""
                className="adding"
              />
              <img
                src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/calendar-icon.png"
                alt=""
                className="adding"
                />
              <button>Send</button>
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="file"
              style={{ display: "none" }}
              type="file"
            />
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default App;
