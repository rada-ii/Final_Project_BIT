import "./App1.css";
import Home from "./pages/Home";
import ReportPage from "./pages/ReportPage";
import Admin from "./pages/Admin";
import CreateReport from "./pages/CreateReport";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootHome from "./pages/RootHome";
import RootAdmin from "./pages/RootAdmin";
function App() {
  const [reportStateObj, setReportStateObj] = useState([]);

  const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    {
      path: "/reportpage",
      element: <RootHome />,
      children: [
        { index: true, element: <Home /> },
        { path: "/reportpage/:id", element: <ReportPage /> },
      ],
    },
    {
      path: "/admin/reports",
      element: <RootAdmin />,
      children: [
        { index: true, element: <Admin reportStateObj={reportStateObj} /> },
        {
          path: "/admin/reports/createreport",
          element: <CreateReport onCreateReportObject={setReportStateObj} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
