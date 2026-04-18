// SKill JS

document.addEventListener("DOMContentLoaded", function(){

    const buttons = document.querySelectorAll(".skill-btn");
    const skillGroups = document.querySelectorAll(".skill-group");
    const skillImages = document.querySelectorAll(".skill-img");

    buttons.forEach(button => {

        button.addEventListener("click", function(){

            const target = this.getAttribute("data-target");

            /* ---------- BUTTON ACTIVE ---------- */
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            /* ---------- LEFT SKILL GROUP ---------- */
            skillGroups.forEach(group => {
                group.classList.remove("active");
            });

            const activeGroup = document.querySelector("." + target);
            if(activeGroup){
                activeGroup.classList.add("active");
            }

            /* ---------- RIGHT IMAGE ---------- */
            skillImages.forEach(img => {

                img.classList.remove("active");

                if(img.getAttribute("data-img") === target){
                    img.classList.add("active");
                }

            });

        });

    });

});


// Testimonial JS

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".test-track");
    const cards = document.querySelectorAll(".test-card");
    const images = document.querySelectorAll(".user-img");
    const dots = document.querySelectorAll(".dot");

    const prevBtn = document.getElementById("prevbtn");
    const nextBtn = document.getElementById("nextbtn");

    let index = 0;
    const totalSlides = cards.length;


    /* ---------- UPDATE SLIDER ---------- */
    function updateSlider() {

        /* Slide testimonial */
        track.style.transform =
            `translateX(-${index * 100}%)`;

        /* Image Change */
        images.forEach(img =>
            img.classList.remove("active")
        );
        images[index].classList.add("active");

        /* Dot Change */
        dots.forEach(dot =>
            dot.classList.remove("active")
        );
        dots[index].classList.add("active");

        /* Arrow Disable */
        if(index === 0){
            prevBtn.classList.remove("active");
        } else {
            prevBtn.classList.add("active");
        }

        if(index === totalSlides - 1){
            nextBtn.classList.remove("active");
        } else {
            nextBtn.classList.add("active");
        }
    }


    /* ---------- NEXT ---------- */
    nextBtn.addEventListener("click", () => {

        if(index < totalSlides - 1){
            index++;
            updateSlider();
        }

    });


    /* ---------- PREVIOUS ---------- */
    prevBtn.addEventListener("click", () => {

        if(index > 0){
            index--;
            updateSlider();
        }

    });


    /* ---------- DOT CLICK ---------- */
    dots.forEach((dot, i) => {

        dot.addEventListener("click", () => {
            index = i;
            updateSlider();
        });

    });


    /* Initial Load */
    updateSlider();

    if (window.innerWidth <= 1024) {

    let startX = 0;
    let endX = 0;

    const sliderArea = document.querySelector(".test-bottom");

    let isSwiping = false;

sliderArea.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

sliderArea.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

sliderArea.addEventListener("touchend", (e) => {

    /* ❌ Ignore if user tapped button */
    if (e.target.closest("#prevbtn, #nextbtn")) {
        isSwiping = false;
        return;
    }

    let diff = startX - endX;

    if (Math.abs(diff) > 50 && isSwiping) {

        if (diff > 0 && index < totalSlides - 1) {
            index++;
        } else if (diff < 0 && index > 0) {
            index--;
        }

        updateSlider();
    }

    isSwiping = false;
});

}
    

});

// Side Nav Bar & Hamburger Show & Hide JS 

document.addEventListener("DOMContentLoaded", () => {

const menu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelectorAll(".side-nav a");
const allLinks = document.querySelectorAll(".service_list_header a, .service_list_header1 a");
const navbar = document.querySelector(".top-nav");



allLinks.forEach(link => {

link.addEventListener("click", function(){

allLinks.forEach(l => l.classList.remove("active"));

const target = this.getAttribute("href");

document.querySelectorAll(`a[href="${target}"]`)
.forEach(el => el.classList.add("active"));

});

});

navLinks.forEach(link => {

link.addEventListener("click", function(){

// remove active from all
navLinks.forEach(item => item.classList.remove("active"));

// set active to clicked
this.classList.add("active");

// close menu
menu.classList.remove("show");
overlay.classList.remove("show");
hamburger.classList.remove("active");
document.body.classList.remove("no-scroll");

});

});

let lastScroll = 0;
window.addEventListener("scroll", () => {

    if(menu.classList.contains("show")) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 10) {
        navbar.classList.remove("hide");
        navbar.classList.remove("solid");
        return;
    }

    if (currentScroll > lastScroll) {
        navbar.classList.add("hide");
    } 
    else {
        navbar.classList.remove("hide");
        navbar.classList.add("solid");
    }

    lastScroll = currentScroll;

});

let scrollPosition = 0;

function toggleMenu(e){
    if(e) e.preventDefault();

    const isOpen = menu.classList.contains("show");

    if(!isOpen){

        // open menu
        document.body.classList.add("no-scroll");

        navbar.classList.remove("hide");
        navbar.classList.add("solid");

    } else {

        // close menu
        document.body.classList.remove("no-scroll");

    }

    menu.classList.toggle("show");
    overlay.classList.toggle("show");
    hamburger.classList.toggle("active");
}

window.toggleMenu = toggleMenu;

overlay.addEventListener("click", closeMenu);

function closeMenu(){
    menu.classList.remove("show");
    overlay.classList.remove("show");
    hamburger.classList.remove("active");

    document.body.classList.remove("no-scroll");
    document.body.style.top = "";

    window.scrollTo(0, scrollPosition);
}

// close menu when clicking overlay
overlay.addEventListener("click", () => {

    menu.classList.remove("show");
    overlay.classList.remove("show");
    hamburger.classList.remove("active");

    document.body.classList.remove("no-scroll");

});

// close menu when screen becomes desktop
window.addEventListener("resize", () => {

    if(window.innerWidth > 1024){

        menu.classList.remove("show");
        overlay.classList.remove("show");
        hamburger.classList.remove("active");

      

    }

});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140; // navbar height offset
        const sectionHeight = section.offsetHeight;

        if(window.pageYOffset >= sectionTop &&
           window.pageYOffset < sectionTop + sectionHeight){

            current = section.getAttribute("id");
        }

    });

    // update both top and side nav
    allLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

});

// Schedule
// INIT EMAILJS
document.addEventListener("DOMContentLoaded", function () {

    // INIT EMAILJS
    emailjs.init("pyRNJu9mO2DsctRHw");

    const form = document.getElementById("scheduleForm");
    const submitBtn = document.getElementById("submitBtn");
    const inputs = document.querySelectorAll("#scheduleForm input, #scheduleForm textarea");

    // INITIAL STATE (IMPORTANT)
    submitBtn.disabled = true;

    // ENABLE BUTTON ONLY WHEN ALL FILLED
    function checkInputs() {
        let filled = true;

        inputs.forEach(field => {
            if (field.value.trim() === "") {
                filled = false;
            }
        });

        submitBtn.disabled = !filled;
    }

    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    // SUBMIT FORM
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        if (!form.checkValidity()) {
        form.reportValidity();
        return;
        }

        emailjs.send("service_jm00p1f", "template_we0swka", {
            from_name: document.getElementById("name").value,
            from_mobile: document.getElementById("mobile").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        })
        .then(function () {

        showSuccess();

        form.reset();

        // Reset button
        submitBtn.innerHTML = "SUBMIT";
        submitBtn.disabled = true;

    })
    .catch(function () {

        showError();

        // Enable again if failed
        submitBtn.disabled = false;
        submitBtn.innerHTML = "SUBMIT";

    });

});

    // SUCCESS POPUP
    function showSuccess() {
        const popup = document.getElementById("successPopup");
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2500);
    }

    // ERROR POPUP
    function showError() {
        const popup = document.getElementById("errorPopup");
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2500);
    }

});