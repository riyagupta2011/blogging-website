import React from 'react'
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc,collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import './form.css'
interface CreateFormData{
    title:string,
    description:string,
}
function CreateForm() {

    
    const schema=yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),

    });

    const [user]=useAuthState(auth);
    const navigate=useNavigate();
    
    const { register,handleSubmit ,formState:{errors}}=useForm<CreateFormData>({
        resolver:yupResolver(schema),

    });
    const postRef=collection(db,"posts");

    const onCreatePost=async (data:CreateFormData)=>{
        await addDoc(postRef,{
            title:data.title,
            description:data.description,
            username:user?.displayName,
            userId:user?.uid,
        })
        navigate("/");
    }
  return (
    <div>
        <div className="myform">
        <form onSubmit={handleSubmit(onCreatePost)}>
           <input placeholder="Title....." {...register("title")} className='myinput'/>
           <p style={{color:"red"}}>{errors.title?.message}</p>
           <textarea placeholder="Description.." {...register("description")} className='mytextarea'/>
           <p style={{color:"red"}}>{errors.description?.message}</p>
           <input type="submit" className="mybutton"/>
        </form>
        </div>
    </div>
  )
}

export default CreateForm