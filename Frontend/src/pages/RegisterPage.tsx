import Navbar from '../components/Global/Navbar';

function RegisterPage() {
  return (
    <>
      <Navbar />
      <div className="card w-96 bg-base-0 shadow-xl mx-auto image-full">
        <figure>
          <img
            src="https://cdn.discordapp.com/attachments/133884319511871488/1113978752901337088/image.png"
            alt="Register"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Create New Account</h2>
          <div className="form-control grid gap-2 grid-cols-2">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label"></label>
            </div>
            <div className="dropdown dropdown-bottom">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select className="select input-bordered w-full max-w-xs join-item">
                <option disabled selected>
                  Select Role
                </option>
                <option>Admin</option>
                <option>Teller</option>
                <option>Frontdesk</option>
              </select>
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label"></label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label"></label>
          </div>
          <div className="card-actions">
            <button className="btn btn-block btn-primary">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
