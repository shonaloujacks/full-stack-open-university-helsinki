console.log('PROCESS.ARV', process.argv) 

interface BmiValues {
  value1: number;
  value2: number;

}



const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }

}

const calculateBmi = (height: number, weight: number, printText: string) => {
  const bmiResult = (weight / (height * height)) * 10000
  console.log('THIS IS BMI result', bmiResult)

  if (bmiResult < 18.5 ) {
   console.log(printText, 'Underweight')
  }
  
  if (bmiResult > 18.5 && bmiResult < 25 ) {
    console.log(printText, 'Healthy range')
  }

   if (bmiResult > 25 && bmiResult < 30 ) {
    console.log(printText, 'Overweight')
  }

   if (bmiResult > 30 ) {
    console.log(printText, 'Obese')
  }
  
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2, `Based on your weight of ${value1}kg and height of ${value2}cm, your BMI result is:`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

