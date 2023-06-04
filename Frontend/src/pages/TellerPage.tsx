import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Queue {
  queue_id: number;
  process_status: string;
  full_name: string;
}

function TellerPage() {
  const [tellerFullName, setTellerFullName] = useState('');
  const [queues, setQueues] = useState<Queue[]>([]);

  useEffect(() => {
    // Get the teller full name from sessionStorage
    const fullName = sessionStorage.getItem('full_name');
    setTellerFullName(fullName || '');

    // Fetch all queues from localhost:5000/queue/getAll
    fetchQueues();
  }, []);

  const fetchQueues = () => {
    axios.get<Queue[]>('http://localhost:5000/queue/getAll')
      .then(response => {
        setQueues(response.data);
      })
      .catch(error => {
        console.error('Error fetching queues:', error);
      });
  };

  const takeQueue = () => {
    // Get the teller ID and desk ID from sessionStorage
    const tellerId = sessionStorage.getItem('account_id');
    const deskId = sessionStorage.getItem('desk_no');

    // Send a PUT request to localhost:5000/queue/take
    axios.put('http://localhost:5000/queue/take', {
      teller_id: tellerId,
      desk_id: deskId
    })
      .then(response => {
        // Handle successful queue take
        console.log('Queue taken successfully:', response.data);
        // go to /transaction
        sessionStorage.setItem('queue_id', response.data.queue_id);
        window.location.href = '/transaction';

      })
      .catch(error => {
        // Handle queue take failure
        console.error('Error taking queue:', error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Daisy UI Page</h1>
      <p>Welcome, {tellerFullName}</p>
      <button
                  className="btn btn-primary ml-2"
                  onClick={() => takeQueue()}
                >
                  Take Queue
                </button>
      <div className="my-4">
        <h2 className="text-lg font-medium mb-2">Queues</h2>
        {queues.length > 0 ? (
          <ul>
            {queues.map(queue => (
              <li key={queue.queue_id} className="mb-2">
                <span className="font-medium">{queue.full_name}</span> - {queue.process_status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No queues available.</p>
        )}
      </div>
    </div>
  );
}

export default TellerPage;
