// ============================================================
// Wishlist Page — DevOpsX
// ============================================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';
import CourseCard from '../../components/cards/CourseCard';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function Wishlist() {
  const { user } = useAuth();
  const wishlistCourses = courses.filter((c) => user?.wishlist?.includes(c.id));

  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-white text-xl">Sign in to view your wishlist</p>
      <Link to="/login"><Button>Sign In</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <Heart size={24} className="text-red-400 fill-red-400" />
          <div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>Wishlist</h1>
            <p className="text-gray-400">{wishlistCourses.length} saved courses</p>
          </div>
        </div>

        {wishlistCourses.length === 0 ? (
          <EmptyState
            icon="wishlist"
            title="Your wishlist is empty"
            description="Browse courses and click the heart icon to save them here."
            action={() => window.location.href = '/courses'}
            actionLabel="Browse Courses"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {wishlistCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
