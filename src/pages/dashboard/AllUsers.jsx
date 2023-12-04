import { useState, useEffect, useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { Dna } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { FaEye, FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

Modal.setAppElement("#root");

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    AxiosSecure.get("/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, [AxiosSecure]);

  const columns = useMemo(
    () => [
      { Header: "#", accessor: (row, index) => index + 1 },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <>
            <button
              onClick={() => {
                handleUserInfo(value);
              }}
              className="btn btn-sm btn-outline text-xs mx-1 !px-2"
            >
              <FaEye />
            </button>
          </>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => users, [users]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useGlobalFilter);

  const handleUserInfo = async (id) => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get(`/user/${id}`);
      setSelectedUser(res.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 10,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      width: "100%",
      padding: "3rem",
      borderRadius: "0.5rem",
      background: "white",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      fontFamily: "'Montserrat', sans-serif",
    },
    closeBtn: {
      position: "absolute",
      top: "0",
      right: "10px",
      cursor: "pointer",
      fontSize: "1.5rem",
      color: "gray",
    },
  };

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
        <title>MediScan | All Users</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h4>All Users</h4>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Info Modal"
        style={modalStyles}
      >
        <button onClick={closeModal} style={modalStyles.closeBtn}>
          &times;
        </button>
        <h6 className="text-center underline">User Info</h6>

        <div className="mt-4 mx-auto text-center">
          <img
            src={selectedUser.avatar}
            alt=""
            className="w-20 h-20 object-cover rounded-full my-4 mx-auto"
          />
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Blood Group: {selectedUser.bloodGroup}</p>
          <p>
            Address: {selectedUser.upazilla}, {selectedUser.district}
          </p>
          <p></p>
        </div>
      </Modal>
    </section>
  );
};

export default AllUsers;
