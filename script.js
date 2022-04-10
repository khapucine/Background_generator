var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var button = document.getElementById("generate");

function getStyle(a, b) {
    return window.getComputedStyle(b, null)[a];
}

function findgoodcssstyle() {
    var background = getStyle("background", body);
    var start = background.indexOf("linear-gradient(to right");
    var end = background.indexOf(")) ", start);
    return cssstyle = background.substring(start, end + 1);
}

function get2startcolor() {
    var start1 = findgoodcssstyle().indexOf("rgb");
    var end1 = findgoodcssstyle().indexOf("),", start1);
    var startcolor = findgoodcssstyle().substring(start1, end1 + 1);
    var start2 = findgoodcssstyle().indexOf("rgb", end1);
    var end2 = findgoodcssstyle().indexOf(")", start2);
    var endcolor = findgoodcssstyle().substring(start2, end2 + 1);
    return [startcolor, endcolor];
}

var rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function(r,g,b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return "#"+red+green+blue;
};

function setcolorstart() {
    var startcolor = get2startcolor();
    color1.value = fullColorHex(startcolor[0].substring(4, startcolor[0].length - 1).split(",")[0], startcolor[0].substring(4, startcolor[0].length - 1).split(",")[1].replace(" ",""), startcolor[0].substring(4, startcolor[0].length - 1).split(",")[2].replace(" ",""));
    color2.value = fullColorHex(startcolor[1].substring(4, startcolor[1].length - 1).split(",")[0], startcolor[1].substring(4, startcolor[1].length - 1).split(",")[1].replace(" ",""), startcolor[1].substring(4, startcolor[1].length - 1).split(",")[2].replace(" ",""));
    //color1.setAttribute('value', color1.value);
    //color2.setAttribute('value', color2.value);
    return [color1.value, color2.value];
}

function setGradient() {
    body.style.background =
    "linear-gradient(to right, "
    + color1.value
    + ", "
    + color2.value
    + ")";

    css.textContent = body.style.background + ";";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

button.addEventListener("click", function() {
    color1.value = getRandomColor();
    color2.value = getRandomColor();
    setGradient();
});


setcolorstart();

css.textContent = cssstyle;