// let array = [14, 23, 34, 34, 45, 56, 67];
// let repeatedElement = [];
// let counter = 0;
// for (let i = 0; i < array.length; i++) {
// 	let element = array[i];
// 	let repeated = false;
// 	for (let j = i + 1; j < array.length; j++) {
// 		if (element == array[j] && !repeatedElement.includes(element)) {
// 			repeated = true;
// 			repeatedElement.push(element);
// 			counter++;
// 			break;
// 		}
// 	}
// }
// console.log(repeatedElement, counter);

// const birinciDizi = [1, 2, 3, 4, 5];
// const ikinciDizi = [9, 10, 11];

// for (let i = 0; i < birinciDizi.length; i++) {
// 	console.log(ikinciDizi[i + ikinciDizi.length]);
// 	ikinciDizi[i + ikinciDizi.length] = birinciDizi[i];
// }

// console.log(ikinciDizi); // ikinciDizi, birinciDizi ile birleştirilmiş olacak

// let arr = [34, 45, 12, 21, 43, 54, 65, 76, 87, 98, 101, 112, 123, 568, 134, 145, 156, 167, 178, 3, 189, 200, 211, 222, 233, 244, 255, 266, 277];
// let min = 0;
// let max = 0;
// for (let i = 0; i < arr.length; i++) {
// 	const element = arr[i];
// 	if (min > element || min == 0) {
// 		min = element;
// 	} else if (max < element || max == 0) {
// 		max = element;
// 	}
// }
// console.log(min, max);

// let arr = [34, 45];
// let counter = 0;
// let sum = 0;

// for (let i = 0; i < arr.length; i++) {
// 	const element = arr[i];
// 	counter++;
// 	sum += element;
// }
// sum = sum / counter;
// console.log(counter, sum);\





// let num1 = (1.324).toString();
// let num2 = (1.324).toString();

// let arr1 = [];
// let arr2 = [];

// for (let i = num1.indexOf('.') + 1; i <= 4; i++) {
// 	arr1.push(num1[i]);
// }

// for (let i = num2.indexOf('.') + 1; i <= 4; i++) {
// 	arr2.push(num2[i]);
// }

// if (num1 && num2 > 0 && num1.split('.')[0] === num2.split('.')[0]) {
// 	const areArraysEqual = arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
// 	console.log(areArraysEqual);
// } else {
// 	console.log(false);
// }
