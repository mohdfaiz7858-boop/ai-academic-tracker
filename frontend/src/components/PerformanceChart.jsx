import { useAcademic } from '../context/AcademicContext'

function PerformanceChart() {
  const { subjects } = useAcademic()

  const performanceData = subjects.map((subject) => ({
    subject: subject.name,
    value:
      subject.maxMarks > 0
        ? Number(
            (
              (subject.obtainedMarks /
                subject.maxMarks) *
              100
            ).toFixed(1)
          )
        : 0,
  }))

  return (
    <div className="card performance-card">
      <div className="performance-header">
        <div>
          <h3>Performance Overview</h3>

          <p>
            Your current subject-wise performance
          </p>
        </div>
      </div>

      {performanceData.length === 0 ? (
        <div className="performance-empty">
          <span>📊</span>

          <p>
            Add your subject marks to see your
            performance chart.
          </p>
        </div>
      ) : (
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
                  key={item.subject}
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
                    {item.subject}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PerformanceChart