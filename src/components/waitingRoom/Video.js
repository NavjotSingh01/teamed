import React, { useEffect } from "react";
import Video from "twilio-video";

function VideoChat(props) {
  // useEffect(() => {
  //   Video.createLocalVideoTrack().then(track => {
  //     const localMediaContainer = document.getElementById("video-area");
  //     localMediaContainer.appendChild(track.attach());
  //   });
  // }, []);

  return <div class="waiting-main-img" id="video-area"></div>;
}

export default VideoChat;
