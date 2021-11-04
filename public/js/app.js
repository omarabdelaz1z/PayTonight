const homeBtn = document.getElementById('homeBtn');
const transactionsBtn = document.getElementById('transactionsBtn');
const homeSection = document.getElementById('homeSec');
const transactionsSection = document.getElementById('transactions');
const chart = document.getElementById('myChart');

homeBtn.addEventListener('click', (e) => {
    homeBtn.classList.add('active');
    transactionsBtn.classList.remove('active');
    homeSection.classList.remove('d-none');
    transactionsSection.classList.add('d-none');
})

transactionsBtn.addEventListener('click', (e) => {
    homeBtn.classList.remove('active');
    transactionsBtn.classList.add('active');
    homeSection.classList.add('d-none');
    transactionsSection.classList.remove('d-none');
});

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function formatDate(isoDateString) {
    let dateAndTime = new Date(isoDateString);
    console.log(dateAndTime)
    let date = dateAndTime.toString().substring(4,10);
    let time = dateAndTime.toString().substring(16,24);
    return `${date} - ${time}`;
}


async function fetchTransctions() {
    const id = document.getElementById('userId').dataset.id;
    const res = await fetch(`http://localhost:5000/transactions/user/${id}`);
    console.log(id);
    if (!res.ok) {
        console.log('error');
    }
    let transactions = (await res.json())[1];
    let amountData = transactions.map(transactions => transactions.amount);
    let labels = transactions.map(transactions => formatDate(transactions.created_at));
    const data = {
        labels: ['0', ...labels],
        datasets: [{
            label: 'Transctions Summary',
            data: [0, ...amountData],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    let configChart = new Chart(chart, {
        type: 'line',
        data: data
    });
    console.log(transactions);
}

fetchTransctions();