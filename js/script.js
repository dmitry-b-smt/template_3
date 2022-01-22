"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/Blackberry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_mobile');
} else {
    document.body.classList.add('_desktop');
};

const sliderTape = document.querySelectorAll('.goods__item');
const sliderTapeLength = sliderTape.length;

sliderTape.forEach(function (item, i) {
    let dataIndex = i;
    item.setAttribute("data-index", dataIndex);
});

let activeSlide = 0;

function defNextSlide(activeSlide) {
    if (activeSlide + 1 > sliderTapeLength - 1) {
        var nextSlide = 0;
    } else {
        var nextSlide = activeSlide + 1;
    };
    return nextSlide;
}
function defPreviousSlide(activeSlide) {
    if (activeSlide - 1 < 0) {
        var previousSlide = sliderTapeLength - 1;
    } else {
        var previousSlide = activeSlide - 1;
    }
    return previousSlide;
}
let nextSlide = defNextSlide(activeSlide);
let previousSlide = defPreviousSlide(activeSlide);

function getActiveSlide(activeSlide) {
    for (let slide of sliderTape) {
        if (Number(slide.dataset.index) === activeSlide && Number(slide.dataset.index) !== nextSlide && Number(slide.dataset.index) !== previousSlide) {
            slide.classList.add("active");
            slide.classList.remove("unactive");
            slide.classList.add("fade");
        } else {
            slide.classList.remove("active");
            slide.classList.add("unactive");
            slide.classList.remove("fade");
        };
    };
};

function getNextSlide(nextSlide) {
    for (let slide of sliderTape) {
        if (Number(slide.dataset.index) === nextSlide && Number(slide.dataset.index) !== activeSlide && Number(slide.dataset.index) !== previousSlide) {
            slide.classList.remove("move-right");
            slide.classList.remove("move-right-right");
            slide.classList.add("goods__item-next");
            slide.classList.add("move-left");
        } else {
            slide.classList.remove("goods__item-next");
            slide.classList.remove("move-left");
        };
    };
};

function getPreviousSlide(previousSlide) {
    for (let slide of sliderTape) {
        if (Number(slide.dataset.index) === previousSlide && Number(slide.dataset.index) !== activeSlide && Number(slide.dataset.index) !== nextSlide) {
            slide.classList.remove("move-right");
            slide.classList.remove("move-right-right");
            slide.classList.add("goods__item-prevoius");
            slide.classList.add("move-left-left");
        } else {
            slide.classList.remove("goods__item-prevoius");
            slide.classList.remove("move-left-left");
        };
    };
};

function getNextSlideLeft(nextSlide) {
    for (let slide of sliderTape) {
        if (Number(slide.dataset.index) === nextSlide && Number(slide.dataset.index) !== activeSlide && Number(slide.dataset.index) !== previousSlide) {
            slide.classList.remove("move-left");
            slide.classList.remove("move-left-left")
            slide.classList.add("goods__item-next");
            slide.classList.add("move-right-right");
        } else {
            slide.classList.remove("goods__item-next");
            slide.classList.remove("move-right-right");
        };
    };
};

function getPreviousSlideLeft(previousSlide) {
    for (let slide of sliderTape) {
        if (Number(slide.dataset.index) === previousSlide && Number(slide.dataset.index) !== activeSlide && Number(slide.dataset.index) !== nextSlide) {
            slide.classList.remove("move-left");
            slide.classList.remove("move-left-left")
            slide.classList.add("goods__item-prevoius");
            slide.classList.add("move-right");
        } else {
            slide.classList.remove("goods__item-prevoius");
            slide.classList.remove("move-right");
        };
    };
};

getActiveSlide(activeSlide);
getNextSlide(nextSlide);
getPreviousSlide(previousSlide);

const sliderButtonLeft = document.querySelector(".goods__slider-button-left");
const sliderButtonRight = document.querySelector(".goods__slider-button-right");

function moveSliderRight() {
    if (activeSlide >= sliderTapeLength - 1) {
        activeSlide = 0;
        defNextSlide(activeSlide);
        defPreviousSlide(activeSlide);
        nextSlide = defNextSlide(activeSlide);
        previousSlide = defPreviousSlide(activeSlide);
    } else {
        activeSlide += 1;
        defNextSlide(activeSlide);
        defPreviousSlide(activeSlide);
        nextSlide = defNextSlide(activeSlide);
        previousSlide = defPreviousSlide(activeSlide);
    };

    getActiveSlide(activeSlide);
    getNextSlide(nextSlide);
    getPreviousSlide(previousSlide);
}

function moveSliderLeft() {
    if (activeSlide <= 0) {
        activeSlide = sliderTapeLength - 1;
        defNextSlide(activeSlide);
        defPreviousSlide(activeSlide);
        nextSlide = defNextSlide(activeSlide);
        previousSlide = defPreviousSlide(activeSlide);
    } else {
        activeSlide -= 1;
        defNextSlide(activeSlide);
        defPreviousSlide(activeSlide);
        nextSlide = defNextSlide(activeSlide);
        previousSlide = defPreviousSlide(activeSlide);
    };
    getActiveSlide(activeSlide);
    getNextSlideLeft(nextSlide);
    getPreviousSlideLeft(previousSlide);
}

sliderButtonRight.addEventListener("click", moveSliderRight);
sliderButtonLeft.addEventListener("click", moveSliderLeft);

const items = document.querySelector(".goods__items");

function getObjectWidth(items) {
    var width = items.offsetWidth;
    return width;
};

let itemsWidth = getObjectWidth(items);
let slideTreshold = itemsWidth * 0.1232;

var coords = [];
items.addEventListener("pointermove", function (e) {

    items.addEventListener("pointerdown", function (e) {
        var x1 = e.clientX;
        coords.unshift(x1);
    });

    items.addEventListener("pointermove", function (e) {
        var x2 = e.clientX;
        coords.push(x2);
    })


})

items.addEventListener("pointerup", function () {
    var xF = coords[0];
    var xL = coords[coords.length - 1];

    var xRes = xF - xL;

    console.log("первая координата: ", xF, "вторая координата: ", xL);
    console.log("результат вычитания значения второй координаты из значения превой: ", xRes);

    if (xRes > 0 && Math.abs(xRes) >= slideTreshold) {
        moveSliderRight();
        console.log("moving slider right...");
    };
    if (xRes < 0 && Math.abs(xRes) >= slideTreshold) {
        moveSliderLeft();
        console.log("moving slider left...");
    };
    xF = 0;
    xL = 0;
})

const tabs = document.querySelectorAll(".giftset__tab");
const tabButtons = document.querySelectorAll(".giftset__button")

tabs.forEach(function (item, i) {
    let tabIndex = i;
    item.setAttribute("data-index", tabIndex);
});

tabButtons.forEach(function (item, i) {
    let buttonIndex = i;
    item.setAttribute("data-index", buttonIndex);
})

let activeTab = 0;
tabs.forEach(function (item) {
    if (Number(item.dataset.index) === activeTab) {
        item.classList.add('giftset__tab-active');
        item.classList.remove('giftset__tab-unactive');
    } else {
        item.classList.remove('giftset__tab-active');
        item.classList.add('giftset__tab-unactive');
    };
});
tabButtons.forEach(function (item) {
    if (Number(item.dataset.index) === activeTab) {
        item.classList.add('giftset__button-active-tab');
    } else {
        item.classList.remove('giftset__button-active-tab');
    };
});

const tabButtonsContainer = document.querySelector('.giftset__buttons');

tabButtonsContainer.addEventListener("click", function (e) {
    tabButtons.forEach(function (item) {
        item.classList.remove('giftset__button-active-tab');
    });
    let target = e.target;
    let compareIndex = target.dataset.index;
    tabs.forEach(function (item) {
        if (item.dataset.index === compareIndex) {
            item.classList.add('giftset__tab-active');
            item.classList.remove('giftset__tab-unactive');
            item.classList.add('tab-fade');
            target.classList.add('giftset__button-active-tab');
        } else {
            item.classList.remove('giftset__tab-active');
            item.classList.add('giftset__tab-unactive');
            item.classList.remove('tab-fade');
            target.classList.remove('giftset__buton-active-tab');
        };
    });
});



const sliderTapeCombo = document.querySelectorAll('.combo__item');
const sliderTapeComboLength = sliderTapeCombo.length;

sliderTapeCombo.forEach(function (item, i) {
    let dataIndex = i;
    item.setAttribute("data-index", dataIndex);
});

let activeComboSlide = 0;

function defNextComboSlide(activeComboSlide) {
    if (activeComboSlide + 1 > sliderTapeComboLength - 1) {
        var nextComboSlide = 0;
    } else {
        var nextComboSlide = activeComboSlide + 1;
    };
    return nextComboSlide;
}
function defPreviousComboSlide(activeComboSlide) {
    if (activeComboSlide - 1 < 0) {
        var previousComboSlide = sliderTapeComboLength - 1;
    } else {
        var previousComboSlide = activeComboSlide - 1;
    }
    return previousComboSlide;
}
let nextComboSlide = defNextComboSlide(activeComboSlide);
let previousComboSlide = defPreviousComboSlide(activeComboSlide);

function getActiveComboSlide(activeComboSlide) {
    for (let slide of sliderTapeCombo) {
        if (Number(slide.dataset.index) === activeComboSlide && Number(slide.dataset.index) !== nextComboSlide && Number(slide.dataset.index) !== previousComboSlide) {
            slide.classList.add("active");
            slide.classList.remove("unactive");
            slide.classList.add("fade");
        } else {
            slide.classList.remove("active");
            slide.classList.add("unactive");
            slide.classList.remove("fade");
        };
    };
};

function getNextComboSlide(nextComboSlide) {
    for (let slide of sliderTapeCombo) {
        if (Number(slide.dataset.index) === nextComboSlide && Number(slide.dataset.index) !== activeComboSlide && Number(slide.dataset.index) !== previousComboSlide) {
            slide.classList.remove("move-right");
            slide.classList.remove("move-right-right");
            slide.classList.add("combo__item-next");
            slide.classList.add("move-left");
        } else {
            slide.classList.remove("combo__item-next");
            slide.classList.remove("move-left");
        };
    };
};

function getPreviousComboSlide(previousComboSlide) {
    for (let slide of sliderTapeCombo) {
        if (Number(slide.dataset.index) === previousComboSlide && Number(slide.dataset.index) !== activeComboSlide && Number(slide.dataset.index) !== nextComboSlide) {
            slide.classList.remove("move-right");
            slide.classList.remove("move-right-right");
            slide.classList.add("combo__item-prevoius");
            slide.classList.add("move-left-left");
        } else {
            slide.classList.remove("combo__item-prevoius");
            slide.classList.remove("move-left-left");
        };
    };
};

function getNextComboSlideLeft(nextComboSlide) {
    for (let slide of sliderTapeCombo) {
        if (Number(slide.dataset.index) === nextComboSlide && Number(slide.dataset.index) !== activeComboSlide && Number(slide.dataset.index) !== previousComboSlide) {
            slide.classList.remove("move-left");
            slide.classList.remove("move-left-left")
            slide.classList.add("combo__item-next");
            slide.classList.add("move-right-right");
        } else {
            slide.classList.remove("combo__item-next");
            slide.classList.remove("move-right-right");
        };
    };
};

function getPreviousComboSlideLeft(previousComboSlide) {
    for (let slide of sliderTapeCombo) {
        if (Number(slide.dataset.index) === previousComboSlide && Number(slide.dataset.index) !== activeComboSlide && Number(slide.dataset.index) !== nextComboSlide) {
            slide.classList.remove("move-left");
            slide.classList.remove("move-left-left")
            slide.classList.add("combo__item-prevoius");
            slide.classList.add("move-right");
        } else {
            slide.classList.remove("combo__item-prevoius");
            slide.classList.remove("move-right");
        };
    };
};

getActiveComboSlide(activeComboSlide);
getNextComboSlide(nextComboSlide);
getPreviousComboSlide(previousComboSlide);

const sliderComboButtonLeft = document.querySelector(".combo__slider-button-left");
const sliderComboButtonRight = document.querySelector(".combo__slider-button-right");

function moveComboSliderRight() {
    if (activeComboSlide >= sliderTapeComboLength - 1) {
        activeComboSlide = 0;
        defNextComboSlide(activeComboSlide);
        defPreviousComboSlide(activeComboSlide);
        nextComboSlide = defNextComboSlide(activeComboSlide);
        previousComboSlide = defPreviousComboSlide(activeComboSlide);
    } else {
        activeComboSlide += 1;
        defNextComboSlide(activeComboSlide);
        defPreviousComboSlide(activeComboSlide);
        nextComboSlide = defNextComboSlide(activeComboSlide);
        previousComboSlide = defPreviousComboSlide(activeComboSlide);
    };

    getActiveComboSlide(activeComboSlide);
    getNextComboSlide(nextComboSlide);
    getPreviousComboSlide(previousComboSlide);
}

function moveComboSliderLeft() {
    if (activeComboSlide <= 0) {
        activeComboSlide = sliderTapeComboLength - 1;
        defNextComboSlide(activeComboSlide);
        defPreviousComboSlide(activeComboSlide);
        nextComboSlide = defNextComboSlide(activeComboSlide);
        previousComboSlide = defPreviousComboSlide(activeComboSlide);
    } else {
        activeComboSlide -= 1;
        defNextComboSlide(activeComboSlide);
        defPreviousComboSlide(activeComboSlide);
        nextComboSlide = defNextComboSlide(activeComboSlide);
        previousComboSlide = defPreviousComboSlide(activeComboSlide);
    };
    getActiveComboSlide(activeComboSlide);
    getNextComboSlideLeft(nextComboSlide);
    getPreviousComboSlideLeft(previousComboSlide);
}

sliderComboButtonRight.addEventListener("click", moveComboSliderRight);
sliderComboButtonLeft.addEventListener("click", moveComboSliderLeft);

const itemsCombo = document.querySelector(".combo__items");

function getComboObjectWidth(itemsCombo) {
    var width = itemsCombo.offsetWidth;
    return width;
};

let itemsComboWidth = getComboObjectWidth(itemsCombo);
let slideComboTreshold = itemsComboWidth * 0.1232;

var coordsCombo = [];
itemsCombo.addEventListener("pointermove", function (e) {

    itemsCombo.addEventListener("pointerdown", function (e) {
        var x1 = e.clientX;
        coordsCombo.unshift(x1);
    });

    itemsCombo.addEventListener("pointermove", function (e) {
        var x2 = e.clientX;
        coordsCombo.push(x2);
    })


})

itemsCombo.addEventListener("pointerup", function () {
    var xF = coordsCombo[0];
    var xL = coordsCombo[coordsCombo.length - 1];

    var xRes = xF - xL;

    if (xRes > 0 && Math.abs(xRes) >= slideComboTreshold) {
        moveComboSliderRight();
    };
    if (xRes < 0 && Math.abs(xRes) >= slideComboTreshold) {
        moveComboSliderLeft();
    };
    xF = 0;
    xL = 0;
})