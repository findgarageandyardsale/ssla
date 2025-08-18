import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Home";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import Layout from "./components/Layout";
import { StaffPage } from "./pages/StaffPage";
import { HomeworkAndHomeStudy } from "./pages/HomeworkAndHomeStudy";
import { ErrorPage } from "./pages/ErrorPage";
import { ToAndFromSchool } from "./pages/ToAndFromSchool";
import { GeneralRules } from "./pages/GeneralRules";
import { DisciplinePolicies } from "./pages/DisciplinePolicies";
import { ClassroomRules } from "./pages/ClassroomRules";
import { GSRegistrationForm } from "./pages/GSRegistrationForm";
import { RegistrationPage } from "./pages/RegistrationPage";
import { CoursesOfferedPage } from "./pages/CoursesOfferedPage";
import { AdminGalleryPage } from "./pages/AdminGalleryPage";
import { CloudinaryTest } from "./pages/CloudinaryTest";
import { UploadStatus } from "./components/UploadStatus";
import AutoLoginStatus from "./components/AutoLoginStatus";
import { useEffect, useState } from "react";
import { ImageDialog } from "./components/ImageFlyer/ImageDialog";
import ssla_flyer from "./assets/ssla_flyer.jpeg";
import CalendarPage from "./pages/CalendarPage";
import calendar from "./assets/calendar.jpeg";

const App = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalendarModal, setIsOpenCalendarModal] = useState(false);

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <Home />
        </Layout>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <AboutUsPage />
        </Layout>
      ),
    },
    {
      path: "/staff",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <StaffPage />
        </Layout>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <ContactUsPage />
        </Layout>
      ),
    },
    {
      path: "/gallery",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <GalleryPage />
        </Layout>
      ),
    },
    {
      path: "/testimonials",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <TestimonialsPage />
        </Layout>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <PrivacyPolicy />
        </Layout>
      ),
    },
    {
      path: "/terms-and-conditions",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <TermsAndConditions />
        </Layout>
      ),
    },
    {
      path: "/gs-register-form",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <GSRegistrationForm />
        </Layout>
      ),
    },
    {
      path: "/register-form",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <RegistrationPage />
        </Layout>
      ),
    },
    {
      path: "/homework-and-home-study",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <HomeworkAndHomeStudy />
        </Layout>
      ),
    },
    {
      path: "/to-and-from-school",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <ToAndFromSchool />
        </Layout>
      ),
    },
    {
      path: "/general-rules",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <GeneralRules />
        </Layout>
      ),
    },
    {
      path: "/discipline-policies",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <DisciplinePolicies />
        </Layout>
      ),
    },
    {
      path: "/classroom-rules",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <ClassroomRules />
        </Layout>
      ),
    },
    {
      path: "/courses-offered",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <CoursesOfferedPage />
        </Layout>
      ),
    },

    {
      path: "/admin/gallery",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <AdminGalleryPage />
        </Layout>
      ),
    },
    {
      path: "/cloudinary-test",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <CloudinaryTest />
        </Layout>
      ),
    },
    {
      path: "/upload-status",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <UploadStatus />
        </Layout>
      ),
    },
    {
      path: "/calendar",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <CalendarPage />
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isOpenCalendarModal={isOpenCalendarModal}
          setIsOpenCalendarModal={setIsOpenCalendarModal}
        >
          <ErrorPage />
        </Layout>
      ),
    },
  ]);

  useEffect(() => {
    localStorage.removeItem('cloudinary_gallery_images');
    localStorage.removeItem('form_signatures');
  })

  return (
    <>
      <RouterProvider router={router} />
      <AutoLoginStatus />

      {isOpenModal && (
        <ImageDialog
          setIsOpenModal={setIsOpenModal}
          imageSrc={ssla_flyer}
          imageAlt={"ssla_flyer"}
          title={"ssla_flyer"}
        />
      )}

      {isOpenCalendarModal && (
        <ImageDialog
          setIsOpenModal={setIsOpenCalendarModal}
          imageSrc={calendar}
          imageAlt={"calendar"}
          title={"calendar"}
        />
      )}
    </>
  );
};

export default App;
