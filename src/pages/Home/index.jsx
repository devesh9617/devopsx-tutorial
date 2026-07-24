// ============================================================
// Home Page — DevOpsX
// ============================================================

import Hero from '../../components/sections/Hero';
import {
  FeaturedCourses,
  PopularCategories,
  TrendingCourses,
  LearningPaths,
  LatestBooks,
  TopInstructors,
  StudentReviews,
  FAQ,
} from '../../components/sections/HomeSections';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCourses />
      <PopularCategories />
      <TrendingCourses />
      <LearningPaths />
      <LatestBooks />
      <TopInstructors />
      <StudentReviews />
      <FAQ />
    </main>
  );
}
