import React from "react";
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { useState } from "react";

function NewPost({ image }) {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);
  const imgRef = useRef();
  const canvasRef = useRef();
  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.linewidth = 5;
    ctx.strokeStyle = "yellow";
    faces.map((face) => ctx.strokeRect(...face));
  };

  const addFriends = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(friends);

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections.map((d) => Object.values(d.box)));
    // console.log(detections);
    // .withFaceLandmarks().withFaceExpressions();

    // canvasRef.current.innerHtml= faceapi.createCanvasFromMedia(imgRef.current);

    // faceapi.matchDimensions(canvasRef.current,{
    //   width:940,
    //   height:650,
    // })
    // const resized = faceapi.resizeResults(detections,{
    //   width:940,
    //   height:650,
    //  })
    // faceapi.draw.drawDetections(canvasRef.current,resized);
    // faceapi.draw.drawFaceExpressions(canvasRef.current,resized);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current,resized);
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        // faceapi.nets.faceRecognitionNet.loadFromuri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    imgRef.current && loadModels();
  }, []);
  return (
    <div className="container">
      <div className="left" style={{ width, height }}>
        <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
        <canvas
          onMouseEnter={enter}
          ref={canvasRef}
          width={width}
          height={height}
        />
        {faces.map((face, i) => (
          <input
            name={`input${i}`}
            style={{ left: face[0], top: face[1] + face[3] + 5 }}
            placeholder="Tag a friend"
            key={i}
            className="friendInput"
            onChange={addFriends}
          />
        ))}
        ;
      </div>
      <div className="right">
        <h1>Share your Post</h1>
        <input
          type="text"
          placeholder="Whats on your mind?"
          className="rightInput"
        />
        {friends && (
          <span className="friends">
            with
            <span className="name"> {Object.values(friends) + " "}</span>
          </span>
        )}
        <button className="rightButton">Send</button>
      </div>
    </div>
  );
}

export default NewPost;
