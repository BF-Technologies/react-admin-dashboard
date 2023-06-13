import React, { useRef, useEffect } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

const Player = () => {
  const videoRef = useRef(null);
  let jsmpegPlayer = null;

  useEffect(() => {
    jsmpegPlayer = new JSMpeg.Player('ws://10.90.0.8:9999', {
      canvas: videoRef.current,
      autoplay: true,
      audio: false,
    });

    return () => {
      if (jsmpegPlayer) {
        jsmpegPlayer.destroy();
        jsmpegPlayer = null;
      }
    };
  }, []);

  return (
    <div className="content">
      <canvas ref={videoRef} />
    </div>
  );
};

export default Player;