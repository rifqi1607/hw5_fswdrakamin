const studentData = []

function formValidation() {
    const inputName = document.getElementById("name")
    const inputAge = document.getElementById("age")
    const inputMoney = document.getElementById("money")

    if (inputName.value.length < 10) {
        message = "Nama Minimum 10 Karakter"
    } else if (inputAge.value < 25) {
        message = "Umur Minimum 25 Tahun"
    } else if (inputMoney.value < 100000 || inputMoney.value > 1000000) {
        message = "Uang Saku Minimum Rp 10000 dan Maksimum Rp 1000000"
    } else {
        return true
    }
}

function submitData() {

    return new Promise((success, failed) => {
        if (formValidation() !== true) {
            failed(alert(message))
            return false;
        } else {
            const inputName = document.getElementById("name")
            const inputAge = document.getElementById("age")
            const inputMoney = document.getElementById("money")

            let dataRegister = {
                nama : inputName.value,
                umur : +inputAge.value,
                uangSaku : +inputMoney.value
            }
            
            setTimeout(() => {
                success(
                    studentData.push(dataRegister))
            }, 2000)

            console.log(dataRegister)

            alert("Data sukses ditambahkan")

            inputName.value = ""
            inputAge.value = ""
            inputMoney.value = ""
        }
    })
    
}

async function showData() {

    try {
        await submitData();
        const tr = document.createElement("tr")
        const td1 = tr.appendChild(document.createElement("td"));
        const td2 = tr.appendChild(document.createElement("td"));
        const td3 = tr.appendChild(document.createElement("td"));

        for (let i = 0; i < studentData.length; i++) {
                
                td1.innerHTML=studentData[i].nama;
                td2.innerHTML=studentData[i].umur;
                td3.innerHTML=studentData[i].uangSaku;
                
                document.getElementById("tbl").appendChild(tr);
        }

        const avgAge = new Average(studentData)
        const avgMoney = new Average(studentData)

        console.log(avgAge.getAvgAge())
        console.log(avgMoney.getAvgMoney())

        document.getElementById("summary").innerHTML = "Rata rata pendaftar memiliki uang sangu sebesar Rp "+avgMoney.getAvgMoney()+" dengan rata rata umur "+avgAge.getAvgAge()+" tahun.";
        
    } catch (error) {
        console.log(message);
    }
    
}

class Average {
    arr = []
    constructor(array){
        this.arr = array
    }

    getAvgAge() {
        let total = 0;
        for(let i = 0; i < this.arr.length; i++) {
        total += this.arr[i].umur;
        }
        return total / this.arr.length
    }

    getAvgMoney() {
        let total = 0;
        for(let i = 0; i < this.arr.length; i++) {
        total += this.arr[i].uangSaku;
        }
        return total / this.arr.length
    }
}


