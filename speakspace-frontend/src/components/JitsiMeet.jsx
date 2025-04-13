import React, { useEffect } from "react";

const JitsiMeet = ({ roomName }) => {
  useEffect(() => {
    const loadJitsiScript = () => {
      if (document.getElementById("jitsi-script")) return;

      const script = document.createElement("script");
      script.id = "jitsi-script";
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    };

    const initializeJitsi = () => {
      if (!window.JitsiMeetExternalAPI) return;

      const domain = "meet.jit.si";
      const options = {
        roomName: roomName || "JitsiReactRoomDemo123",
        width: "100%",
        height: 600,
        parentNode: document.getElementById("jitsi-container"),
        configOverwrite: { startWithAudioMuted: true },
        interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false },
      };

      new window.JitsiMeetExternalAPI(domain, options);
    };

    loadJitsiScript();

    return () => {
      // Cleanup iframe if component is unmounted
      const container = document.getElementById("jitsi-container");
      if (container) container.innerHTML = "";
    };
  }, [roomName]);

  return (
    <div id="jitsi-container" style={{ height: "600px", width: "100%" }} />
  );
};

export default JitsiMeet;
