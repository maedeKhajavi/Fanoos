//start Login
const phoneInput = document.getElementById("phone");
let mask = null;
if (phoneInput) {
    mask = IMask(phoneInput, {
        mask: "0000 000 0000"
    });
}

const btnSub = document.getElementById("btnSub");
const page = document.getElementById("page");
if (btnSub && mask) {
    btnSub.addEventListener("click", (e) => {
        if(mask.unmaskedValue.length < 11) {
            e.preventDefault();
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "لطفاً شماره تلفن را به درستی وارد کنید."
            });
        }else{
            // Login, zoom to varify
            if (page) {
                e.preventDefault();
                page.classList.add("opacity-0");
                setTimeout(() => {
                    window.location.href = "Varify.html";
                }, 700);
            }
        }
    });
}
//end Login

//start Verify
const otpContainer = document.getElementById("otp-container");
if (otpContainer) {
    const inputs = document.querySelectorAll(".otp-input");
    const submitBtn = document.getElementById("btn-submit");
    const timer = document.getElementById("auth-timer");
    const resendBtn = document.getElementById("btn-resend");
    const resendLink = document.getElementById("refCode");

    inputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
            if (this.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        input.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && !this.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const otp = [...inputs].map(input => input.value).join("");
            if (otp.length !== inputs.length) {
                Swal.fire({
                    icon: "warning",
                    title: "کد ناقص است",
                    text: "لطفا تمام ارقام کد را وارد کنید."
                });
                return;
            }
            console.log("OTP:", otp);
        });
    }

    if (timer) {
        let time = 119;
        const countdown = setInterval(() => {
            const minutes = String(Math.floor(time / 60)).padStart(2, "0");
            const seconds = String(time % 60).padStart(2, "0");
            timer.textContent = `${minutes}:${seconds}`;
            if (time <= 0) {
                clearInterval(countdown);
                timer.textContent = "00:00";
                if (resendBtn) {
                    resendBtn.disabled = false;
                    resendBtn.classList.remove("opacity-50", "cursor-not-allowed");
                }
                if (resendLink) {
                    resendLink.classList.remove("hidden");
                }
            }
            time--;
        }, 1000);
    }
}
function refCode() {
    //اینجا هم ای پی آی و کدای پیامک 
}
//end varify 

// start mobileMenu
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileSidebar.classList.remove('translate-x-full');
        mobileSidebar.classList.add('translate-x-0');
        menuToggle.classList.add('hidden');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileSidebar.classList.remove('translate-x-0');
        mobileSidebar.classList.add('translate-x-full');
        menuToggle.classList.remove('hidden');
    });
}

document.addEventListener('click', (e) => {
    if (mobileSidebar && menuToggle) {
        if (!mobileSidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileSidebar.classList.remove('translate-x-0');
            mobileSidebar.classList.add('translate-x-full');
            menuToggle.classList.remove('hidden');
        }
    }
});
//i asked help for this part
document.querySelectorAll('.border-2').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.border-2').forEach(o => {
            o.classList.remove('border-[#4352A5]', 'bg-[#eef0fa]');
            o.classList.add('border-gray-200');
            const check = o.querySelector('.w-5');
        });
        this.classList.remove('border-gray-200');
        this.classList.add('border-[#4352A5]', 'bg-[#eef0fa]');
        const check = this.querySelector('.w-5');
        if (check) {
            check.classList.remove('border-gray-300');
            check.classList.add('bg-[#4352A5]', 'border-[#4352A5]');
        }
    });
});
// end MobileMenu

// start 504words
const Words = document.querySelector('#Words');
const ShowMeaning = document.querySelector('#ShowMeaning');
const Meaning = document.querySelector('#Meaning');
const ShowMean = document.querySelector('#ShowMean');

if (Words && Meaning && ShowMeaning && ShowMean) {
    ShowMeaning.addEventListener("click", () => {
        Words.classList.toggle("hidden");
        Meaning.classList.toggle("hidden");
    });

    ShowMean.addEventListener("click", () => {
        Words.classList.toggle("hidden");
        Meaning.classList.toggle("hidden");
    });
}
// end 504words

// start NewWords
    document.querySelector("#copyURL")?.addEventListener("click", copyURL);

    function copyURL() {
        const input = document.querySelector('input[value="https://fanoos.app/"]');
        navigator.clipboard.writeText(input.value);
        alert("لینکو کپی کردم برو حالشو ببر");
    }
// End NewWords