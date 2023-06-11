import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../config/config';

interface TellerInfo {
  teller_id: string;
  nama: string;
  email: string;
  total_duration: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
}

function NotFound() {
  const [tellerInfo, setTellerInfo] = useState<TellerInfo[]>([]);

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const handleReset = () => {
    axios
      .get(`${API_ENDPOINT}/queue/reset`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchTellerInfo = async () => {
      try {
        const response = await axios.get<TellerInfo[]>(
          `${API_ENDPOINT}/tellerdesk/getTellerInfo`
        );
        console.log(response.data);
        setTellerInfo(response.data);
      } catch (error) {
        console.error('Error fetching teller info:', error);
      }
    };

    fetchTellerInfo();
  }, []);

  const getTotalDuration = (durasi: TellerInfo['total_duration']): string => {
    if (durasi) {
      const { days, hours, minutes } = durasi;
      return `${days} days ${hours} hours ${minutes} minutes`;
    }
    return '';
  };

  return (
    <>
      <div className="flex">
        <div className="sticky top-0 h-screen w-64 bg-purple-new ">
          <div className="grid grid-rows-8  h-screen">
            <a className="row-start-1 row-span-1 mt-5 gap-4">
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
                  className="btn btn-outline btn-block"
                  onClick={() => (window.location.href = '/register')}
                >
                  <img
                    src="src\assets\icon-park-solid_add.png"
                    className="h-6 mr-2"
                    alt="Icon"
                    style={{ alignSelf: 'center' }}
                  />
                  <span>Add Account</span>
                </button>
              </div>
              <div className="row-span-1 flex justify-center items-center px-5 mt-5">
                <button
                  className="btn btn-outline btn-error btn-block"
                  onClick={() => handleReset()}
                >
                  <img
                    src="src\assets\bar-line-chart.png"
                    className="h-6 mr-2"
                    alt="Icon"
                    style={{ alignSelf: 'center' }}
                  />
                  <span>Reset</span>
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
            <div className="col-span-3 h-screen">
              <h1 className="text-3xl font-bold">Teller List</h1>
              <div className="mt-7 flex">
                <div className="overflow-x-auto max-h-screen">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Teller Id</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Total Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tellerInfo.map((info, index) => (
                        <tr key={info.teller_id}>
                          <td>{index + 1}</td>
                          <td>{info.teller_id}</td>
                          <td>{info.email}</td>
                          <td>{info.nama}</td>
                          <td>{getTotalDuration(info.total_duration)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
