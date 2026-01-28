console.log('PROCESS.ARV', process.argv);

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
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmiResult = (weight / (height * height)) * 10000;

  if (bmiResult < 18.5) {
    return 'Underweight';
  }
  if (bmiResult >= 18.5 && bmiResult < 25) {
    return 'Healthy range';
  } else if (bmiResult >= 25 && bmiResult < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(
      `Based on your weight of ${weight}kg and height of ${height}cm, your BMI result is:`,
      calculateBmi(height, weight)
    );
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
