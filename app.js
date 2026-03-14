const { useState, useRef } = React;

const novaTimeline = [
  {
    start: 0,
    end: 3,
    subtitle: "Frame Analysis",
    title: "Product Detected",
    description:
      "White sneaker detected in the influencer video. Likely category: casual footwear.",
    product: "Nike Air Force 1",
    brand: "Nike",
    links: [
      { name: "Amazon", url: "#" },
      { name: "Trendyol", url: "#" },
      { name: "Nike Store", url: "#" }
    ]
  },
  {
    start: 4,
    end: 7,
    subtitle: "Brand Detection",
    title: "Handbag Identified",
    description:
      "Luxury leather handbag detected. Style resembles premium designer tote.",
    product: "Leather Tote Bag",
    brand: "Coach (estimated)",
    links: [
      { name: "Amazon", url: "#" },
      { name: "Zara", url: "#" },
      { name: "Coach", url: "#" }
    ]
  },
  {
    start: 8,
    end: 11,
    subtitle: "Object Recognition",
    title: "Sunglasses Detected",
    description:
      "Black sunglasses spotted during the video. Classic influencer accessory.",
    product: "Ray-Ban Wayfarer",
    brand: "Ray-Ban",
    links: [
      { name: "Amazon", url: "#" },
      { name: "Ray-Ban Store", url: "#" },
      { name: "Hepsiburada", url: "#" }
    ]
  },
  {
    start: 12,
    end: 15,
    subtitle: "Style Analysis",
    title: "Denim Jacket Found",
    description:
      "Light blue denim jacket detected. Casual fashion item commonly featured in lifestyle videos.",
    product: "Denim Jacket",
    brand: "Levi’s (estimated)",
    links: [
      { name: "Amazon", url: "#" },
      { name: "Levi’s Store", url: "#" },
      { name: "Trendyol", url: "#" }
    ]
  }
];


function Header() {
  return (
    <header className="header">
      <div className="logo">Nova Influencer Finder</div>

      <nav className="nav">
        <a href="#demo">Demo</a>
        <a href="#products">Products</a>
        <a href="#links">Links</a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="badge">Amazon Nova Hackathon Project</div>

        <h1>Discover Products From Influencer Videos</h1>

        <p>
          Upload an influencer video or provide a video link. The system analyzes
          visible products, detects likely names and brands, and helps users
          reach shopping links faster.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">See Demo</button>
          <button className="secondary-btn">View Detected Products</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
            alt="Influencer fashion preview"
          />
          <div className="hero-card-content">
            <span className="mini-tag">Video Commerce Discovery</span>
            <h3>Turn Video Moments Into Shopping Opportunities</h3>
            <p>
              Detect featured items inside influencer content and connect users
              to product links in seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function UploadSection({
  videoUrl,
  setVideoUrl,
  setAnalysisResults,
  isLoading,
  setIsLoading
}) {
  const [selectedFileName, setSelectedFileName] = useState("No video selected yet");

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setSelectedFileName(file.name);
    }
  }

  function handleDemoVideo() {
    setSelectedFileName("demo-influencer-video.mp4");
  }

  async function handleAnalyzeVideo() {
  if (!videoUrl.trim()) {
    alert("Please paste a video URL first.");
    return;
  }

  try {
    setIsLoading(true);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: videoUrl })
    });

    const data = await response.json();

    if (data.status === "success" && Array.isArray(data.results)) {
      setAnalysisResults(data.results);
      console.log("Nova analysis results:", data.results);
    } else {
      alert("Analysis failed.");
    }
  } catch (error) {
    console.error("Analyze error:", error);
    alert("Could not connect to backend.");
  } finally {
    setIsLoading(false);
  }
}

  return (
    <section className="upload-section">
      <div className="section-heading">
        <span className="section-tag">Input</span>
        <h2>Upload Influencer Video or Paste a Link</h2>
        <p>
          Start with a short influencer video or public video link. Nova will
          analyze frames, detect visible products, identify likely brands, and
          prepare shopping-oriented results.
        </p>
      </div>

      <div className="upload-box">
        <div className="upload-icon">↑</div>
        <h3>Add your influencer video</h3>
        <p>Supports MP4, short-form product videos, and public video URLs.</p>

        <div className="upload-actions">
          <label className="primary-btn file-label">
            Choose Video
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden-file-input"
            />
          </label>

          <button className="secondary-btn" onClick={handleDemoVideo}>
            Use Demo Video
          </button>
        </div>

        <div className="video-url-box">
          <span className="selected-file-label">Video Link</span>
          <input
            type="text"
            placeholder="Paste Instagram, YouTube or public video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="video-url-input"
          />
        </div>

        <div className="analyze-action-row">
          <button
            className="analyze-btn"
            onClick={handleAnalyzeVideo}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze with Nova"}
          </button>
        </div>

        <div className="selected-file-box">
          <span className="selected-file-label">Selected Video</span>
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

            <div className="product-detected">
              <strong>Product:</strong> {activeStep.product}
            </div>

            <div className="product-brand">
              <strong>Brand:</strong> {activeStep.brand}
            </div>

            <div className="shopping-links">
              {activeStep.links.map((link, i) => (
                <a key={i} href={link.url} className="shop-btn">
                  {link.name}
                </a>
              ))}
            </div>
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
    <section className="output-showcase-section" id="products">
      <div className="section-heading">
        <span className="section-tag">Detected Products</span>
        <h2>Products Found in the Video</h2>
        <p>
          Nova analyzes influencer video frames and extracts visible products,
          likely brands, and shopping-ready item information.
        </p>
      </div>

      <div className="output-grid">
        <div className="output-card">
          <span className="output-label">Sneakers</span>
          <h3>Nike Air Force 1</h3>
          <p>
            White low-top sneaker detected in a casual styling segment. Likely
            brand match: Nike.
          </p>
        </div>

        <div className="output-card">
          <span className="output-label">Handbag</span>
          <h3>Leather Tote Bag</h3>
          <p>
            Premium tote-style handbag identified in a fashion-focused sequence.
            Likely designer-inspired styling.
          </p>
        </div>

        <div className="output-card">
          <span className="output-label">Eyewear</span>
          <h3>Ray-Ban Wayfarer</h3>
          <p>
            Black sunglasses detected as a recurring accessory in the influencer
            look. Likely classic Wayfarer style.
          </p>
        </div>

        <div className="output-card">
          <span className="output-label">Outerwear</span>
          <h3>Denim Jacket</h3>
          <p>
            Light-wash denim jacket spotted in a lifestyle scene. Likely casual
            fashion piece from a mainstream brand.
          </p>
        </div>
      </div>
    </section>
  );
}

function ShoppingLinksSection() {
  return (
    <section className="shopping-links-section" id="links">
      <div className="section-heading">
        <span className="section-tag">Shopping Links</span>
        <h2>Go From Discovery to Purchase</h2>
        <p>
          Once products are detected, users can explore direct shopping options
          across different platforms and marketplaces.
        </p>
      </div>

      <div className="shopping-links-grid">
        <div className="shopping-product-card">
          <div className="shopping-product-head">
            <span className="output-label">Detected Item</span>
            <h3>Nike Air Force 1</h3>
            <p>Detected from a sneaker-focused scene in the influencer video.</p>
          </div>

          <div className="link-group">
            <a href="#" className="market-link">Amazon</a>
            <a href="#" className="market-link">Trendyol</a>
            <a href="#" className="market-link">Nike Store</a>
          </div>
        </div>

        <div className="shopping-product-card">
          <div className="shopping-product-head">
            <span className="output-label">Detected Item</span>
            <h3>Ray-Ban Wayfarer</h3>
            <p>Detected as a recurring eyewear product in the video sequence.</p>
          </div>

          <div className="link-group">
            <a href="#" className="market-link">Amazon</a>
            <a href="#" className="market-link">Hepsiburada</a>
            <a href="#" className="market-link">Ray-Ban Store</a>
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
        <h2>Faster Product Discovery From Video Content</h2>
        <p>
          The system helps users move from watching influencer content to
          discovering and shopping featured products with less manual effort.
        </p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Seconds</h3>
          <p>To detect visible products from key video moments</p>
        </div>

        <div className="metric-card">
          <h3>Less Search</h3>
          <p>Users spend less time manually looking for featured items</p>
        </div>

        <div className="metric-card">
          <h3>Multi-Link</h3>
          <p>Products can be matched with links across multiple stores</p>
        </div>

        <div className="metric-card">
          <h3>Video Commerce</h3>
          <p>Transforms influencer content into shoppable discovery flows</p>
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
  const [analysisResults, setAnalysisResults] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="page-shell">
      <div className="container">
        <Header />
        <HeroSection />
        <UploadSection
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          setAnalysisResults={setAnalysisResults}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <ProcessingSection analysisResults={analysisResults} />
        <OutputShowcaseSection analysisResults={analysisResults} />
        <ShoppingLinksSection analysisResults={analysisResults} />
        <MetricsSection />
      </div>

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);