import React, { useEffect, useRef, useState } from "react";

export const ParticipantVoice = (props: any) => {
  const audioRef = useRef(null);
  const [audioTracks, setAudioTracks] = useState<any>([]);
  const [audioDisable, setAudioDisable] = useState(false);

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setAudioTracks(trackpubsToTracks(props.participant.audioTracks));

    const trackSubscribed = (track: any) => {
      console.log("track subscribed");
      if (track.kind === "audio") {
        setAudioTracks((audioTracks: any) => [...audioTracks, track]);
      } else {
      }
    };

    const trackUnsubscribed = (track: any) => {
      console.log("track unsubscribed");
      if (track.kind === "audio") {
        setAudioTracks((audioTracks: any) =>
          audioTracks.filter((a: any) => a !== track)
        );
        track.detach();
      } else {
      }
    };

    const trackEnabled = (trackPub: any) => {
      if (trackPub.kind == "audio") {
        setAudioDisable(false);
      }
    };

    const trackDisabled = (trackPub: any) => {
      if (trackPub.kind == "audio") {
        setAudioDisable(true);
      }
    };

    props.participant.on("trackSubscribed", trackSubscribed);
    props.participant.on("trackUnsubscribed", trackUnsubscribed);

    props.participant.on("trackEnabled", trackEnabled);
    props.participant.on("trackDisabled", trackDisabled);

    return () => {
      // setVideoTracks([]);
      // setAudioTracks([]);

      props.participant.removeListener("trackSubscribed", trackSubscribed);
      props.participant.removeListener("trackUnsubscribed", trackUnsubscribed);

      props.participant.removeListener("trackEnabled", trackEnabled);
      props.participant.removeListener("trackDisabled", trackDisabled);
    };
  }, [props.participant]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    console.log(`NUMBER OF AUDIO TRACKS: ${audioTracks.length}`);
    console.log(audioTracks);
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach(audioTrack.current);
        audioTrack.removeAllListeners();
      };
    }
  }, [audioTracks]);

  return <audio ref={audioRef}></audio>;
};
