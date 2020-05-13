function event_ref(refP) {

    if (refP === 1) {
        refP = 0 //hodnota back
        document.getElementById("img_ref").src = "img/refpBack.png"; //meni obrazek a hodnotu opravy
    } else {
        refP = 1 //hodnota front
        document.getElementById("img_ref").src = "img/refpFront.png";
    }
    
    return refP;
}