interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: string;
  rating: number;
  ratingDescription: string;
  targetHours: number;
  averageHours: number;
}

interface exerciseValues {
  targetHours: number;
  dailyHours: number[];
}

const parseInput = (args: string[]): exerciseValues => {
  if (args.length < 3) throw new Error('Not enough arguments');
  if (args.length > 12) throw new Error('Too many arguments');

  if (args.every((element) => typeof Number(element) === 'number')) {
    return {
      targetHours: Number(args[2]),
      dailyHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (targetHours: number, dailyHours: number[]): exerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((days) => days > 0).length;
  const averageHours =
    dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / periodLength;
  const success = averageHours >= targetHours ? 'true' : 'false';

  const targetAveragePercentageDifference = ((averageHours - targetHours) / targetHours) * 100;

  let rating!: number;

  if (targetAveragePercentageDifference >= 0) {
    rating = 3;
  } else if (targetAveragePercentageDifference >= -10 && targetAveragePercentageDifference < 0) {
    rating = 2;
  } else if (targetAveragePercentageDifference < -10) {
    rating = 1;
  }

  let ratingDescription!: string;

  if (rating === 3) {
    ratingDescription = 'you smashed your target!';
  } else if (rating === 2) {
    ratingDescription = 'not bad but could do better';
  } else if (rating === 1) {
    ratingDescription = 'you didn`t hit your target';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    targetHours: targetHours,
    averageHours: averageHours,
  };
};

if (require.main === module) {
  try {
    const { targetHours, dailyHours } = parseInput(process.argv);
    console.log(calculateExercises(targetHours, dailyHours));
  } catch (error: unknown) {
    let errorMessage = 'something bad happened';
    if (error instanceof Error) {
      console.log((errorMessage += ' Error: ' + error.message));
    }
  }
}
