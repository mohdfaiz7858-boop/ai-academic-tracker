function PerformanceChart() {
  return (
    <div className="card performance-card">
      <div className="card-header">
        <div>
          <h3>Performance Overview</h3>
          <p>Your academic performance over time</p>
        </div>

        <select>
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="chart">
        <div className="chart-line">
          <span>90%</span>
          <span>80%</span>
          <span>70%</span>
          <span>60%</span>
          <span>50%</span>
        </div>

        <div className="chart-bars">
          <div className="bar" style={{ height: '45%' }}></div>
          <div className="bar" style={{ height: '55%' }}></div>
          <div className="bar" style={{ height: '62%' }}></div>
          <div className="bar" style={{ height: '70%' }}></div>
          <div className="bar" style={{ height: '76%' }}></div>
          <div className="bar" style={{ height: '84%' }}></div>
        </div>
      </div>

      <div className="chart-months">
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
      </div>
    </div>
  )
}

export default PerformanceChart