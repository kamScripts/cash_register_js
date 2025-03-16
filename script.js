const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
const priceDisplay = document.getElementById('price-val');
const cashInDrawer = document.getElementById('change-drawer');

let price = 3.99;
let cid = [["PENNY", 1.01], 
  ["NICKEL", 2.05], 
  ["DIME", 3.1], 
  ["QUARTER", 4.25], 
  ["ONE", 90], 
  ["FIVE", 55], 
  ["TEN", 20], 
  ["TWENTY", 60], 
  ["ONE HUNDRED", 100]
];
const coinValue = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.10,
  'QUARTER': 0.25,
  'ONE': 1.00,
  'FIVE': 5.00,
  'TEN': 10.00,
  'TWENTY': 20.00,
  'ONE HUNDRED': 100.00
}

const displayArray = (arr, parent)=>{
  arr.forEach(element => {    
    addPara(`${element[0]}: $${element[1]}`, parent);
  });
}
const addPara = (content, parent)=>{
  const para = document.createElement('p');
  para.textContent = content;
  parent.appendChild(para);
}

const handleChange = (inDrawer) => {
  const receivedCash = parseFloat(cash.value) || 0;
  let transaction = parseFloat((receivedCash - price).toFixed(2));
  
  if (transaction < 0) {
    alert("Customer does not have enough money to purchase the item");
  } else if (transaction === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    changeDue.textContent = "";
    calculateChange(transaction, inDrawer);
    cashInDrawer.innerHTML = "";
    displayArray(cid, cashInDrawer);
    cash.value = '';
  }
};

const getTotalCash = (drawer) => 
  parseFloat(drawer.reduce((acc, value) => acc + value[1], 0).toFixed(2));

const calculateChange = (transaction, availableCash) => {
  // Calculate total cash in drawer
  let sumCid = getTotalCash(availableCash)

  // Check if there's enough cash in the drawer to cover the transaction
  if (transaction > sumCid) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let giveCash = []; // Stores the denominations and amounts to give as change
  let tempCid = structuredClone(availableCash); // Deep copy for clean calculation

  // Iterate through the cash drawer from highest to lowest denomination
  for (let i = tempCid.length - 1; i >= 0; i--) {
    let coinName = tempCid[i][0]; // Current denomination name
    let cashForCustomer = coinValue[coinName]; // Value of the current denomination
    let amountToGive = 0; // Tracks how much of this denomination to give

    // Deduct from the transaction as long as this denomination can be used
    while (transaction >= cashForCustomer && tempCid[i][1] > 0) {
      transaction = parseFloat((transaction - cashForCustomer).toFixed(2)); 
      tempCid[i][1] = parseFloat((tempCid[i][1] - cashForCustomer).toFixed(2));
      amountToGive = parseFloat((amountToGive + cashForCustomer).toFixed(2));
    }

    // If this denomination was used, add it to the change to give
    if (amountToGive > 0) {
      giveCash.push([coinName, amountToGive]);
    }
  }

  // If there's still some remaining transaction value, change is insufficient
  if (transaction > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  // "Status: CLOSED": if cash-in-drawer is equal to the change due.
  if (sumCid === parseFloat(
    (parseFloat(cash.value) - parseFloat(price)).toFixed(2))) {
    changeDue.textContent = "Status: CLOSED";    
    displayArray(giveCash, changeDue); // Display remaining values in descending order
    return;
}

  // Otherwise, display the calculated change and update the drawer state
  changeDue.textContent = "Status: OPEN";
  displayArray(giveCash, changeDue);
  availableCash.forEach((cash, index) => (cash[1] = tempCid[index][1]));
};

priceDisplay.textContent = price.toFixed(2);
displayArray(cid, cashInDrawer);

purchaseBtn.addEventListener("click", (e)=>{
  changeDue.textContent ='';
  
  handleChange(cid)});
  