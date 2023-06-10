import Navbar from '../components/Global/Navbar';

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="p-20 grid grid-cols-4 gap-6 min-h-screen bg-cover bg-center bg-gradient-to-tr from-gray-900 to-blue-900">
        <div className="col-span-1 bg-black"></div>
        <div className="col-span-1 bg-black"></div>
        <div className="col-span-1 bg-black"></div>
        <div className="col-span-1 bg-black"></div>
      </div>
    </>
  );
}

export default NotFound;
