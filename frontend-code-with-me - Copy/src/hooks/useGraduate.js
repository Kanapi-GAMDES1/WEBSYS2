import axios from 'axios';
import { useState } from 'react';

export function useGraduate() {
  const [graduates, setGraduates] = useState([]);
  const BASE_URL = 'http://localhost:3000';

  async function getAllGraduates() {
    const graduates = await axios.get(`${BASE_URL}/graduates`);

    setGraduates(graduates.data);
  }

  async function getAllGraduatesWithStudentInfo() {
    const graduates = await axios.get(`${BASE_URL}/graduates/with-student`);

    setGraduates(graduates.data);
  }

  return {
    graduates,
    getAllGraduates,
    getAllGraduatesWithStudentInfo
  };
}