import React, { useState, useRef, useEffect } from "react";
import { setDominantSpeaker } from "../../../actions/videoCallActions";
import VolumeIndicator from "./VolumeIndicator";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

export const DominantSpeaker = (props: any) => {
  const dispatch = useDispatch();
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [videoTrackSid, setVideoTrackSid] = useState(null);
  const [audioTracks, setAudioTracks] = useState<any>([]);
  const [isVideoTrack, setIsVideoTrack] = useState(true);
  const dominantSpeakerVid = useRef<any>(null);
  const audioRef = useRef<any>();

  const participantName = props.participant.identity.split("$")[1];

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  const dominantSpeakerTrackSubscribed = (track: any) => {
    console.log("TRACK SUBSCRIBED");
    if (track.kind === "video") {
      setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      track.attach(dominantSpeakerVid.current);
    } else {
      setAudioTracks((audioTracks: any) => [...audioTracks, track]);
    }
  };

  const dominantSpeakerTrackUnsubscribed = (track: any) => {
    console.log("TRACK UNSUBSCRIBED");
    if (track.kind === "video") {
      setVideoTracks((videoTracks: any) =>
        videoTracks.filter((v: any) => v !== track)
      );
      track.detach();
    } else {
      setAudioTracks((audioTracks: any) =>
        audioTracks.filter((a: any) => a !== track)
      );
    }
  };

  // const publishTrack = (trackPub: any) => {
  //   console.log("TRACK PUBLISH");
  //   if (trackPub.kind == "video") {
  //     setIsVideoTrack(true);
  //     trackPub.track.attach(dominantSpeakerVid.current);
  //   }
  // };
  // const unPublishTrack = (trackPub: any) => {
  //   console.log("TRACK UNPUBLISH");
  //   if (trackPub.kind == "video") {
  //     setIsVideoTrack(false);
  //   }
  // };

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(props.participant.videoTracks));
    setAudioTracks(trackpubsToTracks(props.participant.audioTracks));
  }, [props.participant]);

  useEffect(() => {
    if (videoTrackSid) {
      const videoTrack = videoTracks[0];
      videoTrack.attach(dominantSpeakerVid.current);
      return () => videoTrack.detach(dominantSpeakerVid.current);
    }
  }, [videoTrackSid]);

  useEffect(() => {
    console.log("Dominant Speaker Use Effect");
    if (videoTracks.length !== 0) {
      const videoTrack = videoTracks[0];
      setVideoTrackSid(videoTrack.sid);
    }
  }, [videoTracks]);

  useEffect(() => {
    // props.participant.on("trackEnabled", publishTrack);
    // props.participant.on("trackDisabled", unPublishTrack);
    props.participant.on("trackSubscribed", dominantSpeakerTrackSubscribed);
    props.participant.on("trackUnsubscribed", dominantSpeakerTrackUnsubscribed);

    return () => {
      props.participant.removeListener(
        "trackSubscribed",
        dominantSpeakerTrackSubscribed
      );
      props.participant.removeListener(
        "trackUnsubscribed",
        dominantSpeakerTrackUnsubscribed
      );
    };
  }, [props.participant]);

  return (
    <div
      className={`${!isVideoTrack ? "muted-video-background" : ""}`}
      style={{ height: "100%" }}
    >
      <video
        autoPlay={true}
        style={{ display: !isVideoTrack ? "none" : "block" }}
        ref={dominantSpeakerVid}
      ></video>
      <div className="user-call-info-main">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="usname" style={{ marginRight: 5 }}>
            {participantName}
          </span>
          <VolumeIndicator />
        </div>
        <div className="user-call-info mute-unmute mute-unmute-video">
          {/* <ul>
            <li>
              <a href="#" title="" className="video-mute video-m"></a>
              <a href="#" title="" className="video-unmute video-m"></a>
            </li>
            <li>
              <a href="#" title="" className="speaker-mute speaker"></a>
              <a href="#" title="" className="speaker-unmute speaker"></a>
            </li>
            <li className="vol-imgs">
              <img src="images/version4-images/volume.svg" alt="" />
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};
