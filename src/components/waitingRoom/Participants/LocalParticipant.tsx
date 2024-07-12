import React, { useEffect, useRef, useState } from "react";
import { isMobile, isBrowser } from "react-device-detect";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  setVideoEnabled,
  setVideoDisabled,
  setAudioDisabled,
  setAudioEnabled,
} from "../../../actions/videoSettings";
import { attachTracks, detachTracks } from "../../../utils/trackFunctions";
import VolumeIndicator from './VolumeIndicator'

export const LocalParticipant = (props: any) => {
  const dispatch = useDispatch();

  const localVideoTrack = useSelector(
    (state: RootStateOrAny) => state.videoSettings.localVideoTrack
  );
  const videoStatus = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoStatus
  );
  const videoDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.videoDevice
  );
  const audioDevice = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioDevice
  );
  const audioStatus = useSelector(
    (state: RootStateOrAny) => state.videoSettings.audioStatus
  );
  const localAudioTrack = useSelector(
    (state: RootStateOrAny) => state.videoSettings.localAudioTrack
  );

  const room = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.room
  );

  const localParticipant = useSelector(
    (state: RootStateOrAny) => state.videoCallReducer.localParticipant
  );

  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [audioTracks, setAudioTracks] = useState<any>([]);

  const videoRef = useRef<any>();

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  // Split identity
  const participantName = props.participant.identity.split("$")[1];

  useEffect(() => {
    const localTrackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks: any) => [...audioTracks, track]);
      }
    };

    const localTrackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) =>
          videoTracks.filter((v: any) => v !== track)
        );
      } else {
        setAudioTracks((audioTracks: any) =>
          audioTracks.filter((a: any) => a !== track)
        );
      }
    };

    props.participant.on("trackSubscribed", localTrackSubscribed);
    props.participant.on("trackUnsubscribed", localTrackUnsubscribed);

    return () => {
      props.participant.removeListener("trackSubscribed", localTrackSubscribed);
      props.participant.removeListener(
        "trackUnsubscribed",
        localTrackUnsubscribed
      );
    };
  }, [props.participant]);

  useEffect(() => {
    attachTracks([localVideoTrack], videoRef.current);
  }, [localVideoTrack]);

  return (
    <div className={`call-img-main `}>
      <div className="gradient-overlay"></div>
      {isBrowser ? (
        <div className="d-none d-md-block" ref={videoRef}>
          {/* <video autoPlay={true}></video> */}
          {/* <img src="images/version4-images/video-img.jpg" alt="" /> */}
          <div className="user-call-info-main">
            <span className="usname">
              {participantName} {props.isLocal ? "(you)" : ""}
            </span>
            <div className="user-call-info mute-unmute mute-unmute-video">
              <ul>
                <li>
                  {!videoStatus ? (
                    <a
                      href="#"
                      title=""
                      className="video-mute video-m"
                      onClick={(e) => {
                        e.preventDefault();
                        room.localParticipant.videoTracks.forEach(
                          (publication: any) => {
                            publication.track.enable();
                          }
                        );
                        dispatch(
                          setVideoEnabled(videoDevice, localParticipant)
                        );
                      }}
                    ></a>
                  ) : (
                    <a
                      href="#"
                      title=""
                      className="video-unmute video-m"
                      onClick={(e) => {
                        e.preventDefault();
                        room.localParticipant.videoTracks.forEach(
                          (publication: any) => {
                            publication.track.disable();
                          }
                        );
                        dispatch(
                          setVideoDisabled([localVideoTrack], localParticipant)
                        );
                      }}
                    ></a>
                  )}
                </li>
                <li>
                  {!audioStatus ? (
                    <a
                      href="#"
                      title=""
                      className="speaker-mute speaker"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          setAudioEnabled(audioDevice, localParticipant)
                        );
                      }}
                    ></a>
                  ) : (
                    <a
                      href="#"
                      title=""
                      className="speaker-unmute speaker"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          setAudioDisabled([localAudioTrack], localParticipant)
                        );
                      }}
                    ></a>
                  )}
                </li>
                <li className="vol-imgs">
                <VolumeIndicator/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-block d-md-none inthiscall-mobile" ref={videoRef}>
          {/* <video ref={videoPreview} autoPlay={true}></video> */}
          <div className="user-call-info-main">
            <div className="user-call-info"></div>
            <span className="usname">{participantName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
