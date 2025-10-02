import axios from 'axios';
import { useState } from 'react';
import { faker } from '@faker-js/faker'

export function useStudent() {
  const [students, setStudents] = useState([]);
  const BASE_URL = 'http://localhost:3000';

  async function getAllStudents() {
    const students = await axios.get(`${BASE_URL}/students`);

    setStudents(students.data);
  }

  async function getAllStudentGraduationInfo() {
    const students = await axios.get(`${BASE_URL}/students/with-graduation`);

    setStudents(students.data);
  }

  async function createStudent() {
    const fakeStudent = {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
    };

    const response = await axios.post(`${BASE_URL}/students`, fakeStudent);

    setStudents(prev => [...prev, response.data]);
  }

  async function deleteStudent() {
    const response = await axios.delete(`${BASE_URL}`);

    setStudents(prev => {
      return prev.filter(student => student.id !== response.data.id);
    });
  }

  return {
    students,
    getAllStudents,
    getAllStudentGraduationInfo,
    createStudent,
    deleteStudent,
  };
}