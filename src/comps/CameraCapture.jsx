import React, { useEffect, useState, useCallback, useRef } from "react";
import Webcam from "react-webcam";

function CameraCapture() {
  const webcamRef = useRef(null); // create a webcam reference
  const [imgSrc, setImgSrc] = useState(null); // initialize it

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);
  const retake = () => {
    setImgSrc(null);
  };
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;
