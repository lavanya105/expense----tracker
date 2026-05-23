let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

const list =
document.getElementById("list");

function addTransaction(){

  const text =
  document.getElementById("text").value;

  const amount =
  Number(document.getElementById("amount").value);

  const type =
  document.getElementById("type").value;

  if(text === "" || amount === 0){

    alert("Enter valid data");

    return;
  }

  const transaction = {
    text,
    amount,
    type
  };

  transactions.push(transaction);

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

  showTransactions();
}

function showTransactions(){

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((item,index)=>{

    const li =
    document.createElement("li");

    li.innerHTML = `
      ${item.text} - ₹${item.amount}

      <button onclick="deleteTransaction(${index})">
      X
      </button>
    `;

    list.appendChild(li);

    if(item.type === "income"){
      income += item.amount;
    }

    else{
      expense += item.amount;
    }

  });

  document.getElementById("income").innerText =
  "₹" + income;

  document.getElementById("expense").innerText =
  "₹" + expense;

  document.getElementById("balance").innerText =
  "₹" + (income - expense);

  updateChart(income,expense);
}

function deleteTransaction(index){

  transactions.splice(index,1);

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );

  showTransactions();
}

let chart;

function updateChart(income,expense){

  const ctx =
  document.getElementById("myChart");

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx,{

    type:'pie',

    data:{
      labels:['Income','Expense'],

      datasets:[{
        data:[income,expense],

        backgroundColor:['green','red']
      }]
    }
  });
}

showTransactions();