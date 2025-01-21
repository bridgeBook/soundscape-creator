import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import birds from './sound/birds.mp3';
import rain from './sound/rain.mp3';

const MixPlayer = () => {
  // 音のファイルパスを配列で指定
  const audioFiles = [
    birds, rain
  ];

  // Tone.Playerにより音声を管理
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 音量管理用の状態（初期は0 dB）
  const [volumes, setVolumes] = useState(audioFiles.map(() => 0));

  // 音声の事前ロード
  useEffect(() => {
    const loadAudioFiles = async () => {
      const loadedPlayers = await Promise.all(
        audioFiles.map((file) => {
          const player = new Tone.Player(file).toDestination();
          return player;
        })
      );
      setPlayers(loadedPlayers);
      setIsLoading(false);
    };

    loadAudioFiles();
  }, []);

  // 音量変更の処理
  const handleVolumeChange = (index, newVolume) => {
    const updatedVolumes = [...volumes];
    updatedVolumes[index] = newVolume;
    setVolumes(updatedVolumes);

    // Tone.Playerのvolumeを更新
    players[index].volume.value = newVolume;
  };

  // 再生ボタンがクリックされた時の処理
  const handlePlay = () => {
    players.forEach(player => player.start());
  };

  // 停止ボタンがクリックされた時の処理
  const handleStop = () => {
    players.forEach(player => player.stop());
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={handlePlay}>Play</button>
          <button onClick={handleStop}>Stop</button>
          {/* 各音のボリュームスライダー */}
          {audioFiles.map((file, index) => (
            <div key={index}>
              <label>{`Volume for ${file}:`}</label>
              <input
                type="range"
                min="-60"
                max="0"
                step="1"
                value={volumes[index]}
                onChange={(e) => handleVolumeChange(index, e.target.value)}
              />
              <span>{volumes[index]} dB</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MixPlayer;
