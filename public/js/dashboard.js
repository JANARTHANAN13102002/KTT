// Chart For the Employee Table
    async function fetchData() {
      const response = await fetch('/dashboard/chart/employee');
      const data = await response.json();
      var total;
      
      if(!(parseInt(data.counts[1]) && parseInt(data.counts[0])))
          total = 0;
      else if(!(parseInt(data.counts[0])))
        total = parseInt(data.counts[1]);
      else if(!(parseInt(data.counts[1])))
        total = parseInt(data.counts[0]);
      else
        total = (parseInt(data.counts[1]) + parseInt(data.counts[0]))

      document.getElementById('total').innerHTML = `Total Employees = ` + total;
      return data;
    }

    async function employeePieChart() {
      try {
        const data = await fetchData();
        const labels = data.labels;
        const counts = data.counts.map(count => parseInt(count)); 
        
        const colors = ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'];
        const ctx = document.getElementById('EmployeeChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Employee Status', 
              data: counts,
              backgroundColor: colors,
              borderWidth: 5
            }]
          },
          options: {
            responsive: false,
            plugins: {
              legend: false 
            },
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
        const response = await fetch('/dashboard/chart/asset');
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
        const counts = data.counts.map(count => parseInt(count)); 

        const dataDisplay = [{
          x : labels, 
          y : counts, 
          type:"bar",
          marker:{
            color: [
              'rgba(229, 229, 229, 1)',
              'rgba(173, 216, 230, 1)',
              'rgba(144, 238, 144, 1)',
              'rgba(255, 255, 204, 1)',
              'rgba(255, 229, 180, 1)',
              'rgba(255, 204, 204, 1)',
              'rgba(255, 192, 203, 1)',
              'rgba(238, 130, 238, 1)',
              'rgba(245, 222, 179, 1)']
          },
          margin: { t: 0 , b : 0 , l : 0 , r : 0},
          width: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
        }];                                
        var layout = {
          width : 300,
          height : 220,
          yaxis: {
            dtick: 1
          }
        }          
        Plotly.newPlot("assetchart", dataDisplay, layout);
      } catch (error) {
        console.error('Error creating asset chart:', error);
      }
    }
    createasset();


// Chart For the AssetHistory Table
    async function fetchDataAssetHistory() {
      try {
        const response = await fetch('/dashboard/chart/AssetHistory');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }

    async function createAssetHistory() {
      try { 
          const data = await fetchDataAssetHistory();
          const labels = data.labels;
  
          // Arrays to hold createdAt and scrapDate values
          const createdAtArray = [];
          const scrapDateArray = [];
  
          // Extracting createdAt and scrapDate values from each label
          labels.forEach(label => {
              let createdAt = moment(label.createdAt).format("YYYY-MM-DD");
              let scrapDate = moment(label.scrapDate).format("YYYY-MM-DD");
              createdAtArray.push(createdAt);
              scrapDateArray.push(scrapDate);
          });
  
          console.log(createdAtArray);
          console.log(scrapDateArray);
          
          const ctx = document.getElementById('assethistory').getContext('2d');
          let examLineChart = new Chart(ctx, {
              type: "line",
              data: {
                  labels: createdAtArray,   
                  datasets: [{
                      label: 'Scrap Date',
                      data: scrapDateArray,
                  }]
              },
              options: {
                  scales: {
                      xAxes: [{
                          type: 'time',
                          time: {
                              unit: 'day',
                              displayFormats: {
                                  day: 'DD-MM-YYYY'
                              }
                          }
                      }]
                  }
              }
          });
      } catch (error) {
          console.error('Error creating Asset History chart:', error);
      }
  }
  createAssetHistory();
  


