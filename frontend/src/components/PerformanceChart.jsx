function PerformanceChart() {
  const performanceData = [
    { month: 'Apr', value: 45 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 62 },
    { month: 'Jul', value: 70 },
    { month: 'Aug', value: 76 },
    { month: 'Sep', value: 84 },
  ]

  return (
    <div className="card performance-card">

      <div className="performance-header">
        <div>
          <h3>Performance Overview</h3>
          <p>Your academic performance over time</p>
        </div>

        <select defaultValue="Last 6 Months">
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="performance-chart">

        <div className="performance-y-axis">
          <span>100%</span>
          <span>80%</span>
          <span>60%</span>
          <span>40%</span>
          <span>20%</span>
          <span>0%</span>
        </div>

        <div className="performance-area">

          <div className="performance-grid">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="performance-bars">

            {performanceData.map((item) => (
              <div
                className="performance-column"
                key={item.month}
              >

                <div className="performance-value">
                  {item.value}%
                </div>

                <div
                  className="performance-bar"
                  style={{
                    height: `${item.value}%`,
                  }}
                ></div>

                <div className="performance-month">
                  {item.month}
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default PerformanceChart