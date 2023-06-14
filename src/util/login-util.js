// 토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
export const setLoginUserInfo = ({token, userName, role}) => {

    // json에 담긴 인증정보를 클라이언트에 보관
    // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨
    // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('LOGIN_USERNAME', userName);
    localStorage.setItem('USER_ROLE', role);

};

// 로그인한 유저의 데이터객체를 반환하는 함수
export const getLoginUserInfo = () => {
    return {
        token: localStorage.getItem('ACCESS_TOKEN'),
        username: localStorage.getItem('LOGIN_USERNAME'),
        role: localStorage.getItem('USER_ROLE')
    };
};

// 로그인 여부를 확인하는 함수
// const isLogin = () => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   if (token === null) return false;
//   return true;
// };

export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');