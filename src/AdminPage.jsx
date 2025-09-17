import Navbar from "./Navbar"
import EmailForm from "./MailBox"
import Footer from "./AppFooter"

function AdminPage() {
    return (<>
        <div className="container-fluid bg-light">
            <Navbar />

            <EmailForm />

            <Footer />

        </div>


    </>)
}
export default AdminPage