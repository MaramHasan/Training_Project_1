 document.addEventListener("DOMContentLoaded", function () {
        var controller = new ScrollMagic.Controller();

        new ScrollMagic.Scene({
            triggerElement: "#hero",
            triggerHook: 0.5,
            duration: "50%"
        })
            .setTween(TweenMax.to("#hero h1", 1, { opacity: 1, y: -20 }))
            .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#laptop-section",
            triggerHook: 0.5,
            duration: document.querySelector("#laptop-section").offsetHeight
        })
            .on("progress", function (e) {
                var image = document.getElementById("scroll-image");
                if (e.progress > 0.5) {
                    image.setAttribute("src", "images/laptop2.png");
                } else {
                    image.setAttribute("src", "images/laptop.png");
                }
            })
            .addTo(controller);
    });
