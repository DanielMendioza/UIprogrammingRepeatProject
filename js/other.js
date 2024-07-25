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
        rows.push(this.slice(i, i+16))
    }
    return rows;
}