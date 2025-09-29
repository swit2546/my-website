import React, { useState, useEffect, useRef } from "react";

const alarmAudio = "/Goofy Ahh Sounds.mp3";

const MeditateTypes = [
  { name: 'นั่งสมาธิ', time: 30, description: 'สมาธิสั้นสำหรับผู้เริ่มต้น' },
  { name: 'นั่งสมาธิระดับโปร', time: 2400, description: 'มีสมาธิในการทำสิ่งต่างๆได้โดยดี' },
  { name: 'เข้าสู่สถานะฌาน', time: 12000, description: 'บรรลุขนาดที่สามารถถอดจิตได้' },
  { name: 'ทำสมาธิระดับcosmic', time: 7777777777, description: 'นั่งขนาดนี้มึงจะไปเฝ้าพระอินทร์หรอ' },
];

export default function Meditate() {

  const [selectedMeditate, setSelectedMeditate] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const handleStart = (Meditate) => {
    setSelectedMeditate(Meditate);
    setTimeLeft(Meditate.time);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMeditate ? selectedMeditate.time : 0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
      <div className="min-h-screen w-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 w-full max-w-2xl">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            เครื่องจับเวลาทำสมาธิ
          </h1>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            จิตเป็นนาย กายเป็นบ่าว
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* พื้นที่ทำสมาธิ */}
            {MeditateTypes.map((Meditate) => (
              <button
                key={Meditate.name}
                onClick={() => handleStart(Meditate)}
                disabled={isRunning}
                className={`p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95
                  ${
                    selectedMeditate?.name === Meditate.name
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <h2 className="font-bold text-lg mb-1">{Meditate.name}</h2>
                <p className="text-sm">{Meditate.description}</p>
              </button>
            ))}
          </div>

          {selectedMeditate && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-700">
                คุณกำลังฝึก: {selectedMeditate.name}
              </h3>
              <p className="text-gray-500 mb-4">{selectedMeditate.description}</p>
              <div className="my-8">
                <span className="text-7xl font-mono text-gray-900 font-bold">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div className="flex justify-center space-x-4">
                {isRunning ? (
                  <button
                    onClick={handleStop}
                    className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    หยุดนั่ง
                  </button>
                ) : (
                  <button
                    onClick={() => handleStart(selectedMeditate)}
                    className="bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
                  >
                    เริ่มนั่ง
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
                >
                  เอาใหม่ สมาธิเริ่มใหม่ได้เสมอ
                </button>
              </div>
            </div>
          )}

          <audio ref={audioRef} src={alarmAudio} preload="auto" />
        </div>
      </div>
  );
}