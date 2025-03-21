import './BannerSection.css'

const BannerSection = () => {
  return (
    <section className="banner-section">
      <div className="banner-grid">
        <div className="banner-item">
          <img src="/banner1.jpg" alt="Banner 1" />
        </div>
        <div className="banner-item">
          <img src="/banner2.jpg" alt="Banner 2" />
        </div>
      </div>
    </section>
  )
}

export default BannerSection 