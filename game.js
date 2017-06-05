window.mathQuiz = {};

const init = (ns) => {
  const randomNumber = (ceiling) => Math.floor((Math.random() * ceiling) + 1);
  const CEILING = 100;

  const startGame = () => {
    ns.timeLeft = 30000;
    $('.game-over-menu,.menu').hide();
    $('.input-container,.results-container').show();

    const tick = () => {
      if (ns.timeLeft >= 1000) {
        ns.timeLeft -= 1000;
        const timeInSeconds = ns.timeLeft / 1000;
        $('.timer').html(`Time remaining: ${timeInSeconds}`);
      } else {
        endGame();
      }
    };
    setInterval(() => tick(), 1000);

    ns.score = 0;
    $('.score').html(`Score: ${ns.score}`);
    $('.timer').html(`Time remaining: ${ns.timeLeft / 1000}`);

    generateNextProblem();
  };

  const endGame = () => {
    $('.game-over-menu').show();
    $('.input-container').hide();
    $('.timer').hide();
  }

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
    $('.user-input').unbind();
    $('.user-input').keyup(() => verifyResult(numerator));
    $('.user-input').val('');
    $('.user-input').focus();
  };

  $(() => {
    $('.new-game').click((e) => {
      e.preventDefault();
      startGame();
    });
  });
}

init(window.mathQuiz);
