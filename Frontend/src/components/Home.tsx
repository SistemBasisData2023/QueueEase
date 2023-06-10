import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { API_ENDPOINT } from '../config/config';
import { io } from 'socket.io-client';

const socket = io(API_ENDPOINT);

interface QueueItem {
  desk_id: number;
  highest_queue_id: number;
}

interface WaitingQueueItem {
  queue_id: number;
  full_name: string;
}

function Home() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [waitingQueue, setWaitingQueue] = useState<WaitingQueueItem[]>([]);

  useEffect(() => {
    socket.on('queueUpdated', () => {
      console.log('queueUpdated');
      fetchData();
    });
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/queue/getByTeller`);
        setQueue(response.data);

        const response2 = await axios.get(
          `${API_ENDPOINT}/queue/getWaitingQueue`
        );
        console.log(response2.data);

        setWaitingQueue(response2.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getQueueByDeskId = (deskId: number) => {
    const desk = queue.find((item) => item.desk_id === deskId);
    return desk ? desk.highest_queue_id : 0;
  };

  const getWaitingQueueName = (id: number) => {
    const item = waitingQueue.find((item) => item.queue_id === id);
    return item ? item.full_name : '';
  };

  return (
    <>
      <div className="p-20 grid grid-cols-3 gap-6 min-h-screen bg-cover bg-center bg-gradient-to-tr from-gray-900 to-blue-900">
        <div className="col-span-2 ">
          <video
            src={'src/assets/video/home_video_2.mp4'}
            className="w-full h-full object-cover rounded-m"
            autoPlay
            muted
            loop
          />
        </div>

        <div className="col-span-1 bg-black-new rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Antrian</h3>
          {waitingQueue.map((item) => (
            <div key={item.queue_id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-white pt-2">
                  <h3 className="flex justify-center items-center text-m font-bold text-black ">
                    A{item.queue_id}
                  </h3>
                </div>
              </div>
              <div className="chat-bubble text-white" key={item.queue_id}>
                {item.full_name}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-6">
            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle1.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 1
              </h3>
              <p className="text-2xl text-white text-center">
                A{getQueueByDeskId(1)}
              </p>
            </div>

            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle2.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 2
              </h3>
              <p className="text-2xl text-white text-center">
                A{getQueueByDeskId(2)}
              </p>
            </div>
            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 3
              </h3>
              <p className="text-2xl text-white text-center">
                A{getQueueByDeskId(3)}
              </p>
            </div>
            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle4.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 4
              </h3>
              <p className="text-2xl text-white text-center">
                A{getQueueByDeskId(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
