import { createElement } from "react";
import Webcam from "react-webcam";
import "./ui/TbnReactCamera.css";

export function TbnReactCamera({ IsAudio, width, height, facingMode, screenshootquality, based64, onScreenShoot }) {
    if (
        IsAudio.status === "available" &&
        width.status === "available" &&
        height.status === "available" &&
        facingMode.status === "available" &&
        screenshootquality.status === "available" &&
        based64.status === "available"
    ) {
        const videoConstraints = {
            width: width.value,
            height: height.value,
            facingMode: facingMode.value
        };

        return (
            <div class="container">
                <div class="row">
                    <Webcam
                        audio={IsAudio.value}
                        screenshotFormat="image/jpeg"
                        screenshotQuality={screenshootquality.value}
                        videoConstraints={videoConstraints}
                    >
                        {({ getScreenshot }) => (
                            <button
                                onClick={() => {
                                    const imageSrc = getScreenshot();
                                    based64.setValue(imageSrc);
                                    if (onScreenShoot.canExecute && !onScreenShoot.isExecuting && onScreenShoot) {
                                        onScreenShoot.execute();
                                    }
                                }}
                            >
                                Capture photo
                            </button>
                        )}
                    </Webcam>
                </div>
            </div>
        );
    } else {
        return null;
    }
}
