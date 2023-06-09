import ReactPlayer from 'react-player';

function Home() {
  return (
    <>
      <div className="p-6">
        <div className="mockup-window bg-base-300 p-6">
          <div className="flex flex-col items-center justify-center">
            <ReactPlayer
              className="w-2/3 h-auto"
              url="src\assets\video\home_video.mp4"
              playing
              loop
              muted
              controls={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
