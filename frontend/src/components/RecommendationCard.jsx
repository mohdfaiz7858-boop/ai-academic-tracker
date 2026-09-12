function RecommendationCard() {
  return (
    <section className="card recommendation">
      <div className="recommendation-icon">💡</div>

      <div>
        <span>AI RECOMMENDATION</span>
        <h2>Focus on your study consistency</h2>
        <p>
          Your performance is improving, but your study hours fluctuate.
          Try maintaining at least 3 hours of focused study every day.
        </p>
      </div>

      <button>View Recommendations →</button>
    </section>
  )
}

export default RecommendationCard