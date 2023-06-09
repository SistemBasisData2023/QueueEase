import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Global/Loading';
import { API_ENDPOINT } from '../config/config';
import Navbar from '../components/Global/Navbar';

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
    axios
      .get<DeskStatusResponse>(`${API_ENDPOINT}/tellerdesk/checkDeskStatus`)
      .then((response) => {
        setDeskStatus(response.data.deskStatus);
        setLoading(false);
      })
      .catch((error) => {
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
        desk_no: Number(deskNo),
      };
      console.log(data);
      axios
        .post(`${API_ENDPOINT}/tellerdesk/checkin`, data)
        .then((response) => {
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
        .catch((error) => {
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
    <>
      <Navbar />
      <div className="flex justify-center ">
        <div className="flex flex-row space-x-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Loket 1</h2>
              <div className="card-actions">
                <button
                  className={`btn btn-primary ${
                    isDeskOccupied('1') ? 'btn-disabled' : ''
                  }`}
                  disabled={isDeskOccupied('1')}
                  onClick={() => handleCheckIn('1')}
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Loket 2</h2>
              <div className="card-actions">
                <button
                  className={`btn btn-primary ${
                    isDeskOccupied('2') ? 'btn-disabled' : ''
                  }`}
                  disabled={isDeskOccupied('2')}
                  onClick={() => handleCheckIn('2')}
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Loket 3</h2>
              <div className="card-actions">
                <button
                  className={`btn btn-primary ${
                    isDeskOccupied('3') ? 'btn-disabled' : ''
                  }`}
                  disabled={isDeskOccupied('3')}
                  onClick={() => handleCheckIn('3')}
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>

          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Loket 4</h2>
              <div className="card-actions">
                <button
                  className={`btn btn-primary ${
                    isDeskOccupied('4') ? 'btn-disabled' : ''
                  }`}
                  disabled={isDeskOccupied('4')}
                  onClick={() => handleCheckIn('4')}
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeskChoosePage;
