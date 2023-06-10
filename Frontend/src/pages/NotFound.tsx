import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Global/Loading';
import { API_ENDPOINT } from '../config/config';
import Navbar from '../components/Global/Navbar';

interface DeskStatusResponse {
  deskStatus: Record<string, string>;
}

interface CardProps {
  imageSrc: string;
  deskNo: string;
  handleCheckIn: (deskNo: string) => void;
  isDeskOccupied: (deskNo: string) => boolean;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  deskNo,
  handleCheckIn,
  isDeskOccupied,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    if (!isDisabled) {
      handleCheckIn(deskNo);
    }
  };

  useEffect(() => {
    setIsDisabled(isDeskOccupied(deskNo));
  }, [isDeskOccupied, deskNo]);

  return (
    <div
      className={`relative col-span-1 bg-black-new rounded-xl p-6 items-center justify-center hover:scale-105 transition-transform duration-300 ${
        isDisabled
          ? ' bg-gray-900 opacity-50 cursor-not-allowed'
          : 'cursor-pointer'
      }`}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleClick}
    >
      {isDisabled ? (
        <div className="flex items-center justify-center rounded-xl">
          <div className="p-4 h-full">
            <span className="text-white text-xl">Occupied</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-white text-bold text-2xl">
          Loket {deskNo}
        </div>
      )}
    </div>
  );
};

function NotFound() {
  const [deskStatus, setDeskStatus] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeskStatus();
  }, []);

  const fetchDeskStatus = () => {
    axios
      .get<DeskStatusResponse>(`${API_ENDPOINT}/tellerdesk/checkDeskStatus`)
      .then((response) => {
        console.log(response.data);
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
      <div className="p-4 md:p-10 lg:p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-screen bg-cover bg-center bg-gradient-to-tr from-gray-900 to-blue-900">
        <Card
          imageSrc="src/assets/Rectangle1.png"
          deskNo="1"
          handleCheckIn={handleCheckIn}
          isDeskOccupied={isDeskOccupied}
        />
        <Card
          imageSrc="src/assets/Rectangle2.png"
          deskNo="2"
          handleCheckIn={handleCheckIn}
          isDeskOccupied={isDeskOccupied}
        />
        <Card
          imageSrc="src/assets/Rectangle3.png"
          deskNo="3"
          handleCheckIn={handleCheckIn}
          isDeskOccupied={isDeskOccupied}
        />
        <Card
          imageSrc="src/assets/Rectangle4.png"
          deskNo="4"
          handleCheckIn={handleCheckIn}
          isDeskOccupied={isDeskOccupied}
        />
      </div>
    </>
  );
}

export default NotFound;
