import style from "../../styles/pages/dashboard.module.scss";
import DashboardLogs from "../dashboard/DashboardLogs";
import PageDetails from "../ui/PageDetails";

const Dashboard = () => {
  return (
    <div className={style.container}>
      {/* Dashboard logs */}
      <div className={style["dashboard-logs-container"]}>
        <PageDetails
          title="Performance Overview"
          about="Real-time insights for today's theater operations and bookings."
          backButton={false}
        />
        <DashboardLogs />
      </div>
    </div>
  );
};

export default Dashboard;
