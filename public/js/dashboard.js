
// Chart For the Employee Table
fetchData();
async function fetchData() {
    const response = await fetch('/chart/employee');
    const data = await response.json();  

    document.getElementById("active").innerHTML = `Active Employees Count : ${data[0].count}`;
    document.getElementById("inactive").innerHTML = `Inactive Employees Count : ${data[1].count} `;
    var result = Number(data[0].count) + Number(data[1].count);
    document.getElementById("total").innerHTML = `Total Employees : ${result}`;

    return data;
  }
  async function createPieChart() {
    const data = await fetchData();
  
    const labels = data.map(entry => entry.status);
    const counts = data.map(entry => entry.count);
    // console.log(labels);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Employee Status',
          data: counts,
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)', 
            'rgba(255, 99, 132, 0.5)'   
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false // Set to true if you want a responsive chart
      }
    });
  }
  
  createPieChart();
  


// Chart For the Asset Table
  // fetchData1();
  // async function fetchData1() {
  //   const response = await fetch('/chart/asset');
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // }
  // async function createasset() {
  //   try {
  //     const data = await fetchData1();
    
  //     const labels = data.map(entry => entry.assetName);
  //     const counts = data.map(entry => entry.count);
  
  //     const backgroundColors = [];
  //     for (let i = 0; i < labels.length; i++) {
  //       const r = Math.floor(Math.random() * 256);
  //       const g = Math.floor(Math.random() * 256);
  //       const b = Math.floor(Math.random() * 256);
  //       const color = `rgba(${r}, ${g}, ${b}, 0.5)`;
  //       backgroundColors.push(color);
  //     }
    
  //     const ctx = document.getElementById('assetchart').getContext('2d');
  //     const myChart = new Chart(ctx, {
  //       type: 'pie',
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           label: 'Asset Names',
  //           data: counts,
  //           backgroundColor: backgroundColors,
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         responsive: false // Set to true if you want a responsive chart
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error creating asset chart:', error);
  //   }
  // }
  // createasset();

  