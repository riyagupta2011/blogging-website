import React, { useEffect, useState } from "react";
import {deleteDoc ,getDocs, addDoc, collection, query, where, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./Main";
import { useAuthState } from "react-firebase-hooks/auth";
import './post.css'
interface Props {
  post: IPost;
}
interface Like {
  likeId:string;
  userId: string;
}
function Posting(props: Props) {
  const { post } = props;

  const likesRef = collection(db, "likes");

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId,likeId:doc.id })));
  };

  const addLike = async () => {
    try {
      const newDoc=await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid ,likeId: newDoc.id}] : [{ userId: user.uid ,likeId: newDoc.id}]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likesToDeleteQuery = query(likesRef, 
        where("postId", "==", post.id),
        where("userId", "==", user?.uid),
        );
        const likeToDeleteData=await getDocs(likesToDeleteQuery)
      const likeToDelete=doc(db,"likes",likeToDeleteData.docs[0].id);
      const likeId=likeToDeleteData.docs[0].id;
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) =>prev && prev.filter((like)=>like.likeId !==likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };


  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div className="mypost">
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p className="name"> @{post.username}</p>
        <button onClick={hasUserLiked?  removeLike:  addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes:{likes?.length}</p>}
      </div>
    </div>
  );
}

export default Posting;
