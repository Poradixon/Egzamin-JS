const apiUrl = "https://api.carbonintensity.org.uk/intensity";
const dateFrom = '2021-02-01';
const dateTo = '2021-03-01';

async function getData() {
    try {
        const response = await fetch(`${apiUrl}/${dateFrom}/${dateTo}`);
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error(error)
    }
}

//  wywolac getData i filtrowac 

(function() {
    getData()
        .then(data => filterByDate(data))
        .catch(err => console.error(err));
})();

function filterByDate(data) {
    const dateFrom = new Date('2021-02-01');
    const dateTo = new Date('2021-03-01');
    let loop = dateFrom;

    while (loop <= dateTo) {
        const dataByDay = data.filter(element => element.from.slice(0, 10) == loop.toISOString().slice(0, 10))
        display(dataByDay, loop)
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
}

function display(data, time) {
    // TODO change foreach to filter
    // arr = [];
    // data.forEach(item => arr.push(item.intensity.forecast))
    const mediana = median(data.map(item => item.intensity.forecast));
    const template = `<p>${time} forecast median: ${mediana}</p>`
    document.body.innerHTML += template
}

function median(values) {
    if (values.length === 0) return 0;
    values.sort(function(a, b) {
        return a - b;

    });
    let half = Math.floor(values.length / 2);
    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

// dla forecast wyliczyc mediane i push na html