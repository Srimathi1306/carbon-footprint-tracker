import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { getBenchmark } from "../../services/benchmarkService";
import "../../styles/Benchmark.css";

function Benchmark() {
  const [benchmarks, setBenchmarks] = useState([]);

  useEffect(() => {
    loadBenchmark();
  }, []);

  const loadBenchmark = async () => {
    try {
      const response = await getBenchmark();
      setBenchmarks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout role="USER">
      <DashboardHeader
        title="Peer Benchmark"
        subtitle="Compare your carbon footprint with other users."
      />

      <div className="benchmark-grid">
        {benchmarks.map((item, index) => (
          <div className="benchmark-card" key={index}>
            <h3>{item.category}</h3>

            <p>
              <strong>Your Emission</strong>
              <br />
              {Number(item.userEmission).toFixed(2)} kg
            </p>

            <p>
              <strong>Platform Average</strong>
              <br />
              {Number(item.platformAverage).toFixed(2)} kg
            </p>

            <p>
              <strong>Percentile</strong>
              <br />
              {Number(item.percentile).toFixed(1)}%
            </p>

            <h4>{item.performance}</h4>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Benchmark;
