
var padding = {top:20, right:40, bottom:0, left:20},
    w = 385 - padding.left - padding.right,
    h = 375 - padding.top  - padding.bottom,
    r = Math.min(w, h)/2,
    rotation = 0,
    oldrotation = 0,
    picked = 10000,
    oldpick = [],
    color = d3.scale.category20();//category20c()
   
    //randomNumbers = getRandomNumbers();
var data = [
            {label:"200",  value:1, image:"images/e.jpg",  question:"Who is this very handsome dog?"}, 
            {label:"300",  value:1, image:"images/photo5.jpg", question:"In what year does distracted boyfriend meme originated?"}, 
            {label:"100",  value:1, image:"images/photos6.jpg", question:"What does bomboclaat means?"}, 
            {label:"50",  value:1, image:"images/photo8.jpg" ,question:"Finish this meme :"},
            {label:"JACKPOT",  value:1,  question:"Percentage of money that exist on computer?"},
            {label:"400",  value:1,  question:"When I get multiplied by any number, the sum of the figures in the product is always me. What am I?"}, 
            {label:"500",  value:1, question:"The First Computer Mouse was Made of?"}, 
            {label:"20",  value:1,  question:"Why was qwerty keyboard designed?"}, 
            {label:"30",  value:1, question:"Initial version of Youtube was a....?"}, 
            {label:"JACKPOT", value:1,question:"Python programming language was named after a?"} 
];
var svg = d3.select('#chart')
    .append("svg")
    .data([data])
    .attr("width",  w + padding.left + padding.right)
    .attr("height", h + padding.top + padding.bottom);

var container = svg.append("g")
    .attr("class", "chartholder")
    .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

var vis = container
    .append("g");
    
var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice");
    

arcs.append("path")
    .attr("fill", function(d, i){ return color(i); })
    .attr("d", function (d) { return arc(d); });

// add the text
arcs.append("text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        d.angle = (d.startAngle + d.endAngle)/2;
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
    })
    .attr("text-anchor", "end")
    .text( function(d, i) {
        return data[i].label;
   })
   .style({"font-weight":"bold", "font-size":"15px","fill":"#ffffff"});

container.on("click", spin);


function spin(d){
    
    container.on("click", null);

    //all slices have been seen, all done
    console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
    if(oldpick.length == data.length){
        console.log("done");
        container.on("click", null);
        return;
    }

    var  ps       = 360/data.length,
         pieslice = Math.round(1440/data.length),
         rng      = Math.floor((Math.random() * 1440) + 360);
        
    rotation = (Math.round(rng / ps) * ps);
    
    picked = Math.round(data.length - (rotation % 360)/ps);
    picked = picked >= data.length ? (picked % data.length) : picked;


    if(oldpick.indexOf(picked) !== -1){
        d3.select(this).call(spin);
        return;
    } else {
        oldpick.push(picked);
    }

    rotation += 360 - Math.round(ps/2);

    vis.transition()
        .duration(4000)
        .attrTween("transform", rotTween)
        .each("end", function(){

            //mark question as seen
            d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                .attr("fill", "#ffffff");


            //populate question
    
               
            d3.select("#question h1")
              .text(data[picked].question)

            d3.select("#image")
              .html(" ");
             
              d3.select("#image")
               .append("img")
               .attr('src',data[picked].image)
                
            oldrotation = rotation;

        
               
           /* container.on("click", spin);
            setTimeout(() => {
image.remove();
},2000);*/

      
container.on("click", spin);
           
                });
               
            }

//draw spin circle
container.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 42)
    .style({"fill":"white","cursor":"pointer"});
    
//spin text
container.append("text")
    .attr("x", 0)
    .attr("y", 2)
    .attr("text-anchor", "middle")
  //  .text("SPIN")
    .style({"font-weight":"bold", "font-size":"15px"});        
function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function(t) {
    return "rotate(" + i(t) + ")";
  };
}


function getRandomNumbers(){
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 0]).domain([0, 10000]);

    if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
        window.crypto.getRandomValues(array);
        console.log("works");
    } else {
        //no support for crypto, get crappy random numbers
        for(var i=0; i < 1000; i++){
            array[i] = Math.floor(Math.random() * 10000) + 1;
        }
    }

    return array;
}
//sliding modal
const btn=document.getElementById('btn');
const popup=document.getElementById('popup');
btn.addEventListener('click', ()=>{
   popup.classList.toggle('active');
   btn.classList.toggle('active');
});