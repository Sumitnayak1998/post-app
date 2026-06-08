import { useState } from "react";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    enquiry: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.phone.trim() || !form.enquiry.trim()) {
      toast.error("Please fill in email, phone number, and enquiry.");
      return;
    }

    toast.success("Your enquiry has been captured on the frontend.");
    setForm({
      email: "",
      phone: "",
      enquiry: "",
    });
  };

  return (
    <section className="contact-grid">
      <div className="contact-card">
        <p className="muted">Reach out anytime</p>
        <h1 className="section-title">Contact us</h1>
        <div className="info-list">
          <div className="info-pill">
            <strong>Email support</strong>
            <p className="helper-text">Share your project questions and we will help you quickly.</p>
          </div>
          <div className="info-pill">
            <strong>Phone contact</strong>
            <p className="helper-text">Leave your number so the team can follow up when needed.</p>
          </div>
          <div className="info-pill">
            <strong>Enquiry box</strong>
            <p className="helper-text">Ask anything about posts, login issues, or account help.</p>
          </div>
        </div>
      </div>

      <form className="contact-card form-grid" onSubmit={handleSubmit}>
        <label className="field-label">
          Email
          <input
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>

        <label className="field-label">
          Phone number
          <input
            className="input"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>

        <label className="field-label">
          Enquiry
          <textarea
            className="textarea"
            name="enquiry"
            value={form.enquiry}
            onChange={handleChange}
            placeholder="Ask your question here"
          />
        </label>

        <div className="form-actions">
          <button className="button-primary" type="submit">
            Send enquiry
          </button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
