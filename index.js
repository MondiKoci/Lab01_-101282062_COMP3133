const csv = require('csv-parser');
const fs = require('fs');

const readStream = fs.createReadStream('./input_countries.csv')
const CANWriteStream = fs.createWriteStream('./canada.txt');
const USAWriteStream = fs.createWriteStream('./usa.txt');

(function(){
    ['canada.txt', 'usa.txt'].map((file)=>{fs.unlink(file, (err)=>{ // Delete files 'canada.txt' and 'usa.txt' if they exist
        if(err)console.log(`File "${file}" not found!`); else{`File "${file}" deleted!!`}
    })})
    let canData = usaData =""; // Variables to store the string output from the filtered csv data
    readStream
    .on('error', (err) => console.log(`Error: ${err}`))
    .pipe(csv())
    .on('headers', (headers) => {
      canData = usaData = headers.toString()+"\n"; // Add headers in the first lines
      })
    .on('data', (row) => { // Check and filter data
        let rowValues = Object.values(row).toString()+"\n";
        if(row['country'] == "United States")usaData += rowValues; 
        else if(row['country'] == "Canada") canData += rowValues;
    })
    .on('end', () => { // Write data in files
        CANWriteStream.write(canData) 
        USAWriteStream.write(usaData)
    })
})();