import { useState, useEffect, useMemo, useCallback } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    AxiosSecure.get("/tests").then((res) => {
      setTests(res.data);
      setLoading(false);
    });
  }, [AxiosSecure]);

  const handleDeleteTest = useCallback(
    (testId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0B8FAC",
        cancelButtonColor: "#23232E",
        confirmButtonText: "Yes, delete it!",
        customClass: "font-montserrat",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await AxiosSecure.delete(`/test/${testId}`);

          const remainingTests = tests.filter((test) => test._id !== testId);
          setTests(remainingTests);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Test has been deleted`,
              showConfirmButton: false,
              timer: 1500,
              iconColor: "#0B8FAC",
              customClass: "font-montserrat",
            });
          }
        }
      });
    },
    [AxiosSecure, tests, setTests]
  );

  const columns = useMemo(
    () => [
      { Header: "#", accessor: (row, index) => index + 1 },
      { Header: "Name", accessor: "name" },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => `$${value}`,
      },
      { Header: "Date", accessor: "date" },
      { Header: "Slots", accessor: "slots" },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <>
            <Link to={`/reservations/${value}`}>
              <button className="btn btn-sm btn-outline text-xs mx-1 !px-2">
                <FaEye />
              </button>
            </Link>
            <Link to={`/update-test/${value}`}>
              <button className="btn btn-sm btn-outline text-xs mx-1 !px-2">
                <FaEdit />
              </button>
            </Link>
            <button
              className="btn btn-sm btn-outline text-xs mx-1 !px-2"
              onClick={() => handleDeleteTest(value)}
            >
              <FaTrash />
            </button>
          </>
        ),
      },
    ],
    [handleDeleteTest]
  );

  const data = useMemo(() => tests, [tests]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //state,
    //setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  //const { globalFilter } = state;

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
        <title>MediScan | All Tests</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h4>All Tests</h4>
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
      <Link to="/dashboard/add-a-test">
        <button className="btn my-8 mx-auto flex justify-center">
          Add A Test
        </button>
      </Link>
    </section>
  );
};

export default AllTests;
