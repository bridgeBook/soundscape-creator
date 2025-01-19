import './App.css';
import React, { useState } from "react";
import * as Tone from "tone";

const SoundPlayer = () => {
    // 状態を管理（音量と現在再生中のAudioインスタンス）
    const [volume, setVolume] = useState(0.5); // デフォルト音量（0.5 = 50%）
    const [audio, setAudio] = useState(null);

    // 音声を再生する関数
    const playSound = (sound) => {
        if (audio) {
            // すでに再生中の音があれば停止
            audio.pause();
        }
        const newAudio = new Audio(sound);
        newAudio.volume = volume; // スライダーで設定された音量を適用
        newAudio.play();
        setAudio(newAudio); // 現在のAudioインスタンスを保存
    };

    // 音量を調整する関数
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume); // 状態を更新
        if (audio) {
            audio.volume = newVolume; // 再生中の音声にも反映
        }
    };

    return (
        <>
            <div className="soundPlayer">
                <div>
                    <button onClick={() => playSound("/sound/rain.mp3")}>Rain</button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <label style={{ marginleft: "20px" }}>
                        Volume: {Math.round(volume * 100)}%
                    </label>
                    <input style={{ marginleft: "20px" }}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
                <div>
                    <button onClick={() => playSound("/sound/birds.mp3")}>Rain</button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <label style={{ marginleft: "20px" }}>
                        Volume: {Math.round(volume * 100)}%
                    </label>
                    <input style={{ marginleft: "20px" }}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
        </>
    );
};

export default SoundPlayer;