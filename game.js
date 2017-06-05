window.mathQuiz = {};

const init = (ns) => {
  const randomNumber = (ceiling) => Math.floor((Math.random() * ceiling) + 1);
  const CEILING = 100;

  const startGame = () => {
    let timeLeft = 30000;
    const tick = () => {
      if (timeLeft >= 1000) {
        timeLeft -= 1000;
        const timeInSeconds = timeLeft / 1000;
        $('.timer').html(`Time remaining: ${timeInSeconds}`);
      } else {
        $('.input-container').hide();
      }
    };
    setInterval(() => tick(), 1000);

    ns.score = 0;
    $('.score').html(`Score: ${ns.score}`);
    $('.timer').html(`Time remaining: ${timeLeft / 1000}`);

    generateNextProblem();
  };

  const verifyResult = (numerator) => {
    const expectedResult = parseFloat(numerator) / 2;
    if (expectedResult === parseFloat($('.user-input').val())) {
      increaseScore();
      generateNextProblem();
    }
  };

  const increaseScore = () => {
    ns.score += 1;
    $('.score').html(`Score: ${ns.score}`);
  };

  const generateNextProblem = () => {
    const numerator = randomNumber(CEILING);
    $('.line-1').html(numerator);
    $('.line-2').html('&divide; 2');
    $('.user-input').change(() => verifyResult(numerator));
    $('.user-input').keyup(() => verifyResult(numerator));
    $('.user-input').val('');
    $('.user-input').focus();
  };

  $(() => startGame());
}

init(window.mathQuiz);
