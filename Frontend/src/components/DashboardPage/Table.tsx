import React from 'react';

function Table() {
  return (
    <div className="fixed bottom-0 left-1/3 transform -translate-x-1/3 z-10 p-0">
      <div className="overflow-x-auto">
        <table className="table table-compact">
          <thead>
            <tr>
              <th></th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-base-200">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>
                <select className="form-select">
                  <option value="in-queue" className="bg-red-500 text-white">
                    In Queue
                  </option>
                  <option value="processing" className="bg-blue-500 text-white">
                    Processing
                  </option>
                  <option value="finished" className="bg-green-500 text-white">
                    Finished
                  </option>
                </select>
              </td>
              <td>Tarik Tunai</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>
                <select className="form-select">
                  <option value="in-queue" className="bg-red-500 text-white">
                    In Queue
                  </option>
                  <option value="processing" className="bg-blue-500 text-white">
                    Processing
                  </option>
                  <option value="finished" className="bg-green-500 text-white">
                    Finished
                  </option>
                </select>
              </td>
              <td>Transfer</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>
                <select className="form-select">
                  <option value="in-queue" className="bg-red-500 text-white">
                    In Queue
                  </option>
                  <option value="processing" className="bg-blue-500 text-white">
                    Processing
                  </option>
                  <option value="finished" className="bg-green-500 text-white">
                    Finished
                  </option>
                </select>
              </td>
              <td>Deposit</td>
            </tr>
          </tbody>
        </table>
      </div>
      <style>
        {`
        select.form-select option:checked {
          background-color: inherit;
          color: inherit;
        }
        `}
      </style>
    </div>
  );
}

export default Table;
