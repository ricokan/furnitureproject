//example with multiple models
var mybed = ["./models/bed.glb", "./models/bed2.glb"]
var counterBed = 0;
document.getElementById("change-bed").addEventListener("click", function() {
    counterBed++;
    if (counterBed==2) { 
        counterBed = 0;
    }
    document.getElementById("bed").src = mybed[counterBed];
});

var mybeanbag = ["./models/bean_bag.glb", "./models/bean_bag2.glb", "./models/bean_bag3.glb"]
var counterBeanBag = 0;
document.getElementById("change-beanbag").addEventListener("click", function() {
    counterBeanBag++;
    if (counterBeanBag==3) { 
        counterBeanBag = 0;
    }
    document.getElementById("beanbag").src = mybeanbag[counterBeanBag];
});

var mybeanbagsize = ["./models/bean_bag.glb", "./models/bean_bagL.glb"]
var counterBeanBagsize = 0;
document.getElementById("change-size").addEventListener("click", function() {
    counterBeanBagsize++;
    if (counterBeanBagsize==2) { 
        counterBeanBagsize = 0;
    }
    document.getElementById("beanbag").src = mybeanbagsize[counterBeanBagsize];
});