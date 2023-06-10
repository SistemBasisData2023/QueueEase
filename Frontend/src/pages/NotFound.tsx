import Navbar from '../components/Global/Navbar';
import ReactPlayer from 'react-player';

function NotFound() {
  return (
    <>
      <Navbar />
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
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full bg-white pt-2">
                <h3 className="flex justify-center items-center text-m font-bold text-black ">
                  A2
                </h3>
              </div>
            </div>
            <div className="chat-bubble text-white">Rafie Amandio Fauzan</div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-6">
            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle 23.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 1
              </h3>
              <p className="text-2xl text-white text-center">A3</p>
            </div>

            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle 24.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 2
              </h3>
              <p className="text-2xl text-white text-center">A3</p>
            </div>
            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle 25.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 3
              </h3>
              <p className="text-2xl text-white text-center">A3</p>
            </div>
            <div
              className="col-span-1 bg-black-new rounded-xl p-6 items-center justify-center"
              style={{
                backgroundImage: "url('src/assets/Rectangle 26.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Loket 4
              </h3>
              <p className="text-2xl text-white text-center">A3</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
