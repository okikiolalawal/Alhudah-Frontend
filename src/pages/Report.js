// pages/report.js
import ReportCard from '@/components/ReportCard';

const reportData = {
  name: 'Lawal Moriam',
  className: 'SSS 2B',
  term: '2ND TERM',
  session: '2019/2020',
  totalMark: 800,
  totalObtained: 592,
  percentage: 74,
  position: '4th',
  status: 'Passed',
  nextTerm: '',
  teacherComment: "Don't relent, wonderful performance.",
  principalComment: 'Satisfactory',
  subjects: [
    { name: 'English Language', ca: 29, exam: 45, total: 74, grade: 'A1', position: '', remark: 'Excellent' },
    { name: 'Mathematics', ca: 29.5, exam: 52, total: 81.5, grade: 'A1', position: '', remark: 'Excellent' },
    { name: 'Further Mathematics', ca: 27, exam: 44, total: 71, grade: 'B2', position: '', remark: 'Good' },
    { name: 'Islamic Studies', ca: 26.4, exam: 47, total: 73.2, grade: 'A1', position: '', remark: 'Good' },
    { name: 'Physics', ca: 22.5, exam: 39, total: 61.5, grade: 'C4', position: '', remark: 'Good' },
    { name: 'Biology', ca: 24.6, exam: 58, total: 82.6, grade: 'A1', position: '', remark: 'Excellent' },
    { name: 'Civic Education', ca: 24.6, exam: 61, total: 85.6, grade: 'A1', position: '', remark: 'Excellent' },
    { name: 'Data Processing', ca: 13.8, exam: 39.5, total: 53.3, grade: 'C6', position: '', remark: 'Credit' }
  ]
};

export default function ReportPage() {
  return (
    <div className="p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
        onClick={() => window.print()}
      >
        Print Report
      </button>
      <ReportCard data={reportData} />
    </div>
  );
}
