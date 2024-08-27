
import './App.css';
import {useEffect, useState} from 'react'


function App() {

  const [posts, setPosts] = useState([])

  const url = "http://127.0.0.1:8000/api/posts/"

  const fetchPosts = async () =>{
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPosts(data)
    }catch (err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[])


  return (
    <div className="App">
      <h1>Posts</h1>
      <div>
        <input type="text" placeholder=' post...'></input>
        <button>POST</button>
      </div>
      {posts.map((post) => {
        const {id, title, content } = post

        return(
          <div key={id}>
            <h1>{title}</h1>
            <h4>{content}</h4>
          </div>
        )
      })}
    </div>
   
  );
}

export default App;
