import React, { useEffect, useState } from "react";
import DashoardLayout from "../../components/Layouts/DashoardLayout";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
function Dashboard() {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Error fetching session data", error);
    }
  };
  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error Deleteing Session Data");
    }
  };
  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <DashoardLayout>
      <div className="container mx-auto  pt-4 pb-4 bg-bg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0 ">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              role={data?.role || ""}
              topicsToFoucs={data?.topicsToFoucs || ""}
              experience={data?.experience}
              description={data?.description}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button
          className="h-12 md:h-12 w-fit flex items-center justify-center gap-2
           bg-primary hover:bg-primary-hover 
             text-sm font-semibold text-white px-7 py-2.5
             rounded-lg transition-all duration-300
             hover:shadow-lg cursor-pointer
             fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title={"Delete Alert"}
      >
        <div className="w-[30vw] ">
          <DeleteAlertContent
            content="Are you sure you wnat to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashoardLayout>
  );
}

export default Dashboard;
