import React, { useContext } from "react";
import { NavbarContext } from "../App";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ProtectedRoute from "../components/helpers/ProtectRoute";
import Profile from "../views/profile";
import PricingPage from "../views/pricing";
import CleanupCalculator from "../views/cleanupCalculator/index";
import GcQualify from "../views/planify/GcQualify";
import ProjectBoardList from "../views/projectBoardList/ProjectBoardList";
import { ProjectTable } from "../views/projectTable";
import { ProjectBoard } from "../views/projectBoard/ProjectBoard";
import { ProjectOverview } from "../views/projectsOverview/index";
import Home from "../views/home";
import DocumentGenerator from "../views/proposal/documentGenerator";
import Proposal from "../views/proposal";
import ProposalTemplate from "../views/proposal/proposalTemplate";
import Planify from "../views/planify";
import PlanRoom from "../views/planify/planroom";
import ProjectFavorite from "../views/projects/favorite";
import ProjectRecent from "../views/projects/viewed";
import ProjectArchive from "../views/projects/archived";
import Calculator from "../views/cleanupCalculator/calculator_index";
import CleanupRates from "../views/cleanupCalculator/cleanup_rates";
import CompanyDetailsForms from "../views/prequelMasterKey/CompanyDetailsForms";
import PDF from "../views/capabilityStatement/index";
import PDFVersion_A from "../views/capabilityStatement/Versions/PDFVersion_A";
import PDFVersion_B from "../views/capabilityStatement/Versions/PDFVersion_B";
import ProjectBoardV2 from "../views/mapV2";

const AuthRoutes = () => {
  const { showLargeScreenNav } = useContext(NavbarContext);
  return (
    <>
      <Navbar />
      <div
      // className={classNames(
      //   "page-container",
      //   showLargeScreenNav ? "move-page" : "unmove-page"
      // )}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/my_proposal" element={<DocumentGenerator />} />
          <Route path="my_proposal/edit/:id" element={<DocumentGenerator />} />
          <Route
            path="/cleanup_calculator_overview"
            element={<Calculator />}
          ></Route>
          <Route path="/cleanup_calculator" element={<CleanupCalculator />} />
          <Route path="/cleanup_rates" element={<CleanupRates />} />
          <Route path="/pre_qualify" element={<GcQualify />} />
          <Route path="/planify" element={<Planify />} />
          <Route
            path="/cleanup_calculator/edit/:id"
            element={<CleanupCalculator />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/project_board" element={<ProjectBoardList />} />
          <Route path="/project_research" element={<ProjectTable />} />
          <Route path="/projects_overview" element={<ProjectOverview />} />


          <Route
            path="/project_board/:projectSlug"
            element={<ProjectBoard />}
          />
          {/*<Route path="/myproposal" element={<MyProposal />} />*/}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/proposal_templates" element={<ProposalTemplate />} />
          <Route path="/plan_room" element={<PlanRoom />} />
          <Route
            path="/myganarpro/favorites"
            element={
              <ProtectedRoute>
                <ProjectFavorite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myganarpro/hiddenProjects"
            element={
              <ProtectedRoute>
                <ProjectArchive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myganarpro/recentlyViewed"
            element={
              <ProtectedRoute>
                <ProjectRecent />
              </ProtectedRoute>
            }
          />
          <Route path="/capability_statement" element={<PDF />} />
          <Route
            path="/capability_statement/Version-A"
            element={<PDFVersion_A />}
          />
          <Route
            path="/capability_statement/Version-B"
            element={<PDFVersion_B />}
          />

          <Route path="/prequel-masterkey" element={<CompanyDetailsForms />} />
          <Route path="/capability_statement" element={<PDF />} />
          <Route
            path="/capability_statement/Version-A"
            element={<PDFVersion_A />}
          />
          <Route
            path="/capability_statement/Version-B"
            element={<PDFVersion_B />}
          />
          <Route path="/mapv2" element={<ProjectBoardV2 />} />
        </Routes>
      </div>
    </>
  );
};

export default AuthRoutes;
