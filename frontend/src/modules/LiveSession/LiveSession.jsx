import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import styles from './LiveSession.module.css'; // Import the CSS module
import SideBar from '../Dashboard/TeacherDashboard/components/sideBarT/sideBarT'; // Import the Sidebar component
// Adjust the URL as needed

const LiveSession = () => {
    const [isLive, setIsLive] = useState(false);
    const webcamRef = useRef(null);

    const startSession = () => {
        setIsLive(true);
    };

    const endSession = () => {
        setIsLive(false);
    };

    return (
        <div className={styles.container}>
            <SideBar /> {/* Include the Sidebar */}
            <div className={styles.content}>
                <h1 className={styles.title}>Live Session</h1>
                {isLive ? (
                    <div>
                        <h2 className={styles.subtitle}>Session is Live</h2>
                        <Webcam
                            audio={true}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: 'user',
                            }}
                            className={styles.webcam}
                        />
                        <button className={`${styles.button} ${styles.endButton}`} onClick={endSession}>End Session</button>
                    </div>
                ) : (
                    <div>
                        <h2 className={styles.subtitle}>No Active Session</h2>
                        <button className={`${styles.button} ${styles.startButton}`} onClick={startSession}>Start Session</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveSession;