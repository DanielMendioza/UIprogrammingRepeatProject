Array.prototype.parse2D = function(){
    const rows = [];
    //This loops through the array in steps of 16, the amount of columns
    // Output would be: 
    // [
    //   [1, 2, 3, ..., 16],
    //   [17, 18, 19, ..., 32],
    //   [33, 34, 35, ..., 48],
    //   [49, 50, 51 ... etc]
    // ]
    for (let i = 0; i < this.length; i+=16){
      //the slice method in JavaScript is used to extract a portion of an array into a new array
      //efectively "slicing the 1d Array into a 2D array of 16xZ where Z is the amount of loops"
      // https://www.w3schools.com/JSREF/jsref_slice_array.asp
        rows.push(this.slice(i, i+16))
    }
    return rows;
}


const spriteSheetsHolder = {
    left: [
      { x: 0, y: 0, width: 37, height: 64 },
      { x: 19, y: 0, width: 30, height: 64 },
      { x: 34, y: 0, width: 44, height: 64 },
      { x: 56, y: 0, width: 40, height: 64 },
      { x: 76, y: 0, width: 28, height: 64 },
      { x: 90, y: 0, width: 38, height: 64 }
    ],
    sheet2: [
      { x: 0, y: 0, width: 38, height: 64 },
      { x: 19, y: 0, width: 28, height: 64 },
      { x: 33, y: 0, width: 40, height: 64 },
      { x: 53, y: 0, width: 44, height: 64 },
      { x: 75, y: 0, width: 30, height: 64 },
      { x: 90, y: 0, width: 38, height: 64 }
    ]
  };


