import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { API_ENDPOINT } from '../config/config';

interface QueueItem {
  desk_id: number;
  highest_queue_id: number;
}

function Home() {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/queue/getByTeller`);
        setQueue(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getQueueByDeskId = (deskId: number) => {
    const desk = queue.find((item) => item.desk_id === deskId);
    return desk ? desk.highest_queue_id : 0;
  };

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
          <QueueBox title="Loket 1" queue={getQueueByDeskId(1)} />
          <QueueBox title="Loket 2" queue={getQueueByDeskId(2)} />
          <QueueBox title="Loket 3" queue={getQueueByDeskId(3)} />
          <QueueBox title="Loket 4" queue={getQueueByDeskId(4)} />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Queue List</h2>
          <ul>
            {queue.map((item, index) => (
              <li key={index}>{item.highest_queue_id}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

interface QueueBoxProps {
  title: string;
  queue: number;
}

function QueueBox({ title, queue }: QueueBoxProps) {
  return (
    <div className="bg-base-200 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-500">Queue: {queue}</p>
    </div>
  );
}

export default Home;
