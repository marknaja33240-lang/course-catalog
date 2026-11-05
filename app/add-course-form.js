'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCourseForm({ instructors }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    credits: 3,
    instructor_id: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ course_code: '', course_name: '', credits: 3, instructor_id: '' });
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      alert('ไม่สามารถส่งข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-slate-900/90 rounded-2xl shadow-xl border border-red-900/30 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="p-2 rounded-lg bg-red-900/40 text-rose-400">✏️</span>
        <h2 className="text-lg font-bold text-white">ลงทะเบียนเพิ่มรายวิชาใหม่</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
            รหัสวิชา
          </label>
          <input
            type="text"
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            placeholder="เช่น CS201"
            value={formData.course_code}
            onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
            ชื่อวิชา
          </label>
          <input
            type="text"
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            placeholder="เช่น Web Development"
            value={formData.course_name}
            onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
            หน่วยกิต
          </label>
          <input
            type="number"
            min="1"
            max="6"
            required
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            value={formData.credits}
            onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-rose-300 mb-2">
            อาจารย์ผู้สอน
          </label>
          <select
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            value={formData.instructor_id}
            onChange={(e) => setFormData({ ...formData, instructor_id: e.target.value })}
          >
            <option value="">-- เลือกอาจารย์ผู้สอน --</option>
            {instructors.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-red-900/30 transition-all duration-150 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'กำลังบันทึกข้อมูล...' : '+ บันทึกรายวิชา'}
        </button>
      </div>
    </form>
  );
}