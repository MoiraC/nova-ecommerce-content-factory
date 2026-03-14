const { useState, useRef } = React;

const novaTimeline = [
  {
    start: 0,
    end: 3,
    title: "Product Detection",
    subtitle: "AI Vision Analysis",
    description:
      "Nova identifies the uploaded item and extracts its visual attributes for downstream content generation."
  },
  {
    start: 4,
    end: 7,
    title: "Background Generation",
    subtitle: "Scene Imagination",
    description:
      "Nova imagines a premium lifestyle backdrop to elevate the product's visual presentation."
  },
  {
    start: 8,
    end: 11,
    title: "Instagram Caption",
    subtitle: "Social Content",
    description:
      "A short, elegant caption is generated to fit the product's visual tone and audience."
  },
  {
    start: 12,
    end: 15,
    title: "Ad Copy",
    subtitle: "Marketing Output",
    description:
      "Conversion-focused promotional text is created for ad creatives, banners, and campaign use."
  }
];

function Header() {
  return (
    <header className="header">
      <div className="logo">Nova Studio</div>

      <nav className="nav">
        <a href="#demo">Demo</a>
        <a href="#outputs">Outputs</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="badge">Amazon Nova Hackathon Project</div>

        <h1>E-Commerce Content Factory</h1>

        <p>
          Upload a raw product photo and let AI transform it into a polished
          marketing experience with premium background ideas, social captions,
          and ad-ready copy.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">See Demo</button>
          <button className="secondary-btn">Explore Outputs</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
            alt="Product preview"
          />
          <div className="hero-card-content">
            <span className="mini-tag">AI Generated Flow</span>
            <h3>Luxury Product Presentation</h3>
            <p>
              From raw packshot to premium storefront storytelling in seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function UploadSection() {
  const [selectedFileName, setSelectedFileName] = useState("No file selected yet");

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setSelectedFileName(file.name);
    }
  }

  function handleDemoProduct() {
    setSelectedFileName("demo-product-image.jpg");
  }

  return (
    <section className="upload-section">
      <div className="section-heading">
        <span className="section-tag">Input</span>
        <h2>Upload Product Image or Video</h2>
        <p>
          Start with a raw product photo or short product video. Nova will analyze
          the asset and prepare creative outputs for marketing and storefront presentation.
        </p>
      </div>

      <div className="upload-box">
        <div className="upload-icon">↑</div>
        <h3>Drag & Drop your product asset</h3>
        <p>Supports JPG, PNG, MP4 and short product showcase videos.</p>

        <div className="upload-actions">
          <label className="primary-btn file-label">
            Choose File
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
          </label>

          <button className="secondary-btn" onClick={handleDemoProduct}>
            Use Demo Product
          </button>
        </div>

        <div className="selected-file-box">
          <span className="selected-file-label">Selected Asset</span>
          <p>{selectedFileName}</p>
        </div>
      </div>
    </section>
  );
}

function ProcessingSection() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const progressPercent = Math.min((currentTime / 9) * 100, 100);

  const activeStep =
    novaTimeline.find(
      (item) => currentTime >= item.start && currentTime <= item.end
    ) || novaTimeline[0];

  function handleTimeUpdate() {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  return (
    <section className="processing-section" id="demo">
      <div className="section-heading">
        <span className="section-tag">AI Processing</span>
        <h2>Watch Nova Generate Creative Assets</h2>
        <p>
          The video below represents the AI workflow. As the timeline progresses,
          the generated outputs update in sync on the right side.
        </p>
      </div>

      <div className="processing-layout">
        <div className="video-panel">
          <video
            ref={videoRef}
            className="demo-video"
            controls
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="./assets/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="video-progress-bar">
            <div
              className="video-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="time-indicator">
            <span>Current second:</span>
            <strong>{currentTime.toFixed(1)}s</strong>
          </div>
        </div>

        <div className="output-panel">
          <div className="active-output-card">
            <span className="mini-tag">{activeStep.subtitle}</span>
            <h3>{activeStep.title}</h3>
            <p>{activeStep.description}</p>
          </div>

          <div className="timeline-list">
            {novaTimeline.map((item, index) => {
              const isActive =
                currentTime >= item.start && currentTime <= item.end;

              return (
                <div
                  key={index}
                  className={`timeline-item ${isActive ? "active" : ""}`}
                >
                  <div className="timeline-time">
                    {item.start}s - {item.end}s
                  </div>

                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function OutputShowcaseSection() {
  return (
    <section className="output-showcase-section" id="outputs">
      <div className="section-heading">
        <span className="section-tag">Generated Outputs</span>
        <h2>Nova-Generated Marketing Assets</h2>
        <p>
          Once the product is analyzed, Nova creates polished content blocks
          that can be used across storefronts, social channels, and ad campaigns.
        </p>
      </div>

      <div className="output-grid">
        <div className="output-card">
          <span className="output-label">Background Concept</span>
          <h3>Luxury Vanity Scene</h3>
          <p>
            A soft marble countertop, warm ambient lighting, and premium beauty
            studio styling to elevate product perception.
          </p>
        </div>

        <div className="output-card">
          <span className="output-label">Instagram Caption</span>
          <h3>Elegant Social Copy</h3>
          <p>
            Glow differently. A beauty essential designed to bring refinement
            and confidence into your daily ritual.
          </p>
        </div>

        <div className="output-card">
          <span className="output-label">Ad Copy</span>
          <h3>Performance Messaging</h3>
          <p>
            Turn simple product shots into conversion-ready campaigns with
            AI-generated visuals and persuasive brand language.
          </p>
        </div>

        <div className="output-card">
          <span className="output-label">Product Identity</span>
          <h3>Premium Beauty Positioning</h3>
          <p>
            Positioned as a modern, elegant self-care product for visually driven
            e-commerce and social-first marketing teams.
          </p>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section className="before-after-section">
      <div className="section-heading">
        <span className="section-tag">Transformation</span>
        <h2>From Raw Product Shot to Premium Brand Asset</h2>
        <p>
          Nova transforms a simple product input into a polished visual concept
          with stronger storytelling, premium context, and campaign-ready positioning.
        </p>
      </div>

      <div className="before-after-grid">
        <div className="compare-card">
          <span className="compare-label">Before</span>
          <div className="compare-image placeholder-light">
            <div className="compare-inner-text">
              <h3>Raw Product Image</h3>
              <p>Basic packshot with no storytelling or campaign framing.</p>
            </div>
          </div>
        </div>

        <div className="compare-card">
          <span className="compare-label highlight">After</span>
          <div className="compare-image placeholder-dark">
            <div className="compare-inner-text">
              <h3>Nova-Enhanced Presentation</h3>
              <p>
                Styled visual identity, luxury setting, refined copy, and
                stronger e-commerce appeal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="metrics-section">
      <div className="section-heading">
        <span className="section-tag">Impact</span>
        <h2>AI-Powered Content Acceleration</h2>
        <p>
          Nova dramatically reduces the time needed to create marketing-ready
          assets for e-commerce teams and content creators.
        </p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>90%</h3>
          <p>Faster campaign asset creation</p>
        </div>

        <div className="metric-card">
          <h3>3x</h3>
          <p>More social content generated</p>
        </div>

        <div className="metric-card">
          <h3>Minutes</h3>
          <p>From raw product photo to campaign-ready assets</p>
        </div>

        <div className="metric-card">
          <h3>AI Assisted</h3>
          <p>Creative direction and marketing copy</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-left">
          <h3>Nova Studio</h3>
          <p>
            AI-powered e-commerce content generation built for the
            Amazon Nova Hackathon.
          </p>
        </div>

        <div className="footer-right">
          <p>Built with React</p>
          <p>AI workflow demonstration</p>
          <p>© 2026 Nova Studio Demo</p>
        </div>

      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="page-shell">
      <div className="container">
        <Header />
        <HeroSection />
        <UploadSection />
        <ProcessingSection />
        <OutputShowcaseSection />
        <BeforeAfterSection />
        <MetricsSection />
      </div>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);