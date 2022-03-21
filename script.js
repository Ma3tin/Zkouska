window.onload = () => {
    let table = document.getElementById("table")
    table.innerText = ""
    fetch("http://164.92.142.211/78ed3834-66d7-4b50-a53f-b3db8b345afc/Invoices").then(response => response.json()).then(data => {
        console.log(data)
        let saveChanges = document.getElementById("saveChanges")
        let inputName = document.getElementById("name")
        let inputAmmount = document.getElementById("ammount")
        saveChanges.addEventListener("click", () => {
            addInvoice(inputName.value, inputAmmount.value)
        })
        let paid = document.getElementById("paid")
        paid.innerText += paidInvoices(data)
        let unPaid = document.getElementById("unpaid")

        unPaid.innerText += unPaidInvoices(data)

        for (let i = 0; i < data.length; i++) {
            console.log(!data[i].paid)
            let li = document.createElement("li")
            li.innerHTML = `
            <span class="flex-grow-1 w-100">${data[i].to}</span>
            <span class="flex-grow-1 w-100">${data[i].amount + ",-"}</span>
            
            `
            let inputCheckBox = document.createElement("input")
            inputCheckBox.className = " mx-3"
            inputCheckBox.checked = !data[i].paid;
            inputCheckBox.setAttribute("type", "checkbox");
            inputCheckBox.addEventListener("change", () => {
                setPaid(data[i].id, !data[i].paid)
            })
            let deleteButton = document.createElement("button")
            deleteButton.innerText = "Delete"
            deleteButton.className = "btn btn-danger"
            deleteButton.addEventListener("click", () => {
                deleteInvoice(data[i].id)
                window.location.reload()
            })
            li.appendChild(deleteButton)
            li.appendChild(inputCheckBox)
            li.className = "list-group-item d-flex flex-grow-1"
            table.appendChild(li)

        }
    })
}

function addInvoice(to, amount) {
    let data = {
        to: to,
        amount: amount
    }
    console.log(data)
    fetch("http://164.92.142.211/78ed3834-66d7-4b50-a53f-b3db8b345afc/Invoices", {
        method: "POST", headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

    }).then(res => res.json()).then(data => {
        window.location.reload()
    })

}

function deleteInvoice(id) {
    fetch("http://164.92.142.211/78ed3834-66d7-4b50-a53f-b3db8b345afc/Invoices/" + id, {
        method: "DELETE", headers: {
            "Content-Type": "application/json",
        },
    })
}

function setPaid(id, isPaid) {
    let data = {
        "paid": isPaid
    }
    fetch("http://164.92.142.211/78ed3834-66d7-4b50-a53f-b3db8b345afc/Invoices/" + id + "/Paid", {
        method: "POST", headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(data => {
        window.location.reload()
    })
}

function paidInvoices(data) {
    let paidInvoices = 0
    for (let i = 0; i < data.length; i++) {
        if (!data[i].paid) paidInvoices+= data[i].amount
    }
    return paidInvoices
}

function unPaidInvoices(data) {
    let unPaidInvoices = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].paid) unPaidInvoices+= data[i].amount
    }
    return unPaidInvoices
}