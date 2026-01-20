fetch('/api/mahasiswa')
  .then(res => res.json())
  .then(data => {
    console.log("Data diterima:", data);
    if (!data || data.length === 0) return;

    const width = 600, height = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Fungsi Pembantu untuk membersihkan SVG sebelum digambar ulang
    const setupSVG = (id) => {
        const svg = d3.select(id);
        svg.selectAll("*").remove(); // Hapus sisa grafik lama
        return svg;
    };

    // --- CHART 1 & 6 (Vertical Bar) ---
    const x = d3.scaleBand().domain(data.map(d => d.nama_prodi)).range([margin.left, width - margin.right]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).nice().range([height - margin.bottom, margin.top]);

    const drawBar = (id, col) => {
        const svg = setupSVG(id);
        svg.selectAll('rect').data(data).enter().append('rect')
          .attr('x', d => x(d.nama_prodi)).attr('y', d => y(d.total))
          .attr('width', x.bandwidth()).attr('height', d => height - margin.bottom - y(d.total)).attr('fill', col);
        svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x));
        svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));
    };
    drawBar('#chart1', 'steelblue');
    drawBar('#chart6', 'red');

    // --- CHART 2 (Line) ---
    const svg2 = setupSVG('#chart2');
    const xL = d3.scalePoint().domain(data.map(d => d.nama_prodi)).range([margin.left, width - margin.right]);
    svg2.append('path').datum(data).attr('fill', 'none').attr('stroke', 'green').attr('stroke-width', 3)
        .attr('d', d3.line().x(d => xL(d.nama_prodi)).y(d => y(d.total)));
    svg2.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xL));
    svg2.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

    // --- CHART 3 & 4 (Pie & Donut) ---
    const drawPie = (id, inner) => {
        const svg = setupSVG(id);
        const g = svg.append('g').attr('transform', `translate(${width/2},${height/2})`);
        const pie = d3.pie().value(d => d.total);
        const arc = d3.arc().innerRadius(inner).outerRadius(150);
        g.selectAll('path').data(pie(data)).enter().append('path').attr('d', arc).attr('fill', (d,i) => color(i)).attr('stroke', '#fff');
    };
    drawPie('#chart3', 0); drawPie('#chart4', 70);

    // --- CHART 5 (Horizontal Bar) ---
    const svg5 = setupSVG('#chart5');
    const yH = d3.scaleBand().domain(data.map(d => d.nama_prodi)).range([margin.top, height - margin.bottom]).padding(0.2);
    const xH = d3.scaleLinear().domain([0, d3.max(data, d => d.total)]).range([margin.left, width - margin.right]);
    svg5.selectAll('rect').data(data).enter().append('rect')
        .attr('x', margin.left).attr('y', d => yH(d.nama_prodi))
        .attr('width', d => xH(d.total) - margin.left).attr('height', yH.bandwidth()).attr('fill', 'orange');
    svg5.append('g').attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(xH));
    svg5.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yH));
  })
  .catch(err => console.error("Gagal ambil data untuk grafik:", err));