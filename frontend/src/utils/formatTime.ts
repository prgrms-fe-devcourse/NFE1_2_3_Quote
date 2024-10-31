const formatTime = (timeString: string): string => {
  const time = new Date(timeString);
  const now = new Date();

  const diffInMs = now.getTime() - time.getTime();
  const diffInSec = Math.floor(diffInMs / 1000); // 초 차이
  const diffInMin = Math.floor(diffInSec / 60); // 분 차이
  const diffInHours = Math.floor(diffInMin / 60); // 시간 차이
  const diffInDays = Math.floor(diffInHours / 24); // 일 차이
  const diffInMonths = Math.floor(diffInDays / 30); // 월 차이
  const diffInYears = Math.floor(diffInDays / 365); // 년 차이

  /*
  1분 이내 : 방금
  1시간 이내 : 00분 전
  24시간 이내 : 00시간 전
  1개월 이내 : 00일 전
  1년 이내 : 00달 전
  이후 : 00 년 전
*/

  if (diffInMin < 1) {
    return "방금";
  } else if (diffInMin < 60) {
    return `${diffInMin}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }
  return `${diffInYears}년 전`;
};

export default formatTime;
