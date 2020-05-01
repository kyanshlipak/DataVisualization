// // Given the CSV file "data.csv"
// // in the project's "assets" folder:

let table;
// let row;
// let time;
// let sensor;

// let x;
// let y;

function preload() {
    //table is comma separated value "csv"
    //and has no header specifying the columns labels
    table = loadTable('fullData.csv', 'csv', 'noHeader');
}

// function setup() {
//   //setup look of the background
//   createCanvas(1000, 600); //canvas size in pixels
//   background(100, 70, 200); //background color in RGB
//   ellipseMode(CENTER); //draw ellipses from the center
 
// }
// let i = 1
// function draw() {
//   row = table.getRow(i);
//   time = row.getNum(0);     //grab the time value from column 0
//   sensor = row.getNum(2);   //grab the sensor value from column 1
//   let mapped_time = map(time, 1.58569E+12, 1.58594E+12, 0, 255); //remap the time variable so the ellipses are bigger. first two numbers are original range, 2nd two are mapped range
//   let mapped_sensor = map(sensor, 12, 421, 0, 255); //remap the sensor variable
//   fill(mapped_time,0,mapped_time)
//   ellipse(500,300,100+mapped_time,100+mapped_time);
//   i+=1
// }

var SAVE = true
var yeah = 500
var points = []
var numRow = 70
var colorVariation = 0;
var down = false;
var dict = {};
var realDict = {};
let count = 0;
function setup() {

   pixelDensity(1)
  createCanvas(yeah, yeah);
  loadPixels()
  noStroke()
  grid()
    background("white")
    // triangles4()
//     triangles()
//     if(SAVE){
//     save("ting.png")
//     }
  for (let i =0;i<2359;i++){
    row = table.getRow(i+1)
    time = row.getNum(0)
    value = row.getNum(2)
    mappedTime = map(time, 1.58573E+12, 1.58767E+12, 52, 6500)
    dict[mappedTime.toFixed(0)] = value
  }
  keys = Object.keys(dict)
  for (let i =0;i<keys.length;i++){
    console.log(keys[i] + ":" + dict[keys[i]])
    // console.log("hi")
  }

  for (let i =0;i<(keys.length-1);i++){
    realDict[keys[i]] = (dict[keys[i+1]] - dict[keys[i]])
  }
  // x = Object.values(realDict)
  // for (let i = 0;i<x.length;i++){
  //   count += x[i]
  // }
  // console.log(count)


}
let i = 0
let d = false
let frames = 0
let maxVariation = 0
let upVariation = 0
let upTime = 0
function draw(){
  colorVariation = upVariation
  // if (colorVariation>100){
  //   down = true
  // }
  // if (colorVariation<1){
  //   down = false
  // }
  // if (down){
  //   colorVariation-=0.05*sqrt(colorVariation+1)
  // }else{
  //   colorVariation+=0.05*sqrt(colorVariation+1)
  // }
  if (realDict[frames]){
    console.log(frames)
    maxVariation = sqrt(realDict[frames])*10
    upTime += 8
  }

  console.log(upVariation)

  if (upTime>0){
    upVariation += maxVariation/8
    upTime-=1
  }

  if (upVariation>3 && upTime<2){
    upVariation -= upVariation/8
  }

  
  if (d){
    time = (288-(i+80))*24/288
  }else{
    time = (i+80)*24/288 
  }
    timeMinutes = floor((time-floor(time))*60)
  if (timeMinutes<10){
    timeMinutes = "0"+timeMinutes
  }
  if (i>64){
    d = true
  }
  if (i<-80){
    d = false
  }
  if (d){
    i-=1
  }else{
    i+=1
  }
  frames+=1
  triangles4(6*i)
//   if (time<12){
//   text((floor(time))+ ":" + timeMinutes + " pm",100,100)
//   }else{
//   text((floor(time)-12) + ":" +timeMinutes+ " am",100,100)
// }
   text(floor((frames+228)/288),20,20)
  
  if (frames>6500){
    background('black')
  }
}

function grid() {
  for (var y = 0; y < yeah; y += (yeah / numRow)) {

    for (var x = 0; x < yeah; x += (yeah / numRow)) {
      points.push([random(x, x + (yeah / numRow)), random(y, y + (yeah / numRow))])
    }

  }
}

function triangles4(u) {
  noStroke()
  for (var z = 0, y = 0; z < (numRow * (numRow - 1)); z += (numRow),y+=(255/numRow)) {
    for (var i = 1,x=0; i < (numRow - 1); i += 1,x+=(255/numRow)) {
if (u<0){
fill(255-x/2-u,random((255-y)-colorVariation+x/8,(255-y)+colorVariation+x/8),200+u/8)
}else{
  fill(255-x/2-u-u/2,random((255-y)-colorVariation+x/8-u/2,(255-y)+colorVariation+x/8-u/2),200)
}

      triangle(points[(i + z)][0], points[(i + z)][1], points[(i + z) + 1][0], points[(i + z) + 1][1], points[(i + z) + numRow][0], points[(i + z) + numRow][1])

      triangle(points[(i + z)][0], points[(i + z)][1], points[(i + z) + numRow][0], points[(i + z) + numRow][1], points[(i + z) + (numRow - 1)][0], points[(i + z) + (numRow - 1)][1])
    }
  }
}
