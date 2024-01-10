import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { jobTypes } from "../utils/data";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

   const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  console.log(filterJobs);
  return (
    <div>
      <Header
        title="Find Your Dream Job with Ease"
        type="home"
        handleClick={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={location}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]">
        <div className="hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm">
          <p className="text-lg font-semibold text-slate-600">Filter Search</p>

          <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {jobTypes.map((jtype, index) => (
                <div key={index} className="flex gap-2 text-sm md:text-base">
                  <input
                    type="checkbox"
                    value={jtype}
                    className="w-4 h-4"
                    onChange={(e) => filterJobs(e.target.value)}
                  />

                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Pending */}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
