import instance from './axios';

export const imgSize = () => {
  const width = window.innerWidth;
  let maxWidth;
  if (width > 1024) {
    maxWidth = 168;
  } else if (width > 768) {
    maxWidth = 84;
  } else if (width > 480) {
    maxWidth = 56;
  } else {
    maxWidth = 42;
  }
  return maxWidth;
};

export const fetchImg = async (img: any, type: string) => {
  const data = new FormData();
  data.append('image', img);
  data.append('type', type);
  try {
    const response = await instance.post(`/api/image`, data);
    console.log(response.data.data.imageUrl);
    return response.data.data.imageUrl;
  } catch (error) {
    console.log(error, 'img fetch 실패');
  }
};
