import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Dna } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const Reservations = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const AxiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    if (user) {
      AxiosSecure.get("/reservations").then((res) => {
        setAppointments(res.data);
        setLoading(false);
      });
    }
  }, [AxiosSecure, user]);

  const handleCancelReservation = useCallback(
    (reservationId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B8FAC",
        cancelButtonColor: "#23232E",
        confirmButtonText: "Yes, cancel it!",
        customClass: "font-montserrat",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await AxiosSecure.delete(`/reservation/${reservationId}`);
          if (res.data.deletedCount > 0) {
            const remainingAppointments = appointments.filter(
              (appointment) => appointment._id !== reservationId
            );
            setAppointments(remainingAppointments);
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Appointment has been canceled`,
              showConfirmButton: false,
              timer: 1500,
              iconColor: "#0B8FAC",
              customClass: "font-montserrat",
            });
          }
        }
      });
    },
    [AxiosSecure, appointments, setAppointments]
  );

  const columns = useMemo(
    () => [
      { Header: "#", accessor: (row, index) => index + 1 },
      { Header: "Test Name", accessor: "testName" },
      { Header: "Patient Name", accessor: "name" },
      { Header: "Patient Email", accessor: "email" },
      {
        Header: "Appointment Date",
        accessor: "appointmentDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={`status-${value.toLowerCase()}`}>{value}</span>
        ),
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <>
            <button
              className="btn btn-sm btn-outline text-xs mx-1 !px-2"
              onClick={() => handleCancelReservation(value)}
            >
              <FaTimes />
            </button>
          </>
        ),
      },
    ],
    [handleCancelReservation]
  );

  const data = useMemo(() => appointments, [appointments]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const { globalFilter } = state;

  return loading ? (
    <div className="dashboard-section">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
      />
    </div>
  ) : (
    <section className="dashboard-section">
      <Helmet>
        <title>MediScan | Reservations</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h4>Reservations</h4>

          <div className="relative mt-8 max-w-[400px] mx-auto">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-msBlue dark:text-msLightBlue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full py-[14px] px-8 border rounded-full text-sm border-msBlue focus:shadow-md focus:outline-none dark:bg-slate-800 dark:border-slate-500 dark:focus:border-msLightblue"
              placeholder="Search by email"
              value={filter || globalFilter}
              onChange={(e) => {
                setFilter(e.target.value);
                setGlobalFilter(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          {rows.length === 0 ? (
            <p className="mt-8 text-center">
              No appointments found for the specified email.
            </p>
          ) : (
            <table
              {...getTableProps()}
              className="w-full table-auto border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700"
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        {...column.getHeaderProps()}
                        className="px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 text-left font-semibold"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={index}
                      {...row.getRowProps()}
                      className={
                        index % 2 === 0 ? "bg-slate-100 dark:bg-slate-900" : ""
                      }
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          {...cell.getCellProps()}
                          className="px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6"
                        >
                          {cell.column.id === "date"
                            ? new Date(cell.value).toLocaleDateString()
                            : cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reservations;
