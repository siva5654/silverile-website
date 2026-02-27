import Navbar from "@/components/Navbar";
import RegisterSection from "@/components/RegisterSection";
import Footer from "@/components/Footer";

const Register = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <RegisterSection />
    </div>
    <Footer />
  </div>
);

export default Register;
