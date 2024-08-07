import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from './Login'
import DashBoard from './DashBoard'
import AddStudent from './AddStudent'
import ParentSignUp from './ParentSignUp'
import ParentStudentDetailsPage from './ParentStudentDetailsPage'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={inter.className}>
        {/* <DashBoard></DashBoard> */}
        {/* <AddStudent></AddStudent> */}
          {/* <Login></Login> */}
          <ParentSignUp></ParentSignUp>
          {/* <ParentStudentDetailsPage/> */}
      </div>
    </>
  );
}
