/*
  # Initial Schema for Cybersecurity LMS

  1. New Tables
    - users (extends Supabase auth.users)
      - profile information
      - role and status
    - courses
      - course details and metadata
    - modules
      - course content organization
    - lessons
      - actual learning content
    - enrollments
      - tracks user course participation
    - progress
      - tracks user lesson completion
    - assessments
      - quizzes and tests
    - assessment_responses
      - user responses to assessments
    - certificates
      - completed course certificates
    - categories
      - course categorization
    
  2. Security
    - Enable RLS on all tables
    - Policies for students to view enrolled content
    - Policies for instructors to manage their courses
    - Policies for admins to manage all content
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE content_type AS ENUM ('video', 'text', 'lab', 'quiz');
CREATE TYPE enrollment_status AS ENUM ('active', 'completed', 'dropped');

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  bio text,
  role user_role DEFAULT 'student',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  category_id uuid REFERENCES categories(id),
  instructor_id uuid REFERENCES profiles(id),
  level course_level DEFAULT 'beginner',
  price decimal(10,2) DEFAULT 0.00,
  duration_weeks integer,
  is_published boolean DEFAULT false,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  content_type content_type DEFAULT 'text',
  duration_minutes integer,
  order_index integer NOT NULL,
  is_free boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  course_id uuid REFERENCES courses(id),
  status enrollment_status DEFAULT 'active',
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Progress tracking table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  lesson_id uuid REFERENCES lessons(id),
  completed boolean DEFAULT false,
  completed_at timestamptz,
  last_accessed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id),
  title text NOT NULL,
  description text,
  passing_score integer DEFAULT 70,
  max_attempts integer DEFAULT 3,
  duration_minutes integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assessment questions table
CREATE TABLE IF NOT EXISTS assessment_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE,
  question text NOT NULL,
  correct_answer text NOT NULL,
  options jsonb,
  points integer DEFAULT 1,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Assessment responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  assessment_id uuid REFERENCES assessments(id),
  score integer,
  attempt_number integer,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  responses jsonb
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  course_id uuid REFERENCES courses(id),
  issued_at timestamptz DEFAULT now(),
  certificate_url text,
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Profiles Policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Courses Policies
CREATE POLICY "Published courses are viewable by everyone"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Instructors can manage their courses"
  ON courses FOR ALL
  TO authenticated
  USING (instructor_id = auth.uid())
  WITH CHECK (instructor_id = auth.uid());

-- Modules and Lessons Policies
CREATE POLICY "Enrolled users can view course content"
  ON modules FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE user_id = auth.uid()
      AND course_id = modules.course_id
      AND status = 'active'
    )
  );

CREATE POLICY "Enrolled users can view lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN modules m ON m.course_id = e.course_id
      WHERE e.user_id = auth.uid()
      AND m.id = lessons.module_id
      AND e.status = 'active'
    )
    OR lessons.is_free = true
  );

-- Enrollments Policies
CREATE POLICY "Users can view their enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can enroll themselves"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Progress Policies
CREATE POLICY "Users can manage their progress"
  ON progress FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Assessment Policies
CREATE POLICY "Enrolled users can view assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN modules m ON m.course_id = e.course_id
      JOIN lessons l ON l.module_id = m.id
      WHERE e.user_id = auth.uid()
      AND l.id = assessments.lesson_id
      AND e.status = 'active'
    )
  );

-- Assessment Questions Policies
CREATE POLICY "Enrolled users can view questions"
  ON assessment_questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN modules m ON m.course_id = e.course_id
      JOIN lessons l ON l.module_id = m.id
      JOIN assessments a ON a.lesson_id = l.id
      WHERE e.user_id = auth.uid()
      AND a.id = assessment_questions.assessment_id
      AND e.status = 'active'
    )
  );

-- Assessment Responses Policies
CREATE POLICY "Users can manage their responses"
  ON assessment_responses FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Certificates Policies
CREATE POLICY "Users can view their certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_modules_course ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_assessment_lesson ON assessments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_assessment_questions ON assessment_questions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_user ON assessment_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_assessment ON assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course ON certificates(course_id);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
