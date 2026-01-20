fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    if (!data || data.length === 0) return console.error("Data kosong di database!");

    const width = 600, height = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const radius = Math.min(width, height) / 2 - 40;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // --- 1 & 6. BAR CHARTS ---
    const x = d3.scaleBand().domain(data.map(d => d.nama_prodi)).range([margin.left, width - margin.right]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).nice().range([height - margin.bottom, margin.top]);

    const drawBar = (id, col) => {
        const svg = d3.select(id);
        svg.selectAll('*').remove();
        svg.selectAll('rect').data(data).enter().append('rect')
          .attr('x', d => x(d.nama_prodi)).attr('y', d => y(d.total))
          .attr('width', x.bandwidth()).attr('height', d => height - margin.bottom - y(d.total)).attr('fill', col);
        svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x));
        svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));
    };
    drawBar('#chart1', 'steelblue');
    drawBar('#chart6', 'red');

    // --- 2. LINE CHART ---
    const svg2 = d3.select('#chart2');
    svg2.selectAll('*').remove();
    const xLine = d3.scalePoint().domain(data.map(d => d.nama_prodi)).range([margin.left, width - margin.right]);
    svg2.append('path').datum(data).attr('fill', 'none').attr('stroke', 'green').attr('stroke-width', 3)
        .attr('d', d3.line().x(d => xLine(d.nama_prodi)).y(d => y(d.total)));
    svg2.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xLine));
    svg2.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    // --- 3 & 4. PIE & DONUT ---
    const drawPie = (id, inner) => {
        const svg = d3.select(id).selectAll('*').remove();
        const g = d3.select(id).append('g').attr('transform', `translate(${width/2},${height/2})`);
        const pie = d3.pie().value(d => d.total);
        const arc = d3.arc().innerRadius(inner).outerRadius(radius);
        g.selectAll('path').data(pie(data)).enter().append('path').attr('d', arc).attr('fill', (d,i) => color(i)).attr('stroke', '#fff');
    };
    drawPie('#chart3', 0); // Pie
    drawPie('#chart4', 70); // Donut

    // --- 5. HORIZONTAL BAR ---
    const svg5 = d3.select('#chart5');
    svg5.selectAll('*').remove();
    const yH = d3.scaleBand().domain(data.map(d => d.nama_prodi)).range([margin.top, height - margin.bottom]).padding(0.2);
    const xH = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).range([margin.left, width - margin.right]);
    svg5.selectAll('rect').data(data).enter().append('rect')
        .attr('x', margin.left).attr('y', d => yH(d.nama_prodi))
        .attr('width', d => xH(d.total) - margin.left).attr('height', yH.bandwidth()).attr('fill', 'orange');
    svg5.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xH));
    svg5.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yH));
  });