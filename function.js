
const seatBooking = {
    count: 0,
    totalPrice: 0,
    phoneNumberEntered: false,

    init: function() {
        const buttonClick = document.getElementsByClassName("seats_button");
        for (let button of buttonClick) {
            button.addEventListener("click", this.handleSeatSelection.bind(this));
        }

        document.getElementById("number").addEventListener("input", this.handlePhoneNumberInput.bind(this));
        document.getElementById("next").addEventListener("click", this.handleNextClick.bind(this));
        document.getElementById("apply_coupon").addEventListener("click", this.applyCoupon.bind(this));
        this.disableNextButton(); // Initially disable the next button
    },

    handleSeatSelection: function(event) {
        this.count++;
        this.totalPrice += 550;

        if (this.count === 4) {
            document.getElementById("apply_coupon").removeAttribute("disabled");
        } else if (this.count > 4) {
            alert("One person can purchase 4 sets at a time");
            return;
        }

        let seatText = event.target.innerText;
        event.target.classList.add("bg-green-500");
        event.target.setAttribute("disabled", "true");
        
        const selectedItems = document.getElementById("items");
        const div = document.createElement("div");
        div.classList.add("flex", "justify-between", "total_added_items");
        div.innerHTML = `
            <h5>${seatText}</h5>
            <h5>Economy</h5>
            <h5>550</h5>
        `;
        selectedItems.appendChild(div);

        this.updateTotals();
    },

    updateTotals: function() {
        document.getElementById("total_seat").innerText--;
        document.getElementById("total_price").innerText = this.totalPrice;
        document.getElementById("count").innerText = this.count;
        document.getElementById("total").innerText = this.totalPrice;

        // Enable next button if at least one seat has been booked and phone number entered
        if (this.count > 0 && this.phoneNumberEntered) {
            this.enableNextButton();
        }
    },

    handlePhoneNumberInput: function(event) {
        const phoneNumber = event.target.value.trim();
        this.phoneNumberEntered = phoneNumber.length > 0;

        // Enable next button if at least one seat has been booked and phone number entered
        if (this.count > 0 && this.phoneNumberEntered) {
            this.enableNextButton();
        } else {
            this.disableNextButton();
        }
    },

    handleNextClick: function() {
        const success_modal = document.getElementById("success");
        success_modal.classList.remove("hidden");
        const ticketBookingSection = document.getElementById("ticket_booking");
        ticketBookingSection.classList.add("hidden");
    },

    applyCoupon: function() {
        const applyCoupon = document.getElementById("coupon_text").value;
        let discountPercentage = 0;

        switch (applyCoupon) {
            case "NEW15":
                discountPercentage = 15;
                break;
            case "Couple 20":
                discountPercentage = 20;
                break;
            default:
                alert("Please enter a valid coupon code");
                return;
        }

        let grandTotalText = document.getElementById("total").innerText;
        let grandTotalPrice = parseInt(grandTotalText) - (parseInt(grandTotalText) * discountPercentage) / 100;
        document.getElementById("total").innerText = grandTotalPrice;

        const couponArea = document.getElementById("coupon");
        couponArea.classList.add("hidden");
    },

    disableNextButton: function() {
        document.getElementById("next").setAttribute("disabled", "true");
    },

    enableNextButton: function() {
        document.getElementById("next").removeAttribute("disabled");
    }
};

// Initialize seat booking functionality
seatBooking.init();
