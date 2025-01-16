import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default DashboardLayout;
