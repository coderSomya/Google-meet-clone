import React, { useContext, useEffect, useRef, useState } from 'react';

const UserFeedPlayer: React.FC <{stream: MediaStream}> = ({stream}: {stream: MediaStream}) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(()=>{
    if(videoRef.current && stream){
        videoRef.current.srcObject = stream;
    }
  },[stream])
  return (
    <div className='w-[300px] h-[400px] border-rounded-xl'>        
        <video
        ref={videoRef}
        muted={true}
        autoPlay
        />
    </div>
  )
}

export default UserFeedPlayer