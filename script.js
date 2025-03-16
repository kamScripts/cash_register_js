const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
const priceDisplay = document.getElementById('price-val');
const cashInDrawer = document.getElementById('change-drawer');

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
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

const handleChange = (inDrawer)=>{
  const recivedCash = parseFloat(cash.value) || 0
  const transaction = parseFloat((recivedCash - price).toFixed(2));
  
  
  if (transaction < 0) {
    alert("Customer does not have enough money to purchase the item")
  } else if (transaction === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    const cashDue = calculateChange(transaction, cid);
    addPara("Status: OPEN", changeDue);
    displayArray(cashDue, changeDue);
    cashInDrawer.innerHTML = "";
    displayArray(cid, cashInDrawer);
  }
};

const calculateChange=(transaction, availableCash)=>{

  sumCid = availableCash.reduce((acc, value)=> acc + value[1], 0);  
  let giveCash = [];
    
  if (transaction > sumCid) {
    addPara("Status: INSUFFICIENT_FUNDS", changeDue)
    return
  } 
  for (let i = availableCash.length-1; i >= 0; i--) {

    let coinName = availableCash[i][0];
    let cashForCustomer = coinValue[coinName]    
    let amountToGive = 0;

    while (transaction >= cashForCustomer && availableCash[i][1] > 0) {
      transaction = parseFloat((transaction - cashForCustomer).toFixed(2));
      availableCash[i][1] = parseFloat((availableCash[i][1] - cashForCustomer).toFixed(2));
      amountToGive = parseFloat((amountToGive + cashForCustomer).toFixed(2));
    }

    if (amountToGive > 0) {
      giveCash.push([coinName, amountToGive]);
    }
  }
  return giveCash
  
}

priceDisplay.textContent = price.toFixed(2);
displayArray(cid, cashInDrawer);
purchaseBtn.addEventListener("click", (e)=>{
  changeDue.textContent =''
  handleChange(cid)});