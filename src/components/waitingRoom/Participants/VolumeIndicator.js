import React, { useState, useEffect } from "react";
import "./VolumeIndicator.css";

const VolumeIndicator = () => {
  const [activeBar, setActiveBar] = useState(null);
  useEffect(() => {
    let audioContext, microphone, analyser, javascriptNode;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: true,
        },
        function (stream) {
          audioContext = new AudioContext();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioContext.destination);

          javascriptNode.onaudioprocess = function () {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;
            var length = array.length;
            for (var i = 0; i < length; i++) {
              values += array[i];
            }
            var average = values / length;
            setActiveBar(Math.round(average - 40));
          };
        },
        function (err) {
          console.log("Error: " + err.name);
        }
      );
    } else {
      console.log("getUserMedia not supported");
    }
  }, []);
  return (
    <React.Fragment>
      <div className="sound-wave">
        <div
          className={
            activeBar > 1 ? "active h13" : activeBar > -30 ? "active h10" : ""
          }
        ></div>
        <div
          className={
            activeBar > 1 ? "active h20" : activeBar > -30 ? "active h15" : ""
          }
        ></div>
        <div className={activeBar > -30 ? "active h10" : ""}></div>
      </div>
    </React.Fragment>
  );
};

export default VolumeIndicator;
