import React, { useState, useEffect } from 'react';

const MathPuzzle = () => {
  const [gameState, setGameState] = useState('start'); // start, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [selectedBubbles, setSelectedBubbles] = useState([]);
  const [clickedOrder, setClickedOrder] = useState([]);

  const questions = [
    [
      { expression: '20/10', value: 2 },
      { expression: '30/6', value: 5 },
      { expression: '13-3', value: 10 }
    ],
    [
      { expression: '19/2', value: 9.5 },
      { expression: '100/4', value: 25 },
      { expression: '35/7', value: 5 }
    ],
    [
    { expression: '8*2', value: 16 },
    { expression: '40/5', value: 8 },
    { expression: '5+10', value: 15 }
    ],
    [
    { expression: '10/2.1', value: 4.76 },
    { expression: '15/3', value: 5 },
    { expression: '20/3.9', value: 5.13 }
  ],
    [
    { expression: '60/12', value: 5 },
    { expression: '7+8', value: 15 },
    { expression: '18-3', value: 15 }
  ],
  [
    { expression: '7*0.7', value: 4.9 },
    { expression: '11-6', value: 5 },
    { expression: '25/4.9', value: 5.1 }
  ],
  [
    { expression: '3*3', value: 9 },
    { expression: '20/4', value: 5 },
    { expression: '10+2', value: 12 }
  ],
  [
    { expression: '60/10', value: 6 },
    { expression: '12+9', value: 21 },
    { expression: '10*2', value: 20 }
  ],
  [
    { expression: '6*3', value: 18 },
    { expression: '72/8', value: 9 },
    { expression: '25-5', value: 20 }
  ],
  [
    { expression: '25/5', value: 5 },
    { expression: '15-6', value: 9 },
    { expression: '6*2', value: 12 }
  ],
  [
    { expression: '9+6', value: 15 },
    { expression: '36/6', value: 6 },
    { expression: '8*3', value: 24 }
  ]
  ];
  
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setTimeLeft(15);
    setScore(0);
    setSelectedBubbles([]);
    setClickedOrder([]);
  };

  const handleBubbleClick = (index) => {
    // If bubble is already selected, unselect it
    if (selectedBubbles.includes(index)) {
      const newSelected = selectedBubbles.filter(i => i !== index);
      const newClickedOrder = clickedOrder.filter(i => i !== index);
      setSelectedBubbles(newSelected);
      setClickedOrder(newClickedOrder);
      return;
    }

    const newSelected = [...selectedBubbles, index];
    const newClickedOrder = [...clickedOrder, index];
    setSelectedBubbles(newSelected);
    setClickedOrder(newClickedOrder);

    if (newSelected.length === 3) {
      checkAnswer(newClickedOrder);
    }
  };

  const checkAnswer = (order) => {
    const currentQ = questions[currentQuestion];
    const sortedIndices = currentQ
      .map((item, idx) => ({ idx, value: item.value }))
      .sort((a, b) => a.value - b.value)
      .map(item => item.idx);

    const isCorrect = JSON.stringify(order) === JSON.stringify(sortedIndices);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setSelectedBubbles([]);
      setClickedOrder([]);
    } else {
      setGameState('finished');
    }
  };

  const getBubbleSize = (index) => {
    const sizes = ['w-32 h-32', 'w-40 h-40', 'w-36 h-36'];
    return sizes[index];
  };

  const getBubblePosition = (index) => {
    const positions = [
      'top-8 left-1/2 -translate-x-1/2',
      'top-32 right-16',
      'top-48 left-16'
    ];
    return positions[index];
  };

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-pink-200 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-8 mb-12">
            <div>
              <div className="text-gray-800 text-5xl font-light mb-10 mr-4">ACCENTURE</div>
              <div className="text-4xl font-bold text-gray-900 mr-4">Math Puzzle</div>
            </div>
            <div className="w-64 h-64 bg-gray-700 rounded-lg p-8 flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-60">
                <div className="grid grid-cols-3 gap-2 text-4xl">
                  <span>θ</span><span>+</span><span>-</span>
                  <span>α</span><span>β</span><span>π</span>
                  <span>γ</span><span>∫</span><span>Σ</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={startGame}
            className="bg-white text-gray-800 px-12 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-pink-200 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-5xl font-light text-gray-800 mb-12">Your Score</h2>
          <div className="text-8xl font-bold text-gray-900 mb-16">
            {score}/{questions.length}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setGameState('start')}
              className="bg-white text-gray-800 px-12 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
              >
              Home
            </button>
            <button
              onClick={startGame}
              className="bg-white text-gray-800 px-12 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-pink-200 p-8">
      <button
        onClick={() => setGameState('start')}
        className="absolute top-8 left-8 bg-white text-gray-800 px-12 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
      >
        Home
      </button>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-4xl font-light text-gray-800 mb-6">Q{currentQuestion + 1}</div>
          
          <div className="relative h-96 mb-8">
            {questions[currentQuestion].map((item, index) => (
              <div
                key={index}
                onClick={() => handleBubbleClick(index)}
                className={`absolute ${getBubblePosition(index)} ${getBubbleSize(index)} 
                  rounded-full flex items-center justify-center text-2xl font-semibold
                  cursor-pointer transition-all duration-300
                  ${selectedBubbles.includes(index) 
                    ? 'bg-blue-400 bg-opacity-70 scale-95' 
                    : 'bg-blue-300 bg-opacity-50 hover:bg-opacity-70'
                  }`}
              >
                {item.expression}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-teal-400 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 15) * 100}%` }}
              />
            </div>
            <div className="ml-6 text-gray-800 font-medium">
              00:{timeLeft.toString().padStart(2, '0')}/00:15
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathPuzzle;