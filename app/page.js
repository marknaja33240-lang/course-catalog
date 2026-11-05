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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-rose-500 selection:text-white">
      <main className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Hero Banner สีแดงไล่เฉด */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-rose-600 to-red-900 p-8 shadow-2xl shadow-red-900/40 border border-red-500/30">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider uppercase bg-white/20 text-white rounded-full backdrop-blur-sm">
                Academic Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Course Catalog
              </h1>
              <p className="mt-1 text-red-100 text-sm font-medium">
                Student ID: <span className="font-bold underline decoration-white/50">6703952</span>
              </p>
            </div>

            {/* การ์ดสถิติจำนวนวิชา */}
            <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 self-start md:self-auto">
              <div className="w-12 h-12 rounded-xl bg-red-500/30 flex items-center justify-center text-2xl font-black text-rose-200">
                📚
              </div>
              <div>
                <div className="text-xs text-red-200 font-medium">จำนวนรายวิชาทั้งหมด</div>
                <div className="text-2xl font-bold text-white">{courses.length} วิชา</div>
              </div>
            </div>
          </div>
        </header>

        {/* ฟอร์มเพิ่มวิชา */}
        <AddCourseForm instructors={instructors} />

        {/* ตารางแสดงข้อมูลรายวิชา */}
        <section className="bg-slate-900/90 rounded-2xl shadow-xl border border-red-900/30 overflow-hidden backdrop-blur-sm">
          <div className="p-5 border-b border-red-900/30 bg-gradient-to-r from-red-950/40 to-transparent flex items-center justify-between">
            <h2 className="text-lg font-bold text-rose-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              ตารางแสดงรายวิชาที่เปิดสอน
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-950/60 text-rose-200 text-xs uppercase tracking-wider border-b border-red-900/30">
                  <th className="py-4 px-6 font-semibold">รหัสวิชา</th>
                  <th className="py-4 px-6 font-semibold">ชื่อวิชา</th>
                  <th className="py-4 px-6 font-semibold text-center">หน่วยกิต</th>
                  <th className="py-4 px-6 font-semibold">อาจารย์ผู้สอน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-12 text-center text-slate-400">
                      <div className="text-4xl mb-2">📭</div>
                      ยังไม่มีรายวิชาในระบบ (หรือยังไม่ได้เชื่อมต่อฐานข้อมูล)
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-red-950/30 transition-colors duration-150 group"
                    >
                      <td className="py-4 px-6 font-mono font-bold text-rose-400 group-hover:text-rose-300">
                        {course.course_code}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-200">
                        {course.course_name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950 text-rose-300 border border-red-800/60">
                          {course.credits} หน่วยกิต
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-300">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-red-900/60 text-rose-200 flex items-center justify-center text-xs font-bold">
                            👨‍🏫
                          </span>
                          {course.instructor_name || <span className="text-slate-500 italic">ไม่ระบุ</span>}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}