import './App.css';
import ab from './Assests/images(2).jpg';
import Navbar from './components/Navbar';
function App(){
  return (
    <div>
      <Navbar />
     <div className="newPostCard">
       <div className="addPost">
         <img src= {ab} alt="" className='avatar'/>
         <div className="postForm">
           <input type="text" placeholder='Whats on your mind?'
           className='postInput' />
           <label htmlFor="file">
             <img src="" alt="" className="adding" />
             <img src="" alt="" className="adding" />
             <img src="" alt="" className="adding" />
             <img src="" alt="" className="adding" />
             <img src="" alt="" className="adding" />
           </label>
           <input id="file" style={{display:"none"}} type="file" />
           <button>Send</button>
         </div>
       </div>
     </div>
    </div>
  );
}

export default App;
