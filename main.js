let forma = document.querySelector('#forma') 
let select = document.querySelector('.select-field')
let description = document.querySelector('.textarea-field')
let inputAmount = document.querySelector('.amount')
let btnSubmit = document.querySelector('.submit')
let divRow = document.querySelector('.row')
let divCol_1= document.querySelector('.col-1')
let divCol_2= document.querySelector('.col-2')
let tableIncome = document.querySelector('.table-income')
let tableExpense = document.querySelector('.table-expense')
let totalIncome = document.querySelector('.container-income')
let totalExpense = document.querySelector('.container-expense')
let budget = document.querySelector('.current-budget')

let arrIncome = []
let arrExpense = []

// USLOV
const isValid = (opis,iznos) => description.value != ''
                            && !isNaN(inputAmount.value)
                            && inputAmount.value > 0
                            
// Ubacivanje u tabelu PRIHODI

const addToDomIncome = obj =>{
    const usFormatter = new Intl.NumberFormat("en-US")//formatiranje brojeva

    let tBody = document.createElement('tbody')
    let trHover = document.createElement('tr')
    trHover.className ='tr-hover'

    let td1 = document.createElement('td')
    td1.className ='td-income'
    td1.textContent = description.value

    let td2 = document.createElement('td')
    td2.className ='td-income-amount'
    td2.textContent =`${select.value} ${usFormatter.format(inputAmount.value)}`

    let td3 = document.createElement('td')
    let btnDel = document.createElement('button')
    btnDel.className = 'btn-del'
    btnDel.innerHTML='<i class="fas fa-times"></i>'

    btnDel.addEventListener('click',()=>{
    trHover.remove()
    arrIncome.splice(arrIncome.indexOf(obj),1)

    addToDomBudget(arrIncome,arrExpense)
    addToDomTotalIncome(arrIncome)
    addToDomTotalExpense(arrIncome,arrExpense)

    })

    td3.appendChild(btnDel)
    trHover.append(td1,td2,td3)
    tBody.appendChild(trHover)
    tableIncome.appendChild(tBody)

    addToDomBudget(arrIncome,arrExpense)
    addToDomTotalIncome(arrIncome)
    addToDomTotalExpense(arrIncome,arrExpense)

}

// Ubacivanje u tabelu RASHODI

const addToDomExpense = (obj) =>{
    let tInc = total(arrIncome)

    const usFormatter = new Intl.NumberFormat("en-US")
    let tBody = document.createElement('tbody')
    let trHover = document.createElement('tr')
    trHover.className ='tr-hover'
    
    let td1 = document.createElement('td')
    td1.className ='td-expense'
    td1.textContent = description.value
    
    let td2 = document.createElement('td')
    td2.className ='td-expense-amount'
    td2.innerHTML =`${select.value} ${usFormatter.format(inputAmount.value)}<span>${Math.round((inputAmount.value/tInc)*100)}%</span>`
    //U spanu sam ostavila formulu za procente, znam da ne radi

    let td3 = document.createElement('td')
    let btnDel = document.createElement('button')
    btnDel.className = 'btn-del'
    btnDel.innerHTML='<i class="fas fa-times"></i>'
    
    btnDel.addEventListener('click',()=>{
        trHover.remove()
        arrExpense.splice(arrExpense.indexOf(obj),1)
        addToDomBudget(arrIncome,arrExpense)
        addToDomTotalIncome(arrIncome)
        addToDomTotalExpense(arrIncome,arrExpense)
    })
    
    td3.appendChild(btnDel)
    trHover.append(td1,td2,td3)
    tBody.appendChild(trHover)
    tableExpense.appendChild(tBody)

    addToDomBudget(arrIncome,arrExpense)
    addToDomTotalExpense(arrIncome,arrExpense)
    addToDomTotalIncome(arrIncome)
}


//Sabiranje iznosa 
const total = array => {
    let sum = 0;
       for (i = 0; i < array.length;i++) {
           sum += array[i].iznos;
       }
       return sum
}

// Dodavanje u DOM - ukupan prihod

const addToDomTotalIncome = array =>{
    const usFormatter = new Intl.NumberFormat("en-US")
    let totalSum = total(array)
    totalIncome.innerHTML = `
                        <h3>PRIHOD</h3>
                        <span>+ ${usFormatter.format(totalSum)}</span>`
} 

//Dodavanja u DOM - ukupan rashod

const addToDomTotalExpense = (arr1,arr2) =>{
    const usFormatter = new Intl.NumberFormat("en-US")
    let totalSum = total(arr2)
    let percentages = totalPercentages(arr1,arr2)
    totalExpense.innerHTML = `
                            <h3>RASHOD</h3>
                            <span class="percent"> ${percentages} % </span>   
                            <span> - ${usFormatter.format(totalSum)}</span>
                            `
}

// Izračunavanje ukupnog budžeta

const totalBudget = (arr1,arr2) =>{
    let totalInc = total(arr1)
    let totalExp = total(arr2)
    let sum = totalInc - totalExp
    return sum
}

// Dodavanje u DOM - budžet

const addToDomBudget = (arr1,arr2) =>{

    const usFormatter = new Intl.NumberFormat("en-US")  
    let totalBudget1 = totalBudget(arr1,arr2)
    budget.innerHTML=`<h3>Dostupan budžet u Novembru 2019:</h3>
                      <span>${usFormatter.format(totalBudget1)}</span>`
}

// Izračunavanje procenta ukupnog Rashoda

  const totalPercentages = (arr1,arr2)=>{
    let totalExp = total(arr2) 
    let totalInc = total(arr1)

     if(totalInc !== 0 && totalExp !== Infinity){
        let percentages = Math.round((totalExp/totalInc)*100)
        return percentages  
     }
     else {
         return ""
     }
  }

// Izračunavanje procenta u tabeli - Rashodi
//Ovo treba da primenim u redu 82, ali nisam ni sigurna da sam dobro napisala funkciju

// const percentagesExp = (obj,arr1) => {
//     let inpExp = inputAmount.value
//     let tInc = total(arr1)
//     let percentExp = Math.round((inpExp /tInc)*100)
//    return percentExp
// }

forma.addEventListener('submit',(event)=>{
    event.preventDefault()

    let obj = {

    opis: description.value.trim(),
    iznos:Number(inputAmount.value.trim())
    }

if(isValid(description.value,inputAmount.value) && select.value === '+'){
    addToDomIncome(obj)
    arrIncome.push(obj)
    console.log(arrIncome) 

    addToDomBudget(arrIncome,arrExpense)
    addToDomTotalIncome(arrIncome)
    addToDomTotalExpense(arrIncome,arrExpense)

}
else if(isValid(description.value,inputAmount.value) && select.value === '-'){
    addToDomExpense(obj)
    arrExpense.push(obj)
    console.log(arrExpense)

    addToDomBudget(arrIncome,arrExpense) 
    addToDomTotalExpense(arrIncome,arrExpense)
}
else{
window.alert('Sva polja moraju biti popunjena. Iznos ne sme biti manji od 0!')
}

description.value = ''
inputAmount.value = ''
})

