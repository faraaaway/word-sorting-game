"use client";
import React, { useState } from "react";

// 2. 데이터 구
const gameData = [
  {
    category: "포유류",
    options: ["개", "참새", "고양이", "상어", "침팬치", "도마뱀"],
    answers: ["개", "고양이", "침팬치"],
  },
  {
    category: "과일",
    options: ["사과", "당근", "바나나", "오이", "가지"],
    answers: ["사과", "바나나"],
  },
];

function App() {
  // 3. 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = gameData[currentQuestionIndex];

  // 4. 로직 (선택 처리)
  const handleOptionClick = (option) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(option)) {
        // 이미 선택했다면 제거
        return prev.filter((item) => item !== option);
      } else {
        // 새로 선택했다면 추가
        return [...prev, option];
      }
    });
  };

  // 4. 로직 (제출 및 다음 문제)
  const handleSubmit = () => {
    const correctAnswers = currentQuestion.answers;
    let currentScore = 0;

    // 채점 로직 (예: 정답 맞추면 +1, 틀린거 고르면 -1)
    selectedAnswers.forEach((answer) => {
      if (correctAnswers.includes(answer)) {
        currentScore++;
      } else {
        currentScore--;
      }
    });

    setScore(score + currentScore); // 총점 업데이트
    setSelectedAnswers([]); // 선택 초기화

    // 다음 문제로 이동
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < gameData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // 게임 종료
      setShowResult(true);
    }
  };

  return (
    <div className="flex justify-center">
      {showResult ? (
        // 4. 결과 표시
        <div className="result-screen">
          <h2>게임 종료!</h2>
          <p>당신의 총점은 {score}점입니다.</p>
        </div>
      ) : (
        // 1. 문제 카드, 제시어, 제출 버튼 담는 컨테이너
        <div>
          {/* 문제 카드 컴포넌트 역할 */}
          <div className="flex  justify-center">
            <div className="bg-white rounded-4xl border-4 my-10 text-6xl text-center font-semibold w-[21rem] h-[32rem] content-center">
              <h2>{currentQuestion.category}</h2>
            </div>
          </div>

          {/* 제시어 선택 컴포넌트 역할 */}
          <div className="flex flex-row my-5 justify-center">
            {currentQuestion.options.map((option, idx) => (
              //각각의 제시어
              <p
                key={idx}
                className={`${
                  selectedAnswers.includes(option) ? "bg-green-400" : "bg-white"
                } mx-2 px-4 py-1 text-4xl rounded-4xl border-3`}
              >
                <button
                  key={option}
                  // 선택된 버튼은 스타일 다르게 (예: 'selected' 클래스)

                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              </p>
            ))}
          </div>

          <div className="flex  justify-center">
            <button
              onClick={handleSubmit}
              className="bg-white mx-2 px-3 py-2 text-4xl rounded border "
            >
              제출하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
