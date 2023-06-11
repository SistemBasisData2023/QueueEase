import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { API_ENDPOINT } from '../config/config';
import { io } from 'socket.io-client';
import { handlePlaySound } from '../utils/audioUtils';

const socket = io(API_ENDPOINT);

interface WaitingQueueItem {
  queue_id: number;
  full_name: string;
}

function TellerPage() {
  const [waitingQueue, setWaitingQueue] = useState<WaitingQueueItem[]>([]);

  useEffect(() => {
    socket.on('queueUpdated', () => {
      console.log('queueUpdated');
      fetchData();
    });

    socket.on('take', (desk_id, queueIdToUpdate) => {
      const int_desk = parseInt(desk_id);
      console.log('take', desk_id);
      console.log('take', queueIdToUpdate);
      handlePlaySound(queueIdToUpdate, int_desk);
      fetchData();
    });

    const fetchData = async () => {
      try {
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

  const takeQueue = () => {
    // Get the teller ID and desk ID from sessionStorage
    const tellerId = sessionStorage.getItem('account_id');
    const deskId = sessionStorage.getItem('desk_no');

    // Send a PUT request to ENDPOINT/queue/take
    axios
      .put(`${API_ENDPOINT}/queue/take`, {
        teller_id: tellerId,
        desk_id: deskId,
      })
      .then((response) => {
        // Handle successful queue take
        console.log('Queue taken successfully:', response.data);
        // go to /transaction
        sessionStorage.setItem('queue_id', response.data.queue_id);
        window.location.href = '/transaction';
      })
      .catch((error) => {
        // Handle queue take failure
        console.error('Error taking queue:', error);
      });
  };

  // create logout function
  const logout = () => {
    // remove all sessionStorage
    const desk_no = sessionStorage.getItem('desk_no');
    const teller_id = sessionStorage.getItem('account_id');
    const data = { desk_no, teller_id };

    axios
      .put(`${API_ENDPOINT}/tellerdesk/checkout`, data)
      .then((response) => {
        // Handle successful queue take
        console.log('Queue taken successfully:', response.data);
        sessionStorage.clear();

        // go to /login
        window.location.href = '/login';
      })
      .catch((error) => {
        // Handle queue take failure
        console.error('Error checking out', error);
      });
  };
  return (
    <>
      <div className="flex">
        <div className="sticky top-0 h-screen w-64 bg-purple-new ">
          <div className="grid grid-rows-8  h-screen">
            <a className="row-start-1 row-span-1 mt-5">
              <div className="flex justify-center items-center">
                <img
                  src="src\assets\Logo.svg"
                  className="h-8 mr-3"
                  alt="QueueEase Logo"
                />
              </div>
            </a>
            <div className="row-span-1">
              <div className="flex justify-center items-center px-5">
                <button
                  className="btn-outline btn-block "
                  onClick={() => takeQueue()}
                >
                  Take Queue
                </button>
              </div>
            </div>

            <div className="row-span-3"></div>
            <div className="row-span-1 row-end-auto">
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <img
                    src="src\assets\Profile.png"
                    className="h-16 w-16 mr-4 mb-5"
                    alt="Profile"
                    style={{ alignSelf: 'center', marginBottom: '5px' }}
                  />
                  <div>
                    {sessionStorage.getItem('full_name')}
                    <br />
                    <span
                      className=" badge badge-outline hover:badge-error badge-sm p-3"
                      onClick={() => logout()}
                    >
                      Log Out
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-base-300">
          <div className="p-10 grid grid-cols-3 grid-flow-row gap-6">
            <div className="col-span-2 h-screen">
              <h1 className="text-3xl font-bold">Queue</h1>
              <div className="mt-7 flex">
                <div className="overflow-x-auto max-h-screen ">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>No Antrian</th>
                        <th>Full Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitingQueue.map((item, index) => (
                        <tr key={item.queue_id} className="hover">
                          <th>{index + 1}</th>
                          <td>A{item.queue_id}</td>
                          <td>
                            {item.full_name}
                            <br />
                            <span className="badge badge-ghost badge-sm">
                              Teller Customer
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-accent">
                              {' '}
                              In_Queue
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-span-1 h-screen">
              <h1 className="text-3xl font-bold">
                Desk {sessionStorage.getItem('desk_no')}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TellerPage;
