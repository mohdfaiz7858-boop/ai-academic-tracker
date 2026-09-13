import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

function Contact() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-heading">
          <h1>Contact Us 📩</h1>

          <p>
            Have questions or feedback? We'd love to
            hear from you.
          </p>
        </div>

        <section className="contact-grid">

          <div className="card contact-info-card">
            <div className="contact-icon">
              📚
            </div>

            <h2>Academic Tracker</h2>

            <p>
              AI-powered academic performance tracking
              and personalized student guidance system.
            </p>

            <div className="contact-details">

              <div className="contact-detail">
                <span>📧</span>

                <div>
                  <small>Email</small>
                  <strong>
                    support@academictracker.com
                  </strong>
                </div>
              </div>

              <div className="contact-detail">
                <span>💬</span>

                <div>
                  <small>Support</small>
                  <strong>
                    We're here to help
                  </strong>
                </div>
              </div>

              <div className="contact-detail">
                <span>⏰</span>

                <div>
                  <small>Response Time</small>
                  <strong>
                    Within 24 hours
                  </strong>
                </div>
              </div>

            </div>
          </div>

          <div className="card contact-form-card">
            <div className="card-header">
              <div>
                <h2>Send us a message</h2>

                <p>
                  Share your question, feedback or
                  suggestion.
                </p>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault()
                alert(
                  'Thank you! Your message has been received.'
                )
              }}
            >
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                required
              />

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

              <label>Message</label>

              <textarea
                placeholder="Write your message..."
                rows="5"
                required
              ></textarea>

              <button type="submit">
                Send Message 📩
              </button>
            </form>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Contact