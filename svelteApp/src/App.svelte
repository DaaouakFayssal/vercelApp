<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  let revenueChart;
  let purchasesChart;
  let ratingChart;

  onMount(async () => {
    // Fetch revenue data from API
    const revenueResponse = await fetch('/api/revenue-by-category');
    const revenueData = await revenueResponse.json();

    // Fetch purchases data from API
    const purchasesResponse = await fetch('/api/total-purchases-by-customer-type');
    const purchasesData = await purchasesResponse.json();

    // Fetch rating data from API
    const ratingResponse = await fetch('/api/average-rating-by-gender');
    const ratingData = await ratingResponse.json();

    // Create revenue chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: revenueData.map(d => d._id),
        datasets: [{
          label: 'Total Revenue',
          data: revenueData.map(d => d.totalRevenue),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Create purchases chart
    const purchasesCtx = document.getElementById('purchasesChart').getContext('2d');
    purchasesChart = new Chart(purchasesCtx, {
      type: 'doughnut',
      data: {
        labels: purchasesData.map(d => d._id),
        datasets: [{
          label: 'Total Purchases',
          data: purchasesData.map(d => d.totalPurchases),
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      }
    });

    // Create rating chart
    const ratingCtx = document.getElementById('ratingChart').getContext('2d');
    ratingChart = new Chart(ratingCtx, {
      type: 'bar',
      data: {
        labels: ratingData.map(d => d._id),
        datasets: [{
          label: 'Average Rating',
          data: ratingData.map(d => d.avgRating),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {y: {
beginAtZero: true
}
}
}
});
});
</script>

<div>
  <canvas id="revenueChart"></canvas>
</div>
<div>
  <canvas id="purchasesChart"></canvas>
</div>
<div>
  <canvas id="ratingChart"></canvas>
</div>
         
