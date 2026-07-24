// ============================================================
// AppRouter — DevOpsX routing with lazy loading
// ============================================================

import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { PageLoader } from '../components/ui/Skeleton';
import MainLayout from '../layouts/MainLayout';

// Lazy load all pages for code splitting
const Home = lazy(() => import('../pages/Home/index'));
const AllCourses = lazy(() => import('../pages/AllCourses/index'));
const CourseDetails = lazy(() => import('../pages/CourseDetails/index'));
const TextBooks = lazy(() => import('../pages/TextBooks/index'));
const Notes = lazy(() => import('../pages/Notes/index'));
const Assignments = lazy(() => import('../pages/Assignments/index'));
const Practice = lazy(() => import('../pages/Practice/index'));
const Dashboard = lazy(() => import('../pages/Dashboard/index'));
const MyLearning = lazy(() => import('../pages/MyLearning/index'));
const Wishlist = lazy(() => import('../pages/Wishlist/index'));
const Certificates = lazy(() => import('../pages/Certificates/index'));
const Profile = lazy(() => import('../pages/Profile/index'));
const Categories = lazy(() => import('../pages/Categories/index'));
const About = lazy(() => import('../pages/About/index'));
const Contact = lazy(() => import('../pages/Contact/index'));
const Login = lazy(() => import('../pages/Login/index'));
const Register = lazy(() => import('../pages/Register/index'));
const Onboarding = lazy(() => import('../pages/Onboarding/index'));
const GradeSelect = lazy(() => import('../pages/GradeSelect/index'));
const NotFound = lazy(() => import('../pages/NotFound/index'));

// Wrapper that renders MainLayout with Outlet for nested routes
function LayoutWrapper() {
  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth + Onboarding routes — full-screen, no Sidebar/Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/grade-select" element={<GradeSelect />} />

        {/* All main app routes wrapped in MainLayout */}
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/textbooks" element={<TextBooks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
