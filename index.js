/* 
    To Test 
    Make sure you have Node installed (tested w/v12)
    run node index.js from the command line from the project
    directory
*/

const convertToWords = (digitalVersion) => {
    if (typeof digitalVersion !== 'number') {
        try {
            digitalVersion = parseInt(digitalVersion.replace(/,/g, ''), 10);
            if (isNaN(digitalVersion)) return 'Invalid input. Please enter a valid number';
        } catch {
            return 'Invalid input. Please enter a valid number';
        }
    }

    const numberArray = digitalVersion.toString(10).replace(/\D/g, '0').split('').map(Number);
    const reversedNumber = numberArray.reverse(); 
    const place = ['hundred', 'thousand', 'million', 'billion', 'trillion'];
    const teens = ['ten', 'eleven', 'twelve', 'thriteen', '', 'fifteen',];
    const tenthPlace = ['', '0', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const onethPlace = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    let stringVersionArray = [];

    for (let n = 0; n < reversedNumber.length; n++) {
        const theNumber = reversedNumber[n];

        // Catch for the edge case when exactly zero
        stringVersionArray.unshift(reversedNumber.length === 1 && theNumber === 0 ? 'zero' : '');

        if (n % 3 === 1) { // Tenth place
            if (theNumber === 1) { // Teens
                let name = '';
                stringVersionArray = stringVersionArray.slice(2, stringVersionArray.length); // git ride of the onethPlace and the space between
                const prevNum = reversedNumber[n - 1];
                switch (prevNum) { // get the previous number
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                        name = teens[prevNum];
                        break;
                    default:
                        name = onethPlace[prevNum] + 'teen';
                }
                stringVersionArray.unshift(name);
            } else {
                stringVersionArray.unshift(tenthPlace[theNumber]);
            }
        } else if (n % 3 === 2) { // Any hundredth place
            const placeText = theNumber === 0 ? '' : place[0];
            stringVersionArray.unshift(placeText)
            stringVersionArray.unshift(onethPlace[theNumber]);

        } else {
            const placeIndex = Math.floor(n / 3);
            const placeText = n < 2 ? '' : place[placeIndex];
            stringVersionArray.unshift(placeText);
            stringVersionArray.unshift(onethPlace[theNumber]);
        }
    }

    return stringVersionArray.filter(digit => digit !== '').join(' ');
}

// ========== Execute Test =====================
const logConvertToWords = (testNumber) => {
    console.log(`${testNumber} results in "${convertToWords(testNumber)}"`);
}

testVars = [8, 13, 103, 3032, 15657, 918004, 4280617, '700,100,100', 'some string'];
testVars.forEach(logConvertToWords);
