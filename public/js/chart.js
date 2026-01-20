fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) return console.error("Data kosong!");

    const width = 600;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };

    // --- 1. BAR CHART (CHART 1) ---
    const svg1 = d3.select('#chart1');
    const x1 = d3.scaleBand()
      .domain(data.map(d => d.nama_prodi))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y1 = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)]).nice()
      .range([height - margin.bottom, margin.top]);

    svg1.selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => x1(d.nama_prodi))
      .attr('y', d => y1(d.total))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - margin.bottom - y1(d.total))
      .attr('fill', 'steelblue');

    svg1.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x1));
    svg1.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y1));

    // --- 2. LINE CHART (CHART 2) ---
    const svg2 = d3.select('#chart2');
    const x2 = d3.scalePoint().domain(data.map(d => d.nama_prodi)).range([margin.left, width - margin.right]);
    const y2 = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).nice().range([height - margin.bottom, margin.top]);

    const line = d3.line().x(d => x2(d.nama_prodi)).y(d => y2(d.total));
    svg2.append('path').datum(data).attr('fill', 'none').attr('stroke', 'green').attr('stroke-width', 3).attr('d', line);
    svg2.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x2));
    svg2.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y2));

    // --- 3. HORIZONTAL BAR (CHART 5) ---
    const svg5 = d3.select('#chart5');
    const y5 = d3.scaleBand().domain(data.map(d => d.nama_prodi)).range([margin.top, height - margin.bottom]).padding(0.2);
    const x5 = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).range([margin.left, width - margin.right]);

    svg5.selectAll('rect').data(data).enter().append('rect')
      .attr('x', margin.left)
      .attr('y', d => y5(d.nama_prodi))
      .attr('width', d => x5(d.total) - margin.left)
      .attr('height', y5.bandwidth())
      .attr('fill', 'orange');

    svg5.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x5));
    svg5.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y5));

    // --- 4. BAR CHART KEDUA (CHART 6) ---
    const svg6 = d3.select('#chart6');
    svg6.selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => x1(d.nama_prodi))
      .attr('y', d => y1(d.total))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - margin.bottom - y1(d.total))
      .attr('fill', 'red');

    svg6.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x1));
    svg6.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y1));
  });