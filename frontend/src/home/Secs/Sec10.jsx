import React, { useEffect, useRef } from 'react'
const Sec10 = () => {
    const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => {
      if (videoElement) {
        videoElement.play().catch(error => {
          // Autoplay was prevented
          console.error('Autoplay was prevented:', error);
        });
      }
    };

    // Event listener for user interaction (e.g., click)
    const handleInteraction = () => {
      document.removeEventListener('click', handleInteraction);
      handlePlay();
    };

    // Attach the click event listener
    document.addEventListener('click', handleInteraction);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);
  return (
    <div className='mt-14'>
    <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        loop
        controls={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="https://media.graphassets.com/okjMYiS3eRh9cULy7cDg" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  </div>
  )
}

export default Sec10