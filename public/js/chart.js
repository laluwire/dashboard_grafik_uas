fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    const svg = d3.select('#chart1');
    // LINE CHART
fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    const svg = d3.select('#chart2');
    const width = 600;
    const height = 400;

    const x = d3.scalePoint()
      .domain(data.map(d => d.nama_prodi))
      .range([50, width - 50]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .range([height - 50, 50]);

    const line = d3.line()
      .x(d => x(d.nama_prodi))
      .y(d => y(d.total));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', line);
  });


// PIE CHART
fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    const svg = d3.select('#chart3')
      .append('g')
      .attr('transform', 'translate(300,200)');

    const radius = 150;
    const pie = d3.pie().value(d => d.total);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);
  });


// DONUT CHART
fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    const svg = d3.select('#chart4')
      .append('g')
      .attr('transform', 'translate(300,200)');

    const radius = 150;
    const pie = d3.pie().value(d => d.total);
    const arc = d3.arc().innerRadius(70).outerRadius(radius);

    svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeSet2[i]);
  });


// HORIZONTAL BAR
fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    const svg = d3.select('#chart5');
    const width = 600;
    const height = 400;

    const y = d3.scaleBand()
      .domain(data.map(d => d.nama_prodi))
      .range([50, height - 50])
      .padding(0.2);

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .range([50, width - 50]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => y(d.nama_prodi))
      .attr('x', 50)
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.total) - 50)
      .attr('fill', 'orange');
  });


// BAR KEDUA
fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    const svg = d3.select('#chart6');
    const width = 600;
    const height = 400;

    const x = d3.scaleBand()
      .domain(data.map(d => d.nama_prodi))
      .range([50, width - 50])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .range([height - 50, 50]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.nama_prodi))
      .attr('y', d => y(d.total))
      .attr('width', x.bandwidth())
      .attr('height', d => height - 50 - y(d.total))
      .attr('fill', 'purple');
  });

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const x = d3.scaleBand()
      .domain(data.map(d => d.nama_prodi))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.nama_prodi))
      .attr('y', d => y(d.total))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d.total))
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  });
