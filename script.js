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

const displayArray = (arr)=>{
  arr.forEach(element => {    
    addPara(`${element[0]}: $${element[1]}`, cashInDrawer);
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
  console.log(recivedCash, transaction)
  
  if (transaction < 0) {
    alert("Customer does not have enough money to purchase the item")
  } else if (transaction === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    calculateChange(transaction, cid)
  }
};

const calculateChange=(transaction, availableCash)=>{
  sumCid = availableCash.reduce((acc, value)=> acc + value[1], 0);
  console.log(sumCid)
  if (transaction > sumCid) {
    return ""
  }
}

priceDisplay.textContent = price.toFixed(2);
displayArray(cid);
purchaseBtn.addEventListener("click", (e)=>{
  changeDue.textContent =''
  handleChange(cid)});