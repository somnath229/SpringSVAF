import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const BarGraph = () => {
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState(null);
  const [attributeVisibility, setAttributeVisibility] = useState({
    intensity: true,
    likelihood: true,
    relevance: true,
    end_year: false,
    start_year: false,
    country: false,
    topics: false,
    region: false,
    city: false,
  });

  useEffect(() => {
    fetchData();
  }, [attributeVisibility]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://springdvaa.onrender.com/api/v1/data/getCsv"
      );
      const data = await response.json();
      createChartData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const createChartData = (data) => {
    const attributes = [
      "intensity",
      "likelihood",
      "relevance",
      "end_year",
      "start_year",
      "country",
      "topics",
      "region",
      "city",
    ];

    const labels = attributes;
    const datasets = [];

    attributes.forEach((attribute) => {
      if (attributeVisibility[attribute]) {
        const attributeData = data.map((item) => item[attribute]);
        const dataset = {  
          label: attribute,
          data: attributeData,
          backgroundColor: getRandomColor(),
        };

        datasets.push(dataset);
      }
    });

    setChartData({ labels, datasets });
  };

  const getRandomColor = () => {
    const colors = [
      "rgba(255, 99, 132, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(75, 192, 192, 0.7)",
      "rgba(153, 102, 255, 0.7)",
      "rgba(255, 159, 64, 0.7)",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        position: "bottom",
        text: "Assignment Bar Chart : (You can select the Chart Type and Filter)",
      }, 
    },
    scales: {
      x: {
        stacked: false,
        beginAtZero: true,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  };
  const handleToggleAttribute = (attribute) => {
    setAttributeVisibility((prevState) => ({
      ...prevState,
      [attribute]: !prevState[attribute],
    }));
  };
  return (
    <div>
      <div
        style={{
          width: "800px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:"5rem"
        }}>
        {chartData && chartType === "bar" && (
          <Bar data={chartData} options={options} />
        )}
        {chartData && chartType === "pie" && (
          <Pie data={chartData} options={options} />
        )}
        {chartData && chartType === "line" && (
          <Line data={chartData} options={options} />
        )}
        {chartData && chartType === "doughnut" && (
          <Doughnut data={chartData} options={options} />
        )}
      </div>
      <div style={{ margin: "4rem 0" }}>
        <h3>Filter Visibility:</h3>
        {Object.entries(attributeVisibility).map(([attribute, isVisible]) => (
          <label
            key={attribute}
            style={{ padding: "1rem", textTransform: "capitalize" }}>
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => handleToggleAttribute(attribute)}
            />
            {attribute}
          </label>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <h3 style={{ paddingRight: "1rem" }}>Chart Type:</h3>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="line">Line Chart</option>
            <option value="doughnut">Doughnut Chart</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
