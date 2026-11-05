import pool from '@/lib/db';
import AddCourseForm from './add-course-form';

async function getData() {
  try {
    const [courses] = await pool.query(`
      SELECT c.id, c.course_code, c.course_name, c.credits, i.name AS instructor_name
      FROM courses c
      LEFT JOIN instructor i ON c.instructor_id = i.id
      ORDER BY c.id DESC
    `);

    const [instructors] = await pool.query(`SELECT id, name FROM instructor ORDER BY name ASC`);

    return { courses, instructors };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { courses: [], instructors: [] };
  }
}

export default async function Page() {
  const { courses, instructors } = await getData();

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Course Catalog - 6703952
      </h1>

      <AddCourseForm instructors={instructors} />

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="p-4 font-semibold">รหัสวิชา</th>
              <th className="p-4 font-semibold">ชื่อวิชา</th>
              <th className="p-4 font-semibold">หน่วยกิต</th>
              <th className="p-4 font-semibold">ผู้สอน</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  ไม่พบข้อมูลรายวิชา (ตรวจสอบการเชื่อมต่อฐานข้อมูล)
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{course.course_code}</td>
                  <td className="p-4">{course.course_name}</td>
                  <td className="p-4">{course.credits}</td>
                  <td className="p-4">{course.instructor_name || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}