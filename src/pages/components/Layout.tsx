import Navbar from './Navbar'
// import Footer from './footer'

const Layout = ({ children }: any) => {
  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
        <main>{children}</main>
    </div>
  )
}

export default Layout