import instance, {headers} from './axios';

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
    const res = await instance.get(`/api/user/check-nickname/${nickname}`);
    return res.data.data.valid
  } catch (error) {
    console.error('Nickname duplication check failed:', error);
  }
};



// 랜덤 닉네임 생성
export const getRandomNickname = async () => {
  try {
    const response = await instance.get("/api/user/random-nickname")
    return response.data
  } catch (error) {
    console.error(error);
    return false;
  }
};

interface postPhoneAuthProps {
  phoneNumber: string
}

export const postPhoneAuth = async (phoneNumber: postPhoneAuthProps) => {
  try {
    const res = await instance.post('/api/verification-code', phoneNumber, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log(res)
    return res
  } catch (err) {
    console.error('fail post phone auth', err)
  }
}



interface PutPhoneAuth {
  receiverPhoneNumber: string
}

export const putPhoneAuth = async (code: string, userPhoneNumber: PutPhoneAuth) => {
  try {
    const res = await instance.put(`/api/verification-code/${code}`, userPhoneNumber, {headers})
    console.log(res)
  } catch (err) {
    console.error('fail put phone auth ', err)
  }
}
