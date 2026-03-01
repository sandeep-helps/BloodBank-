import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  MessageSquare,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios"; // Make sure to install axios: npm install axios

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData);
      
      setSubmitStatus({
        type: "success",
        message: response.data.message
      });

      // Clear form on success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <Header />
      {/* HERO SECTION */}
      <section className="py-20 mt-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          We're here to support you. Reach out to us for any help, queries, or blood-related assistance.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {/* Phone */}
          <div className="text-center shadow-md p-8 rounded-xl hover:shadow-xl transition">
            <Phone className="w-10 h-10 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emergency Helpline</h3>
            <p className="text-gray-600">+91 9135612405</p>
            <p className="text-gray-600">Available 24/7</p>
          </div>

          {/* Email */}
          <div className="text-center shadow-md p-8 rounded-xl hover:shadow-xl transition">
            <Mail className="w-10 h-10 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">support@BloodBank+.org</p>
            <p className="text-gray-600">info@BloodBank+.org</p>
          </div>

          {/* Office */}
          <div className="text-center shadow-md p-8 rounded-xl hover:shadow-xl transition">
            <MapPin className="w-10 h-10 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Head Office</h3>
            <p className="text-gray-600">Pakwara Moradabad, Uttar Pradesh</p>
            <p className="text-gray-600">India - 244001</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-6">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-gray-600 mb-6">
              Have any questions? We're always here to help you with blood donation, camp organization, or support queries.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="text-red-600 mr-3" />
                <span className="text-gray-700">+91 9135612405</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-red-600 mr-3" />
                <span className="text-gray-700">support@BloodBank+</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-red-600 mr-3" />
                <span className="text-gray-700">Pakwara Moradabad, Uttar Pradesh</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8">
              <a href="https://www.instagram.com/the.sharmaj/"><Instagram className="w-8 h-8 text-red-600 hover:text-red-700 cursor-pointer" /></a>
              <a href="https://www.facebook.com/share/1DmsRhvBP9/" ><Facebook className="w-8 h-8 text-red-600 hover:text-red-700 cursor-pointer" /></a>
              <a href="https://www.linkedin.com/in/sandeep-sharma-b1a91b29a/"><Linkedin className="w-8 h-8 text-red-600 hover:text-red-700 cursor-pointer" /></a>
              <Globe className="w-8 h-8 text-red-600 hover:text-red-700 cursor-pointer" />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            {/* Success/Error Message */}
            {submitStatus.message && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {submitStatus.message}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="font-medium text-gray-700">Full Name</label>
              <div className="flex items-center border rounded-lg px-3 mt-2">
                <User className="text-gray-500 mr-2" />
                <input  
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="font-medium text-gray-700">Email Address</label>
              <div className="flex items-center border rounded-lg px-3 mt-2">
                <Mail className="text-gray-500 mr-2" />
                <input  
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium text-gray-700">Phone Number</label>
              <div className="flex items-center border rounded-lg px-3 mt-2">
                <Phone className="text-gray-500 mr-2" />
                <input  
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="font-medium text-gray-700">Message</label>
              <div className="flex items-start border rounded-lg px-3 mt-2">
                <MessageSquare className="text-gray-500 mr-2 mt-3" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full p-3 outline-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="mb-5">
        <iframe
          title="map"
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.369049855795!2d78.65839096813944!3d28.821817581738614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afdf54eb3683f%3A0x272419cbb2b959c!2sTMU%20Hospital%2C%20Moradabad%2C%20Uttar%20Pradesh!5e1!3m2!1sen!2sin!4v1771826263727!5m2!1sen!2sin"
          allowFullScreen
        ></iframe>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Contact;