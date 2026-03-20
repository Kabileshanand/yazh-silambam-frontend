import { supabase } from './supabase';

const ADMIN_ACCESS_KEY = 'YAZHADMIN';
const ADMIN_PASSWORD = 'yazhadmin';

const generateStudentId = async () => {
  const { data } = await supabase.from('students').select('id');
  const count = (data?.length || 0) + 1;
  return `Yazhstudent${String(count).padStart(3, '0')}`;
};

export const authAPI = {
  login: async (email, password, role) => {
    if (role === 'admin') {
      if (email === ADMIN_ACCESS_KEY && password === ADMIN_PASSWORD) {
        return { data: { success: true, user: { uid: 'admin', role: 'admin' } } };
      }
      return { data: { success: false, message: 'Invalid Admin Access Key or Password.' } };
    }

    const studentId = email.replace('@yazhsilamba.com', '');
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .eq('password', password)
      .single();

    if (error || !data) {
      return { data: { success: false, message: 'Invalid credentials.' } };
    }
    return { data: { success: true, user: { uid: data.id, role: 'student', ...data } } };
  },

  signup: async (studentName, fatherName, dob, admissionDate) => {
    const id = await generateStudentId();
    const password = 'yazhstudent';

    const { error } = await supabase.from('students').insert([{
      id,
      name: studentName,
      father: fatherName,
      dob,
      admission: admissionDate,
      status: 'Active',
      password,
      studentReport: '',
      instructorNote: ''
    }]);

    if (error) return { data: { success: false, message: error.message } };
    return {
      data: {
        success: true,
        message: `Registration successful!\nStudent ID: ${id}\nPassword: ${password}\n\nPlease save these credentials.`
      }
    };
  }
};

export const usersAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from('students').select('*');
    if (error) return { data: { success: false } };
    return { data: { success: true, users: data } };
  },

  getById: async (id) => {
    const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
    if (error || !data) return { data: { success: false } };
    return { data: { success: true, user: data } };
  },

  update: async (id, updates) => {
    const { data, error } = await supabase.from('students').update(updates).eq('id', id).select().single();
    if (error) return { data: { success: false } };
    return { data: { success: true, user: data } };
  },

  delete: async (id) => {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) return { data: { success: false } };
    return { data: { success: true } };
  }
};

export const eventsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (error) return { data: { success: false } };
    return { data: { success: true, events: data.map(e => ({ ...e, _id: e.id })) } };
  },

  create: async (eventData) => {
    const { error } = await supabase.from('events').insert([eventData]);
    if (error) return { data: { success: false } };
    return { data: { success: true } };
  },

  update: async (id, updates) => {
    const { _id, ...rest } = updates;
    const { error } = await supabase.from('events').update(rest).eq('id', id);
    if (error) return { data: { success: false } };
    return { data: { success: true } };
  },

  delete: async (id) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) return { data: { success: false } };
    return { data: { success: true } };
  }
};

export default { authAPI, usersAPI, eventsAPI };
