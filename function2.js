const buttonClick = document.getElementsByClassName("seats_button");
let count = 0;
let count2 = 0;

for (let button of buttonClick) {
    button.addEventListener("click", function (event) {
        count++;
        count2 += 550;

        if (count === 4) {
            const couponApply = document.getElementById("apply_coupon");
            couponApply.removeAttribute("disabled");
        } else if (count > 4) {
            alert("One person can purchase 4 sets at a time");
            return;
        }
  
        let seatText = event.target.innerText;
        event.target.classList.add("bg-green-500");
        event.target.setAttribute("disabled", "text-red-700");
        const totalSeat = document.getElementById("total_seat").innerText;
        const totalSeatNumber = parseInt(totalSeat);
        const selectedItems = document.getElementById("items");
        const div = document.createElement("div");
        div.classList.add("flex", "justify-between", "total_added_items");
        const seats = document.createElement("h5");
        seats.innerText = seatText;
        div.appendChild(seats);
        const seat_class = document.createElement("h5");
        seat_class.innerText = "Economy";
        div.appendChild(seat_class);
        const price = document.createElement("h5");
        price.innerText = 550;
        div.appendChild(price);

        selectedItems.appendChild(div);

        setInnerText("total_seat", totalSeatNumber - 1);
        setInnerText("total_price", count2);
        setInnerText("count", count);
        setInnerText("total", count2);
        
    });
}

function applyCouponDiscount(discountPercentage) {
    let grandTotalText = document.getElementById("total").innerText;
    let grandTotalPrice = parseInt(grandTotalText) - (parseInt(grandTotalText) * discountPercentage) / 100;
    document.getElementById("total").innerText = grandTotalPrice;

    const couponArea = document.getElementById("coupon");
    couponArea.classList.add("hidden");
}

function calculateDiscount() {
    const applyCoupon = document.getElementById("coupon_text").value;
    if (applyCoupon === "NEW15") {
        applyCouponDiscount(15);
    } else if (applyCoupon === "Couple 20") {
        applyCouponDiscount(20);
    } else {
        alert("Please enter a valid coupon code");
        return;
    }
}

document.getElementById("number").addEventListener("keyup", function (event) {
    if (count > 0 && event.key) {
        document.getElementById("next").removeAttribute("disabled");
        document.getElementById("next").addEventListener("click", function () {
            const success_modal = document.getElementById("success");
            success_modal.classList.remove("hidden");
            const ticketBookingSection = document.getElementById("ticket_booking");
            ticketBookingSection.classList.add("hidden");
        });
    }
});

function setInnerText(id, value) {
    document.getElementById(id).innerText = value;
}