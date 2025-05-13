import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import './Home.css';

const Home = () => {

    const [title,setTitle] = useState('');
    const [value,setValue] = useState('');

    const [searchParams, setSearchParams]= useSearchParams();
    const pasteId = searchParams.get('pasteId');

    const allPastes = useSelector(p=> p.paste.pastes);

    useEffect(()=>{
        if(pasteId){
            const paste = allPastes.find( p => p._id === pasteId);

            setTitle(paste.title);
            setValue(paste.content);

        }
    },[pasteId]);

    const dispatch = useDispatch();


    function createPaste(){
        const paste = {
            title : title,
            content : value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }


        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }


        //after all

        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div className='container'>
        <div className='inner-container'>
            <input className='title-input' type='text' placeholder='Make Your Title here...'
                value={title} onChange={(e)=>setTitle(e.target.value)}/>

            <button className='create-button' onClick={createPaste}>
                { pasteId ? "Update My Paste" : "Create My paste"}
            </button>
        </div>
        <div className='textarea-container'>
            <textarea  className='text-area' value={value}  placeholder='Write Your content here...' 
              onChange={(e)=>setValue(e.target.value)} rows={13} cols={50}/>
        </div>
    </div>
  )
}

export default Home
