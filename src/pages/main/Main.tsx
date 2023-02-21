import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '../../config/firebase'
import { getDocs,collection } from 'firebase/firestore'
import  Posting  from './post';
export interface Post{
   id:string;
   userId:string;
   title:string;
   username:string;
   description:string;
}
function Main() {
  const [postsList,setPostList]=useState<Post[] | null>(null);
  const postRef=collection(db,"posts");
  const getPosts=async()=>{
    const data=await getDocs(postRef)
     setPostList(
      data.docs.map
      ((doc) => ({ ...doc.data(), id: doc.id})) as Post[]
     );
  };
  useEffect(()=>{
    getPosts();
  },[]);
  return (
    <div>
      {postsList?.map((post)=>(
        
       <Posting post={post}/>
    ))} 
   
    </div>
  )
}

export default Main