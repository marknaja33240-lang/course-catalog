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
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">เพิ่มรายวิชาใหม่ (Course Catalog)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">รหัสวิชา</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2 text-gray-900"
            placeholder="เช่น CS103"
            value={formData.course_code}
            onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อวิชา</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2 text-gray-900"
            placeholder="เช่น Database Systems"
            value={formData.course_name}
            onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">หน่วยกิต</label>
          <input
            type="number"
            min="1"
            max="6"
            required
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={formData.credits}
            onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ผู้สอน</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-900"
            value={formData.instructor_id}
            onChange={(e) => setFormData({ ...formData, instructor_id: e.target.value })}
          >
            <option value="">-- เลือกผู้สอน --</option>
            {instructors.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'กำลังบันทึก...' : 'บันทึกวิชา'}
      </button>
    </form>
  );
}