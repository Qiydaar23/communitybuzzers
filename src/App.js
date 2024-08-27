
import './App.css';
import React, {useEffect, useState} from 'react'


function App() {

  const [posts, setPosts] = useState([])

  const [comment , setComment] = useState("")
  const [titleName , setTitleName] = useState("")
  const [editcomment, setEditcomment] = useState("")

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

  const handleEdit = async (pk, comment) => {

    const commentData = {
      title: titleName,          // Ensure 'title' is defined in your component
      content: editcomment   // Ensure 'editcomment' is defined in your component
    };

    const response = await fetch(`http://127.0.0.1:8000/api/posts/${pk}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });

    const data = await response.json();
    
    setPosts((prev) => 
      prev.map((post) => {
        if (post.id === pk) {
          return data;
        } else {
          return post;
        }
      })
    );
};


const handleDelete = async (pk) => {

  const response = await fetch(`http://127.0.0.1:8000/api/posts/${pk}`, {
    method: "DELETE",
  });

  if (response.ok) {
    setPosts((prev) => prev.filter((post) => post.id !== pk));
  } else {
    console.error('Failed to delete the post');
  }
};



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
            <input type='text' placeholder='edit content...' onChange={(e)=>setEditcomment(e.target.value)}/>
            <button onClick={() => handleEdit(post.id, title)}>EDIT</button>
            <button onClick={()=>handleDelete(id)}>Delete</button>
          </div>
        )
      })}
    </div>
   
  );
}

export default App;


// const addminus = async() => {
//   const add = {
//     python: React,
//     python : react
//   }
//   const response = await fetch("", {
//     method:"POST",
//     headers: {'content-Type':'application/json'},
//     body: JSON.stringify(add)
//   })
//   const data = response.json()
//   setPosts((prev) => [...prev, data])
// }