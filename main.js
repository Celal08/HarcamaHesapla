//bütün inputları çekmek
const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");



formBtn.addEventListener('click', addExpense);
list.addEventListener('click', handleClick);
selectFilter.addEventListener('change', handleFilter);

let total = 0;

function updateTotal(price) {
    //total değer ve girilen değeri toplama
    total += Number(price);
    // console.log(price)
    totalInfo.textContent = total;

}
//gider oluşturma
function addExpense(e) {
    e.preventDefault()
    // console.log('tıklandı')
    // console.log(spendingInput.value,priceInput.value)
    if (!priceInput.value || !spendingInput.value) {
        alert("Lütfen değer giriniz!")
        return;
    }

    //1(kullanıcı veri girdiğinde ve ekle dediğinde div oluştur
    const spendingDiv = document.createElement("div");

    if (statusCheck.checked) {
        spendingDiv.classList.add("payed");
    }

    //2(clas ekleme
    spendingDiv.classList.add("spending")

    //içeriğini ayarlama
    spendingDiv.innerHTML = `<h2>${spendingInput.value} = </h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="payment.png" alt="">
        <img id="remove" src="delete.png" alt="">
    </div>`
    //listeye eleman ekleme
    list.appendChild(spendingDiv);
    //toplamı güncelle
    updateTotal(priceInput.value);

    spendingInput.value = "";
    priceInput.value = "";
}
function handleClick(e) {
    const element = e.target;
    // console.dir(element)

    if (element.id === "remove") {
        //parentElement tıklanılan elemanın kapsayıcısına ulaşma
        //kapsayıcının kapsayıcısı
        const wrappper = element.parentElement.parentElement

        //silinen elemanın fiyatını alma
        const deletedPrice = wrappper.querySelector("#value").innerText;
        Number(deletedPrice.innerText);

        //silinen elemanın fiyatını toplamdan çıkarmak
        //update total i güncellemek
        updateTotal(-Number(deletedPrice))

        //Kapsayıcıyı kaldır
        wrappper.remove()
    }


}

//filtreleme işlemleri
function handleFilter(e) {
    console.log(e.target.value)
    //childNodes : parentElement elementin tersine kapsayıcıya doğru değil de elemana doğru ilerleme
    const items = list.childNodes;
    items.forEach((item) => {
        switch (e.target.value) {
            case 'all':
                item.style.display = "flex";
                break;
            case 'payed':
                //yanlızca clasında payed olanlar silinsin
                if (!item.classList.contains("payed")) {
                    item.style.display = "none"
                } else {
                    item.style.display = "flex"
                }
                break;
                case"not-payed" :
                if (item.classList.contains("payed")) {
                    item.style.display ="none"
                }else{
                    item.style.display="flex"
                    
                }
                break;


        }
    }

    )
}