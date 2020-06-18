interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArguments2 = (args: number[]) => {
  if (args.length < 2) throw new Error('Not enough arguments');

  args.forEach(arg => {
    if (!Number.isFinite(arg)) {
      throw new Error('Provided values were not numbers!');
      // console.log(isNaN(Number(arg)));
      // return false;
    }
  });
  return args;
};

export const exerciseCalculator = (args: number[]): Result => {
  const target = args.shift();
  const periodLength = args.length;
  const trainingDays = args.filter(arg => arg !== 0).length;
  const average = args.reduce((acc, cur) => acc + cur) / args.length;
  const success = target! < average;
  const [rating, ratingDescription] = success ? [3, 'success'] : [1, 'false'];
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: target!,
    average
  };
};

try {
  const input = process.argv;
  input.splice(0, 2);
  const inputNumber = input.map(i => Number(i));
  const training = parseArguments2(inputNumber);
  console.log(exerciseCalculator(training));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
