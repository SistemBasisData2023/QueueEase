function NotFound() {
  return (
    <>
      <div className="grid grid-cols-6 gap-6 min-h-screen bg-cover bg-center bg-gradient-to-tr from-gray-900 to-blue-900">
        <div className="col-span-2 bg-purple-new rounded-md">
          <div className="grid grid-rows-5">
            <div className="row-span-1 p-3">
              <img
                src="src\assets\Logo.svg"
                className="h-8 mr-3"
                alt="QueueEase Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
