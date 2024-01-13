import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard } from "../components";

const JobDetail = () => {
  const params = useParams();
  const id = parseInt(params.id) - 1;
  const [job, setJob] = useState(jobs[0]);
  const [selected, setSelected] = useState("0");

  useEffect(() => {
    setJob(jobs[id ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col md:flex-row gap-10">
        {}
        <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
          <div className="w-full flex items-center justify-between">
            <div className="w-3/4 flex gap-2">
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className="w-200 h-20 md:w-24 md:h-20 rounded"
              />

              <div className="flex flex-col">
                <p className="text-xl font-semibold text-gray-600">
                  {job?.jobTitle}
                </p>

                <span className="text-base">{job?.location}</span>
                <span className="text-base text-blue-600">
                  {job?.company.name}
                </span>

                <span className="text-gray-500 text-sm">
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className="w-1/4">
              <AiOutlineSafetyCertificate className="text-3xl text-blue-500" />
            </div>
          </div>

          <div className="w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10">
            <div className="bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm">Salary</span>
              <p className="text-lg font-semibold text-gray-700">
                {job?.salary}
              </p>
            </div>

            <div className="bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm">Job Type</span>
              <p className="text-lg font-semibold text-gray-700">
                {job?.jobType}
              </p>
            </div>

            <div className="bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm">No. fo Application</span>
              <p className="text-lg font-semibold  text-gray-700">
                {job?.applicants?.length}
              </p>
            </div>

            <div className="bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm">No. of Vacancies</span>
              <p className="text-lg font-semibold text-gray-700">
                {job?.vacancies}
              </p>
            </div>
          </div>
        </div>

        {}
        <div></div>
      </div>
    </div>
  );
};

export default JobDetail;
