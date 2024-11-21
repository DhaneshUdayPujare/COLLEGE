document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector(".img");
    const zoom_image = document.querySelector(".zoom_image");
    const display = document.querySelector(".zoomImage");
    let divs = [];

    const btn_Pervious = document.querySelector(".privious");
    const btn_Next = document.querySelector(".next");
    const btn_Perv = document.querySelector(".priv");
    const btn_Nex = document.querySelector(".nex");
    const btn_close = document.querySelector(".close");

    let year_image = document.querySelector(".year_image");
    let position = 0;
    let pos = 0;

    // Close zoom display
    btn_close.addEventListener("click", () => {
        display.classList.remove("display");
        display.classList.add("none");
        divs.forEach(div => div.classList.remove("disabled"));
    });

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 3; i++) {
        const div = document.createElement("div");
        div.classList.add("rows");

        for (let j = 0; j < 4; j++) {
            const div1 = document.createElement("div");
            div1.classList.add("cols");
            div.appendChild(div1);
            divs.push(div1);
        }
        fragment.appendChild(div);
    }

    image.appendChild(fragment);

    function position_image(position) {
        zoom_image.src = `./images/image${position}.jpg`;
    }

    function lastYear_image(pos) {
        year_image.src = `./images/image${pos}.jpg`;
    }

    position_image(position);
    lastYear_image(pos);

    btn_Next.addEventListener("click", () => {
        position = (position + 1) % divs.length;
        position_image(position);
    });

    btn_Pervious.addEventListener("click", () => {
        position = (position - 1 + divs.length) % divs.length;
        position_image(position);
    });

    btn_Nex.addEventListener("click", () => {
        pos = (pos + 1) % divs.length;
        lastYear_image(pos);
    });

    setInterval(()=>{
        pos = (pos + 1) % divs.length;
        lastYear_image(pos);
    },4000)

    btn_Perv.addEventListener("click", () => {
        pos = (pos - 1 + divs.length) % divs.length;
        lastYear_image(pos);
    });

    for (let i = 0; i < 12; i++) {
        const img = document.createElement("img");
        img.src = `./images/image${i}.jpg`;
        img.classList.add("img1");
        divs[i].appendChild(img);
        divs[i].style.cursor = "pointer";
        img.style.width = "100%";
        img.style.height = "200px";
        img.style.objectFit = "cover";

        divs[i].addEventListener("click", () => {
            position = i;
            position_image(position);
            display.classList.remove("none");
            display.classList.add("display");
            divs.forEach(div => div.classList.add("disabled"));
        });
    }

    // Swipe handling logic
    let touchStartX = 0;
    let touchEndX = 0;

    function handleGesture() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left: Next image
            position = (position + 1) % divs.length;
            position_image(position);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right: Previous image
            position = (position - 1 + divs.length) % divs.length;
            position_image(position);
        }
    }

    // Attach swipe event listeners to the zoom display
    display.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    display.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    });
});
