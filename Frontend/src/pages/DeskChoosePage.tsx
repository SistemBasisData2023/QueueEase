import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Global/Loading';
import { API_ENDPOINT } from '../config/config';

interface DeskStatusResponse {
  deskStatus: Record<string, string>;
}

function DeskChoosePage() {
  const [deskStatus, setDeskStatus] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeskStatus();
  }, []);

  const fetchDeskStatus = () => {
    axios.get<DeskStatusResponse>(`${API_ENDPOINT}/tellerdesk/checkDeskStatus`)
      .then(response => {
        setDeskStatus(response.data.deskStatus);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching desk status:', error);
        setLoading(false);
      });
  };

  const isDeskOccupied = (deskNo: string): boolean => {
    return deskStatus[deskNo] === 'ATTENDING';
  };

  const handleCheckIn = (deskNo: string) => {
    const tellerId = sessionStorage.getItem('account_id');
    if (tellerId) {
      const data = {
        teller_id: tellerId,
        desk_no: Number(deskNo)
      };
      console.log(data);
      axios.post(`${API_ENDPOINT}/tellerdesk/checkin`, data)
        .then(response => {
          // Check if check-in was successful
          console.log(response.data);
          if (response.data.success) {
            sessionStorage.setItem('desk_no', deskNo);
            window.location.href = '/teller';
          } else {
            // Handle failed check-in
            console.error('Check-in failed');
          }

        })
        .catch(error => {
          console.error('Error during check-in:', error);
        });
    } else {
      console.error('Account ID not found in local storage');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
              <button
              className={`btn btn-primary ${isDeskOccupied('1') ? 'btn-disabled' : ''}`}
              disabled={isDeskOccupied('1')}
              onClick={() => handleCheckIn('1')}
            >
              1
            </button>
          </div>
        </div>
      </div>
        
        <button
          className={`btn btn-primary ${isDeskOccupied('2') ? 'btn-disabled' : ''}`}
          disabled={isDeskOccupied('2')}
          onClick={() => handleCheckIn('2')}
        >
          2
        </button>
        <button
          className={`btn btn-primary ${isDeskOccupied('3') ? 'btn-disabled' : ''}`}
          disabled={isDeskOccupied('3')}
          onClick={() => handleCheckIn('3')}
        >
          3
        </button>
        <button
          className={`btn btn-primary ${isDeskOccupied('4') ? 'btn-disabled' : ''}`}
          disabled={isDeskOccupied('4')}
          onClick={() => handleCheckIn('4')}
        >
          4
        </button>
      </div>
    </div>
  );
}

export default DeskChoosePage;
