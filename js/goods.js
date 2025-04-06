document.addEventListener("DOMContentLoaded", function () {
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: "#hero",
        triggerHook: 0.5,
        duration: "50%"
    })
        .setTween(TweenMax.to("#hero h1", 1, { opacity: 1, y: -20 }))
        .addTo(controller);
    var wrapper = document.querySelector(".laptop-wrapper");
    var img = document.getElementById("scroll-image");
    var maxShift = img.clientWidth - wrapper.clientWidth;
    new ScrollMagic.Scene({
        triggerElement: "#laptop-section",
        triggerHook: 0.5,
        duration: wrapper.parentNode.offsetHeight
    })
        .on("progress", function (e) {
            if (e.progress > 0.5) img.style.transform = "translateX(-" + maxShift + "px)";
            else img.style.transform = "translateX(0)";
        })
        .addTo(controller);
});