import { useState, useEffect } from "react";
import { Dna } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../hooks/useAxiosPublic";
import TestCard from "../components/TestCard";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    setLoading(true);
    AxiosPublic.get("/tests").then((res) => {
      setTests(res.data);
      setLoading(false);
    });
  }, [AxiosPublic]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleResetDate = () => {
    setSelectedDate(null);
    setCurrentPage(1);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredTests = tests.filter((test) => {
    if (selectedDate) {
      const testDate = new Date(test.date).toISOString().split("T")[0];
      return testDate === selectedDate.toISOString().split("T")[0];
    } else {
      return new Date(test.date) >= new Date(currentDate);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage);

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-xs btn-outline"
          >
            <FaChevronLeft />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`btn btn-xs ${
                number === currentPage ? "btn-primary" : "btn-outline"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-xs btn-outline"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span>Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
            className="btn btn-xs btn-outline"
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
          <span>Items per page</span>
        </div>
      </div>
    );
  };

  return (
    <section>
      <Helmet>
        <title>MediScan | All Tests</title>
      </Helmet>
      <div className="mx-auto">
        <div className="text-center">
          <h3>All Tests</h3>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Filter by date"
            className="mt-8 w-full py-3 px-4 border border-msLightBlue rounded-full text-sm focus:border-msBlue focus:outline-none dark:bg-slate-800 dark:border-slate-700 dark:focus:border-msBlue"
          />
          {selectedDate && (
            <button
              onClick={handleResetDate}
              className="ml-2 btn btn-sm btn-outline"
            >
              Reset Date
            </button>
          )}
        </div>
        {loading ? (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper mx-auto min-h-[400px] md:min-h-[500px] flex items-center justify-center"
          />
        ) : (
          <div className="mt-12">
            {currentTests.length === 0 ? (
              <div className="mt-16 flex flex-col items-center gap-2">
                <p>No tests available for the selected date.</p>
                {selectedDate && (
                  <p>
                    <button
                      onClick={handleResetDate}
                      className="btn btn-sm btn-outline"
                    >
                      Show All Tests
                    </button>
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentTests.map((test) => (
                    <TestCard key={test._id} test={test} />
                  ))}
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tests;
