// Chart For the Employee Table
    async function fetchData() {
      const response = await fetch('/chart/employee');
      const data = await response.json(); 
      return data;
    }

    async function employeePieChart() {
      try {
        const data = await fetchData();
        const labels = data.labels;
        const counts = data.counts.map(count => parseInt(count)); 
        
        console.log(labels+" "+counts);

        const backgroundColors = [];
        for (let i = 0; i < labels.length; i++) {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          const color = `rgba(${r}, ${g}, ${b}, 0.5)`;
          backgroundColors.push(color);
        }

        const ctx = document.getElementById('EmployeeChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Employee Status', 
              data: counts,
              backgroundColor: backgroundColors,
              borderWidth: 5
            }]
          },
          options: {
            responsive: false
          },
          plugins: {
            title: {
              display: false // Disable chart title
            }
          }
        });
      } catch (error) {
        console.error('Error creating employee pie chart:', error);
      }
    }
    employeePieChart();

  
  
// Chart For the Asset Table

    async function fetchData1() {
      try {
        const response = await fetch('/chart/asset');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }

    async function createasset() {
      try {
        const data = await fetchData1();
        const labels = data.labels;
        const counts = data.counts;

        console.log(labels);

        const backgroundColors = [];
        for (let i = 0; i < labels.length; i++) {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          const color = `rgba(${r}, ${g}, ${b}, 0.5)`;
          backgroundColors.push(color);
        }

        const ctx = document.getElementById('assetchart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: counts,
              backgroundColor: backgroundColors,
            }]
          },
          options: {
            responsive: false,
          },
          scales: {
            y: {
              ticks: {
                autoSkip: false,
                suggestedMin: 1,
                suggestedMax: 5,
                stepSize: 1
              }
            }
          },
        });
      } catch (error) {
        console.error('Error creating asset chart:', error);
      }
    }
    createasset();
