import { supabase } from './supabase';
import { Database } from '../types/supabase';

type Student = Database['public']['Tables']['students']['Row'];
type CheckIn = Database['public']['Tables']['check_ins']['Row'];

export async function checkInStudent(qrCode: string): Promise<{ student: Student; checkIn: CheckIn }> {
  // Get student
  const { data: student, error: studentError } = await supabase
    .from('students')
    .select()
    .eq('qr_code', qrCode)
    .single();

  if (studentError) throw studentError;

  // Create check-in
  const { data: checkIn, error: checkInError } = await supabase
    .from('check_ins')
    .insert([{
      student_id: student.id,
      check_in_time: new Date().toISOString()
    }])
    .select()
    .single();

  if (checkInError) throw checkInError;

  return { student, checkIn };
}