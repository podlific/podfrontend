import React, { useEffect, useState } from "react";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { BiMessageAlt } from "react-icons/bi";
// import { faker } from '@faker-js/faker';
export const ChartArea = ({ percentage1, percentage2 }) => {
  if (isNaN(percentage1)) {
    percentage1 = 0.5;
    percentage2 = 0.5;
  }
  return (
    <Doughnut
      data={{
        datasets: [
          {
            label: "My First Dataset",
            data: [percentage1 * 100, percentage2 * 100],
            backgroundColor: ["#5F50A3", "#B198FF"],
            borderColor: ["#5F50A3", "#B198FF"],
            hoverOffset: 10,
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: "85%",
      }}
    />
  );
};
export const HorizontalLine = ({ percentage }) => {
  const [currentPercentage, setCurrentPercentage] = useState(98);
  useEffect(() => {
    if (percentage !== -Infinity && !isNaN(percentage))
      setCurrentPercentage(Math.ceil(percentage.toFixed(2)));
  }, [percentage]);
  return (
    <div className="w-[90%] flex flex-row  relative">
      <div
        style={{
          width: `${currentPercentage}%`,
          borderColor: "#5F50A3",
          background: "#5F50A3",
          position: "absolute",
          borderWidth: "8px",
          zIndex: "2",
          borderRadius: "9px",
        }}
      ></div>
      <div className="absolute border-[8px] rounded-[9px] border-[#D9D9D9] bg-[#D9D9D9] w-full z-0"></div>
      <div
        style={{
          marginLeft: `${currentPercentage - 9}%`,
          position: "absolute",
          zIndex: "2",
          bottom: "-3px",
        }}
      >
        <BiMessageAlt color="black" size={32} />
      </div>
      <div
        style={{
          marginLeft: `${currentPercentage - 5}%`,
          position: "absolute",
          zIndex: "2",
          bottom: "4px",
          paddingTop: "1px",
        }}
      >
        {currentPercentage}
      </div>
    </div>
  );
};
export const PieChart = () => {
  let data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#5E3FBE",
          "#886BD8",
          "#A88DEB",
          "#CBB6F8",
          "#E5DAFB",
          "#F4F0FD",
        ],
        borderColor: [
          "#5E3FBE",
          "#886BD8",
          "#A88DEB",
          "#CBB6F8",
          "#E5DAFB",
          "#F4F0FD",
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        // cutout: "80%",
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
        },
      }}
      responsive={true}
      maintainAspectRatio={false}
    />
  );
};
export const BarGraph = (userweekDaysData, userweekDaysLabel, showLabel) => {
  let data = {
    labels: userweekDaysLabel,
    datasets: [
      {
        label: showLabel,
        data: userweekDaysData,
        backgroundColor: "#5F50A3",
      },
    ],
  };
  return (
    <Bar
      // options={...}
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        // cutout: "80%",
        // plugins: {
        //   legend: {
        //     display: true,
        //     position: "right",
        //   },
        // },
      }}
      // responsive={true}
      // maintainAspectRatio={false}
    />
  );
};
