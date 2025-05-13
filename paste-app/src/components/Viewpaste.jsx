import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import './view.css'

const Viewpaste = () => {

    const {id} = useParams();
    const allPastes = useSelector(p=> p.paste.pastes);

    const paste = allPastes.filter(p=> p._id===id)[0];


  return (
    <div>
        <div className='title'>
            {paste.title}
        </div>
        <div className='content' >
            {paste.content}
        </div>
    </div>
  )
}

export default Viewpaste
