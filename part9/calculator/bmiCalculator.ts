console.log('PROCESS.ARV', process.argv) 

interface BmiValues {
  height: number;
  weight: number;
}



const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }

}

const calculateBmi = (height: number, weight: number, printText: string) : void => {
  const bmiResult = (weight / (height * height)) * 10000
  console.log('THIS IS BMI result', bmiResult)

  if (bmiResult < 18.5 ) {
   console.log(printText, 'Underweight')
  }
  
  if (bmiResult >= 18.5 && bmiResult < 25 ) {
    console.log(printText, 'Healthy range')
  }

   if (bmiResult >= 25 && bmiResult < 30 ) {
    console.log(printText, 'Overweight')
  }

   if (bmiResult >= 30 ) {
    console.log(printText, 'Obese')
  }
  
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight, `Based on your weight of ${weight}kg and height of ${height}cm, your BMI result is:`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

