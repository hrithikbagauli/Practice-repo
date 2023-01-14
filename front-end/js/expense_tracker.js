const itemname = document.getElementById('itemname');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const myform = document.getElementById('myform');
const items = document.getElementById('items');
const total_spent = document.getElementById('total');
const hello_user = document.getElementById('hello_user');
const logout_user = document.getElementById('logout_user');
const buy_premium = document.getElementById('buy_premium');
const account_type = document.getElementById('account_type');
const leaderboard_btn = document.getElementById('leaderboard_btn');
const leaderboard_div = document.getElementById('leaderboard_div');
const leaderboard = document.getElementById('leaderboard');
const reportbtn_div = document.getElementById('reportbtn_div');
const reportbtn = document.getElementById('reportbtn');
const report_table = document.getElementById('report_table');
const report_btn = document.getElementById('report_btn');
const report_title = document.getElementById('report_title');
const report_div = document.getElementById('report_div');
const download_report = document.getElementById('download_report');
const download_items = document.getElementById('download_items');
const pagination_div = document.getElementById('pagination_div');
const pagination_div1 = document.getElementById('pagination_div1');
const items_per_page = document.getElementById('items_per_page');
let src;
let isEmpty;
let token;

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    token = localStorage.getItem('token');
    hello_user.innerHTML = localStorage.getItem('username');
    getData();
    getDownloads();
})

myform.addEventListener('submit', function (e) {
    e.preventDefault();
    if (itemname.value == '' || description.value == '' || amount == '') {
        alert('Please enter all the values');
    }
    else {
        findSource();
        saveData();
    }
})

items_per_page.addEventListener('change', function (e) {
    e.preventDefault();
    localStorage.setItem('items_per_page', items_per_page.value);
    getData();
})

leaderboard_btn.addEventListener('click', function (e) {
    e.preventDefault();
    getLeaderboard();
    leaderboard_div.style.display = 'block';
    leaderboard_btn.innerHTML = 'Refresh scores';
})

function getLeaderboard() {
    axios.get('http://localhost:4000/purchase/get-scoreboard', { headers: { Authorization: token } })
        .then(res => {
            if (res.data.length > 0) {
                leaderboard.replaceChildren();
                let content =
                    `<tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total money spent</th>
                </tr>`
                const tr = document.createElement('tr');
                tr.innerHTML = content;
                leaderboard.append(tr);
                let count = 1;
                for (let i = 0; i < res.data.length; i++) {
                    const tr = document.createElement('tr');
                    let content =
                        `<td>${count}</td>
                    <td>${res.data[i].name}</td>
                    <td>${res.data[i].total_cost}</td>`
                    tr.innerHTML = content;
                    count++;
                    leaderboard.append(tr);
                }
            }
        })
        .catch(err => console.log(err));
}

logout_user.addEventListener('click', function (e) {
    e.preventDefault(e);
    localStorage.clear();
    window.location.href = "../html/login.html";
})

buy_premium.addEventListener('click', function (e) {
    axios.get('http://localhost:4000/purchase/buy-premium', { headers: { Authorization: token } })
        .then(res => {
            let options = {
                "key": res.data.key_id,
                "order_id": res.data.order.id,
                "handler": function (res) {
                    axios.post('http://localhost:4000/purchase/update-transaction-status', {
                        orderId: options.order_id,
                        payment_id: res.razorpay_payment_id
                    }, { headers: { "Authorization": token } })
                        .then(() => {
                            alert("You're a premium user now!");
                            buy_premium.style.display = 'none';
                            account_type.style.display = 'block';
                            leaderboard_btn.style.display = 'block';
                            report_btn.style.display = 'block';
                            document.getElementById('download_div').style.display = 'block';
                        })
                        .catch(err => console.log(err));
                }
            }
            const rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault(e);

            rzp1.on('payment.failed', function () {
                alert('Payment failed!');
                updatePaymentStatus(res);
            })
        })
        .catch(err => console.log(err));
})

function updatePaymentStatus(res) {
    axios.post('http://localhost:4000/purchase/update-transaction-status', {
        orderId: res.data.order.id,
        payment_id: null
    }, { headers: { "Authorization": token } })
        .catch(err => console.log(err));
}

function showOnScreen(itemname, description, amount, category, img_src, id, total) {
    const tr = document.createElement('tr');
    let rawcontent =
        `<td>
            <div class="d-flex align-items-center">
                <img src="${img_src}" class="rounded-circle"/>
                <div class="ms-3">
                    <p class="fw-bold mb-1">${itemname}</p>
                    <p class="text-muted mb-0">${description}</p>
                </div>
            </div>
        </td>
        <td><input type="text" value="${category}" disabled></td>
        <td><input type="number" value="${amount}" disabled></td>
        <td>
            <button type="button" id="${id}" class="deletebtn btn-danger fw-bold" style="border-radius: 4px;">
                DELETE
            </button>
        </td>`

    tr.innerHTML = rawcontent;
    items.append(tr);
    total_spent.innerHTML = total;
    tr.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('deletebtn')) {
            axios.post('http://localhost:4000/delete-item', { id: e.target.id }, { headers: { "Authorization": token } })
                .then(() => {
                    getData();
                })
                .catch(err => console.log(err));
        }
    })
}

function getDownloads() {
    axios.get('http://localhost:4000/download/get-downloads', { headers: { "Authorization": token } })
        .then(downloads => {
            download_items.replaceChildren();
            let content;
            if (downloads.data.length > 0) {
                for (let i = 0; i < downloads.data.length; i++) {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item');
                    li.classList.add('w-75');
                    li.classList.add('d-flex');
                    li.classList.add('justify-content-between');
                    content = `<span class="pt-1">${downloads.data[i].name}</span><a href="${downloads.data[i].url}"><button class="btn-sm btn-secondary border-0">Download</button></a>`;
                    li.innerHTML = content;
                    download_items.append(li);
                }
            }
            else {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.classList.add('w-75');
                li.classList.add('d-flex');
                li.classList.add('justify-content-center');
                li.innerHTML = 'No downloads yet';
                download_items.append(li);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function saveData() {
    if (isEmpty) {
        items.replaceChildren();
    }
    axios.post('http://localhost:4000/add-expense', { itemname: itemname.value, description: description.value, amount: amount.value, category: category.value, img_src: src }, { headers: { "Authorization": token } })
        .then((res) => {
            isEmpty = false;
            getData();
        })
        .catch(err => console.log(err));
}

function getData(page_no) {
    let page = 1;
    let items_per_page = 5;
    if (localStorage.getItem('items_per_page')) {
        items_per_page = localStorage.getItem('items_per_page');
        document.getElementById('items_per_page').value = localStorage.getItem('items_per_page');
    }
    if (page_no) {
        page = page_no;
    }
    axios.get(`http://localhost:4000/get-expenses?page=${page}&items_per_page=${items_per_page}`, { headers: { "Authorization": token } })
        .then(res => {
            if (!res.data.isPremium) {
                buy_premium.style.display = 'block';
                account_type.style.display = 'none';
                leaderboard_btn.style.display = 'none';
                report_btn.style.display = 'none';
                document.getElementById('download_div').style.display = 'none';
            }
            else {
                buy_premium.style.display = 'none';
                account_type.style.display = 'block';
                leaderboard_btn.style.display = 'block';
                report_btn.style.display = 'block';
                document.getElementById('download_div').style.display = 'block';
            }
            if (res.data.result.length > 0) {
                items.replaceChildren();
                isEmpty = false;
                for (let i = 0; i < res.data.result.length; i++) {
                    showOnScreen(res.data.result[i].name, res.data.result[i].description, res.data.result[i].amount, res.data.result[i].category, res.data.result[i].img_src, res.data.result[i].id, res.data.total);
                }
                showPaginationButtons1(res);
            }
            else {
                isEmpty = true;
                total_spent.innerHTML = "0.00"
                items.innerHTML = `<tr><td class="no_expenses_td">No expenses yet!</td></tr>`;
            }
        })
        .catch(err => console.log(err));
}

function findSource() {
    switch (category.value) {
        case "food":
            src = 'https://raw.githubusercontent.com/hrithikbagauli/Practice-repo/ee9743978abdf117ac0d7083783820962f2f217f/food.png';
            break;
        case "entertainment":
            src = 'https://raw.githubusercontent.com/hrithikbagauli/Practice-repo/ee9743978abdf117ac0d7083783820962f2f217f/entertainment.png';
            break;
        case "bill":
            src = 'https://raw.githubusercontent.com/hrithikbagauli/Practice-repo/ee9743978abdf117ac0d7083783820962f2f217f/bill.png';
            break;
        case "travel":
            src = 'https://raw.githubusercontent.com/hrithikbagauli/Practice-repo/de86d3abbde17a07d52968f59e7c2f3cf3aa00dc/travel.png';
            break;
        case "shop":
            src = 'https://raw.githubusercontent.com/hrithikbagauli/Practice-repo/ee9743978abdf117ac0d7083783820962f2f217f/shop.png';
            break;
        case "fuel":
            src = 'https://raw.githubusercontent.com/hrithikbagauli/Practice-repo/ee9743978abdf117ac0d7083783820962f2f217f/fuel.png';
            break;
    }
}

report_btn.addEventListener('click', function (e) {
    e.preventDefault();
    report_btn.innerHTML = 'Refresh report';
    report_div.style.display = 'block';
    showReport('Daily', 1);
})

reportbtn_div.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('reportbtn')) {
        showReport(e.target.textContent, 1);
    }
})

for (let i = 0; i < pagination_div.children.length; i++) {
    pagination_div.children[i].addEventListener('click', function (e) {
        e.preventDefault();
        showReport('Yearly', parseInt(pagination_div.children[i].value));
    });
}

for (let i = 0; i < pagination_div1.children.length; i++) {
    pagination_div1.children[i].addEventListener('click', function (e) {
        e.preventDefault();
        getData(parseInt(pagination_div1.children[i].value));
    });
}

function showReport(type, page_no) {
    axios.get(`http://localhost:4000/purchase/get-report?reportType=${type}&page=${page_no}`, { headers: { "Authorization": token } })
        .then(res => {
            report_table.replaceChildren();
            if (res.data.result.length > 0) {
                let content =
                    `<tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Expense</th>
                    </tr>`
                const tr = document.createElement('tr');
                tr.innerHTML = content;
                report_table.append(tr);
                for (let i = 0; i < res.data.result.length; i++) {
                    const tr = document.createElement('tr');

                    let content =
                        `<td>${res.data.result[i].createdAt.slice(0, 10)}</td>
                        <td>${res.data.result[i].name}</td>
                        <td>${res.data.result[i].description}</td>
                        <td>${res.data.result[i].category}</td>
                        <td>${res.data.result[i].amount}</td>`
                    tr.innerHTML = content;
                    report_table.append(tr);
                }
                if (type == 'Yearly') {
                    showPaginationButtons(res);
                    pagination_div.style.visibility = 'visible';
                }
                else {
                    pagination_div.style.visibility = 'hidden';
                }
            }
            else {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td class="text-center fw-bold"> No expenses so far! </td>`;
                report_table.append(tr);
            }
        })
        .catch(err => console.log(err));

}

download_report.addEventListener('click', async function (e) {
    e.preventDefault();
    const download = await axios.get('http://localhost:4000/purchase/download', { headers: { "Authorization": token } });
    window.location.href = download.data.fileUrl;
})

function showPaginationButtons(res) {
    const first_page = pagination_div.children[0];
    const previous_page = pagination_div.children[1];
    const current_page = pagination_div.children[2];
    const next_page = pagination_div.children[3];
    const last_page = pagination_div.children[4];

    current_page.value = res.data.currentPage;
    current_page.textContent = res.data.currentPage;
    if (res.data.currentPage != 1 && res.data.previousPage != 1) {
        first_page.style.display = "inline";
    }
    else {
        first_page.style.display = "none";
    }
    if (res.data.hasPreviousPage) {
        previous_page.value = res.data.previousPage;
        previous_page.style.display = "inline";
    }
    else {
        previous_page.style.display = "none";
    }
    if (res.data.hasNextPage) {
        next_page.value = res.data.nextPage;
        next_page.style.display = "inline";
    }
    else {
        next_page.style.display = "none";
    }

    if (res.data.lastPage != res.data.currentPage && res.data.lastPage != res.data.nextPage) {
        last_page.value = res.data.lastPage;
        last_page.style.display = "inline";
    }
    else {
        last_page.style.display = "none";
    }
}

function showPaginationButtons1(res) {
    const first_page = pagination_div1.children[0];
    const previous_page = pagination_div1.children[1];
    const current_page = pagination_div1.children[2];
    const next_page = pagination_div1.children[3];
    const last_page = pagination_div1.children[4];

    current_page.value = res.data.currentPage;
    current_page.textContent = res.data.currentPage;
    if (res.data.currentPage != 1 && res.data.previousPage != 1) {
        first_page.style.display = "inline";
    }
    else {
        first_page.style.display = "none";
    }
    if (res.data.hasPreviousPage) {
        previous_page.value = res.data.previousPage;
        previous_page.style.display = "inline";
    }
    else {
        previous_page.style.display = "none";
    }
    if (res.data.hasNextPage) {
        next_page.value = res.data.nextPage;
        next_page.style.display = "inline";
    }
    else {
        next_page.style.display = "none";
    }

    if (res.data.lastPage != res.data.currentPage && res.data.lastPage != res.data.nextPage) {
        last_page.value = res.data.lastPage;
        last_page.style.display = "inline";
    }
    else {
        last_page.style.display = "none";
    }
}