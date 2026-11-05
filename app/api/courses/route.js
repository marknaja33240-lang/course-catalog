import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { course_code, course_name, credits, instructor_id } = body;

    if (!course_code || !course_name || !credits) {
      return NextResponse.json(
        { message: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO courses (course_code, course_name, credits, instructor_id)
       VALUES (?, ?, ?, ?)`,
      [course_code, course_name, Number(credits), instructor_id ? Number(instructor_id) : null]
    );

    return NextResponse.json(
      { message: 'บันทึกรายวิชาสำเร็จ', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล', error: error.message },
      { status: 500 }
    );
  }
}