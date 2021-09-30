import Navbar from './Navbar'
// import Footer from './footer'

const Layout = ({ children }: any) => {
  return (
    <div className="bg-gray-200 min-h-screen w-100">
      <Navbar />
        <main className="p-4">{children}</main>
    </div>
  )
}

export default Layout