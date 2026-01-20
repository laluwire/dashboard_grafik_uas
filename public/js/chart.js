fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const svg1 = d3.select('#chart1');
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const x1 = d3.scaleBand()
      .domain(data.map(d => d.nama_prodi))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y1 = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg1.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x1(d.nama_prodi))
      .attr('y', d => y1(d.total))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - margin.bottom - y1(d.total))
      .attr('fill', 'steelblue');

    svg1.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x1));

    svg1.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y1));

    const svg3 = d3.select('#chart3')
      .append('g')
      .attr('transform', 'translate(300,200)');

    const pie = d3.pie().value(d => d.total);
    const arc = d3.arc().innerRadius(0).outerRadius(150);

    svg3.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);

    const svg4 = d3.select('#chart4')
      .append('g')
      .attr('transform', 'translate(300,200)');

    const arcDonut = d3.arc().innerRadius(70).outerRadius(150);

    svg4.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arcDonut)
      .attr('fill', (d, i) => d3.schemeSet2[i]);

  })
  .catch(err => console.error(err));
