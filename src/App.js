
import './App.css';
import {useEffect, useState} from 'react'


function App() {

  const [posts, setPosts] = useState([])

  const [comment , setComment] = useState("")
  const [titleName , setTitleName] = useState("")

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

  const addComment = async () => {

    const commentData = {

      title: titleName,
      content: comment
    }
    const response = await fetch("http://127.0.0.1:8000/api/posts/create",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(commentData)
    })
    const data = await response.json()
    setPosts((prev) => [...prev, data])
  }


  return (
    <div className="App">
      <h1>Posts</h1>
      <div>
        <input type="text" placeholder=' title...' onChange={(e)=>setTitleName(e.target.value)}></input>
        <input type="text" placeholder=' comment...' onChange={(e)=>setComment(e.target.value)}></input>
        <button onClick={addComment}>POST</button>
      </div>
      {posts.map((post) => {
        const {id, title, content } = post

        return(
          <div key={id}>
            <h1>{title}</h1>
            <h4>{content}</h4>
            <input type='text' placeholder='edit content...'/>
            <button>edit comment</button>
          </div>
        )
      })}
    </div>
   
  );
}

export default App;
