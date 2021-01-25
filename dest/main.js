console.log("ok 1");
// back to top button
let toTopBtn = document.querySelector(".toTop");

toTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// $(window).resize(function () {
//     var width = $(window).innerWidth();
//     if (width < 1201) {
//         window.location.reload();
//     }
// });

window.addEventListener("scroll", function () {
    var scrollHeader = document.querySelector(".scroll__nav");

    scrollHeader.classList.toggle(
        "active",
        window.scrollY > document.querySelector("header").offsetHeight
    );
});
let projectCurrent = document.querySelector(".project__current");
let projectOption = document.querySelector(".selections");
projectCurrent.addEventListener("click", function (e) {
    e.stopPropagation();
    projectOption.classList.toggle("selected");
});
document.addEventListener("click", function () {
    projectOption.classList.remove("selected");
});
projectOption.querySelectorAll("a").forEach((e, i) => {
    e.addEventListener("click", function (e) {
        e.preventDefault();
        let text = this.innerHTML;
        document.querySelector(".project__current span").innerHTML = text;
    });
});
//side nav
function clickMenu(x) {
    let menuClicked = document.querySelector(".menu__btn--hover");
    let sideMenu = document.querySelector(".hidden__nav");
    menuClicked.addEventListener("click", function (e) {
        e.stopPropagation();
        sideMenu.classList.toggle("clicked");
    });
    document.addEventListener("click", function () {
        sideMenu.classList.remove("clicked");
    });
}
//mobile toggle

function menuToggle(x) {
    x.classList.toggle("change");
    var mobNav = document.querySelector("header .hidden__nav--mobile");
    mobNav.classList.toggle("active");
    function hideNav() {
        if (mobNav.classList.contains("active")) {
            mobNav.classList.remove("active");
        }
    }
    window.addEventListener("resize", function () {
        let windowWidth = window.innerWidth;
        if (windowWidth > 767) {
            hideNav();
        }
    });
}

let $carousel = $(".banner__wrap");
$carousel.flickity({
    contain: true,
    cellAlign: "left",
    wrapAround: true,
    prevNextButtons: false,
    selectedAttraction: 0.2,
    friction: 1.2,
    lazyLoad: 1,
});

function preBtn() {
    $(".banner__wrap").flickity("previous");
}

function nextBtn() {
    $(".banner__wrap").flickity("next");
}

function nextBtnProduct() {
    $(".carousel").flickity("next");
}

$(".carousel").flickity({
    freeScroll: true,
    wrapAround: true,
});

var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute("data-size").split("x");
            item = {
                src: linkEl.getAttribute("href"),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute("src");
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return el.tagName && el.tagName.toUpperCase() === "FIGURE";
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split("&");
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split("=");
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (
        index,
        galleryElement,
        disableAnimation,
        fromURL
    ) {
        var pswpElement = document.querySelectorAll(".pswp")[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute("data-pswp-uid"),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
                    pageYScroll =
                        window.pageYOffset ||
                        document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width,
                };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0,
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(
            pswpElement,
            PhotoSwipeUI_Default,
            items,
            options
        );
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute("data-pswp-uid", i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(
            hashData.pid,
            galleryElements[hashData.gid - 1],
            true,
            true
        );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM(".products__detail--img");
});
