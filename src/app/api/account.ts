import instance from './axios';

// 번호인증 서버 전송
export const phoneAuthPut = async (phoneAuthNumber: string, phone: string, setTimer?: any) => {
  const phoneNumber = { receiverPhoneNumber: phone.replace(/-/g, '') };
  // 요청 성공 시 타이머 초기화
  if (typeof setTimer === 'function') {
    setTimer(60);
  }
  try {
    const response = await instance.put(`/api/verification-code/${phoneAuthNumber}`, phoneNumber, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return false;
  } catch (error) {
    return true;
  }
};





// 닉네임 중복검사
export const checkNicknameDuplication = async (nickname: string) => {
  try {
    const response = await instance.get(`${process.env.API_URL}/api/user/check-nickname/${nickname}`);
    return response.data.data.valid;
  } catch (error) {
    console.error('Nickname duplication check failed:', error);
  }
};
