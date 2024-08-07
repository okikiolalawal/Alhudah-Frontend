// import '@/styles/globals.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import dynamic from "next/dynamic"
// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
export default function App({ Component, pageProps }) {
  // const bootstrapjs = dynamic(async()=>
  // await import('../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'),{
  //   loading: ()=><p>Loading</p>
  // }
  // )
  return <Component {...pageProps} />
}
