import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Dna } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const AxiosSecure = useAxiosSecure();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    if (user) {
      AxiosSecure.get(`/reservations?email=${user.email}`).then((res) => {
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
      { Header: "Transaction ID", accessor: "transactionId" },
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useGlobalFilter);

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
        <title>MediScan | Upcoming Appointments</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h4>Upcoming Appointments</h4>
        </div>

        <div className="mt-8 overflow-x-auto">
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
        </div>
      </div>
    </section>
  );
};

export default UpcomingAppointments;
