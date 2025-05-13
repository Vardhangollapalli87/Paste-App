import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast'
import './paste.css'

const Paste = () => {

    const pastes = useSelector((state)=> state.paste.pastes);

    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
      
    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));
    }

    const handleShare = (paste) => {
        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
      
        if (navigator.share) {
          navigator.share({
            title: paste.title,
            text: 'Check out this paste!',
            url: shareUrl,
          }).catch((err) => {
            // user might cancel the share
            if (err.name !== 'AbortError') {
              toast.error('Error sharing');
            }
          });
        } else {
          navigator.clipboard.writeText(shareUrl)
            .then(() => toast.success("Link copied to clipboard"))
            .catch(() => toast.error("Failed to copy link"));
        }
      };
      

  return (
    <div>
     <input className='search-bar' type='search' placeholder='search here' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}   />

     <div className='pastes-container'>
        <p className='heading'>PASTES</p>
        {   
            filteredData.length >0 &&
            filteredData.map((paste)=>{
                return (
                    <div className='paste' key={paste?._id}>
                        <div className='paste-title'>{paste.title}</div>
                        {/* <div>{paste.content}</div> */}
                        <div className='buttons'>
                            <button>
                                <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                                
                            </button>
                            <button>
                                <a href={`/pastes/${paste?._id}`}>View</a>
                                
                            </button>
                            <button onClick={()=>handleDelete(paste?._id)}>Delete</button>
                            <button onClick={()=>{
                                navigator.clipboard.writeText(paste?.content);
                                toast.success("Copied to clipboard");
                            }}>Copy</button>
                            <button onClick={() => handleShare(paste)}>Share</button>

                        </div>
                        <div className='date'>
                            {paste.createdAt}
                        </div>
                    </div>
                )
            })
        }
     </div>
    </div>
  )
}

export default Paste
