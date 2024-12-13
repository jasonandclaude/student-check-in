// src/types/supabase.ts
export interface Database {
    public: {
      Tables: {
        students: {
          Row: {
            id: string;
            student_number: string;
            first_name: string;
            last_name: string;
            grade_level: number;
            qr_code: string;
            created_at: string;
          };
          Insert: Omit<Tables['students']['Row'], 'id' | 'created_at'>;
          Update: Partial<Tables['students']['Insert']>;
        };
        check_ins: {
          Row: {
            id: string;
            student_id: string;
            check_in_time: string;
            check_out_time: string | null;
            reason: string | null;
            created_at: string;
          };
          Insert: Omit<Tables['check_ins']['Row'], 'id' | 'created_at'>;
          Update: Partial<Tables['check_ins']['Insert']>;
        };
      };
    };
  }
  
  // src/lib/api.ts
  import { supabase } from './supabase';
  
  export async function checkInStudent(qrCode: string, reason?: string) {
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select()
      .eq('qr_code', qrCode)
      .single();
  
    if (studentError) throw studentError;
  
    const { data: checkIn, error: checkInError } = await supabase
      .from('check_ins')
      .insert([{
        student_id: student.id,
        reason
      }]);
  
    if (checkInError) throw checkInError;
    return { student, checkIn };
  }