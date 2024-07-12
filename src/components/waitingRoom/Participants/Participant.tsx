import React, { useEffect, useRef, useState } from "react";
import { isMobile, isBrowser } from "react-device-detect";
type ParticipantProps = {
  participant: any;

  isLocal: any;
};

export const Participant = ({ participant, isLocal }: ParticipantProps) => {
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [audioTracks, setAudioTracks] = useState<any>([]);
  const [trackDisable, setTrackDisable] = useState(false);
  const [audioDisable, setAudioDisable] = useState(false);
  const videoRef = useRef<any>();
  const audioRef = useRef<any>();

  const [isPortrait, setIsPortrait] = useState(false);

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  // Split identity
  const participantEmail = participant.identity.split("$")[0];
  const participantName = participant.identity.split("$")[1];
  // console.log(participant);
  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));

    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) => [...videoTracks, track]);
        track.attach(videoRef.current);
      } else {
        setAudioTracks((audioTracks: any) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
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

    const trackEnabled = (trackPub: any) => {
      // console.log(`TRACK PUB: ${trackPub.kind}`);
      if (trackPub.kind == "video") {
        setTrackDisable(false);
        trackPub.track.attach(videoRef.current);
      } else if (trackPub.kind == "audio") {
        setAudioDisable(false);
        // trackPub.track.attach(audioRef.current);
        // trackPub.track.attach(videoRef.current);
      }
    };

    const trackDisabled = (trackPub: any) => {
      if (trackPub.kind == "video") {
        setTrackDisable(true);
      } else if (trackPub.kind == "audio") {
        setAudioDisable(true);
      }
      // trackPub.track.detach();
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    participant.on("trackEnabled", trackEnabled);
    participant.on("trackDisabled", trackDisabled);
    participant.on("reconnecting", () => {
      console.log("participant is trying to reconnect");
    });
    // console.log(participant);

    return () => {
      // setVideoTracks([]);
      // setAudioTracks([]);
      // participant.removeAllListeners();
      participant.removeListener("trackSubscribed", trackSubscribed);
      participant.removeListener("trackUnsubscribed", trackUnsubscribed);

      participant.removeListener("trackEnabled", trackEnabled);
      participant.removeListener("trackDisabled", trackDisabled);
    };
  }, []);

  useEffect(() => {
    const videoStarted = (track: any) => {
      setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      track.attach(videoRef.current);
    };
    const videoDisabled = (track: any) => {
      setVideoTracks((videoTracks: any) =>
        videoTracks.filter((v: any) => v !== track)
      );
      track.detach();
    };
    const videoEnabled = (track: any) => {
      setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      track.attach(videoRef.current);
    };
    const videoTrack = videoTracks[0];

    if (videoTrack) {
      videoTrack.on("started", videoStarted);
      videoTrack.on("disabled", videoDisabled);
      videoTrack.on("enabled", videoEnabled);
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach(videoRef.current);
        videoTrack.removeAllListeners();
      };
    }
  }, []);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
    }
  }, [videoTracks]);

  return (
    <div
      className={`call-img-main ${
        trackDisable ? "muted-video-background" : ""
      }`}
    >
      <div className="gradient-overlay"></div>
      {isBrowser ? (
        <div className="d-none d-md-block">
          <video
            ref={videoRef}
            autoPlay={true}
            style={{ display: trackDisable ? "none" : "block" }}
          ></video>
          {/* <audio ref={audioRef}></audio> */}
          {/* <img src="images/version4-images/video-img.jpg" alt="" /> */}
          <div className="user-call-info-main">
            <span className="usname">
              {participantName} {isLocal ? "(you)" : ""}
            </span>
            <div className="user-call-info mute-unmute mute-unmute-video">
              <ul>
                <li>
                  {audioDisable ? (
                    <a
                      href="#"
                      title=""
                      className="speaker-mute speaker"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    ></a>
                  ) : (
                    ""
                  )}
                </li>
                <li className="vol-imgs">
                  {/* <img src="images/version4-images/volume.svg" alt="" /> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-block d-md-none inthiscall-mobile">
          <video ref={videoRef} autoPlay={true}></video>
          <div className="user-call-info-main">
            <div className="user-call-info">
              <ul>
                <li>
                  {audioDisable ? (
                    <a
                      href="#"
                      title=""
                      className="speaker-mute speaker"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    ></a>
                  ) : (
                    ""
                    // <a href="#" title="" className="speaker-unmute speaker"></a>
                  )}
                </li>
                <li className="vol-imgs">
                  {/* <img src="images/version4-images/call-dots.svg" alt="" /> */}
                </li>
              </ul>
            </div>
            <span className="usname">{participantName}</span>
          </div>
        </div>
      )}
    </div>
    // <div className="participant">
    //   <video ref={videoRef} autoPlay={true} />

    //   <audio ref={audioRef} autoPlay={true} />
    // </div>
  );
};
