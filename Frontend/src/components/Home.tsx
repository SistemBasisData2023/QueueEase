import React, { useState } from 'react';
import ReactPlayer from 'react-player';

interface QueueItem {
  loket: string;
}

function Home() {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const addToQueue = (loket: string) => {
    const newQueueItem: QueueItem = {
      loket: loket,
    };
    setQueue((prevQueue) => [...prevQueue, newQueueItem]);
  };

  //create function to fetch queue from {APi_ENDPOINT}/queue/getByTeller

  return (
    <>
      <div className="p-6">
        <div className="mockup-window bg-base-300 p-6">
          <div className="flex flex-col items-center justify-center">
            <ReactPlayer
              className="w-2/3 h-auto"
              url="src/assets/video/home_video.mp4"
              playing
              loop
              muted
              controls={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <QueueBox
            title="Loket 1"
            queue={queue.filter((item) => item.loket === 'Loket 1')}
          />
          <QueueBox
            title="Loket 2"
            queue={queue.filter((item) => item.loket === 'Loket 2')}
          />
          <QueueBox
            title="Loket 3"
            queue={queue.filter((item) => item.loket === 'Loket 3')}
          />
          <QueueBox
            title="Loket 4"
            queue={queue.filter((item) => item.loket === 'Loket 4')}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Queue List</h2>
          <ul>
            {queue.map((item, index) => (
              <li key={index}>{item.loket}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

interface QueueBoxProps {
  title: string;
  queue: QueueItem[];
}

function QueueBox({ title, queue }: QueueBoxProps) {
  return (
    <div className="bg-base-300 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-white">{queue.length}</p>
    </div>
  );
}

export default Home;
