import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
`;

const InputField = styled.input`
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 350px;
  height: 25px;
  font-weight: bold;
  @media (max-width: 410px) {
    width: 80%;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 360px;
  @media (max-width: 410px) {
    width: 85%;
  }`;

const Content = styled.p`
  color: white;
  margin: 3px;
`;

const ErrorMsg = styled.span`
  color: red;
`;

const BottomContent = styled.span`
  margin: 20px;
  color: white;
  @media (max-width: 450px) {
    font-size: 13px;
  }
  @media (max-width: 370px) {
    display: flex;
    flex-direction: column;
  }
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
`;

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case 'username':
        newErrors.username = value.trim() ? '' : '아이디를 입력해주세요!';
        break;
      case 'password':
        newErrors.password = value.trim()
          ? !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/.test(value.trim())
            ? value.trim().length < 4
              ? '비밀번호는 최소 4자리 이상이어야 합니다.'
              : value.trim().length > 12
              ? '비밀번호는 최대 12자리까지 가능합니다.'
              : '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.'
            : ''
          : '비밀번호를 입력해주세요!';
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '아이디를 입력해주세요!';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요!';
    } else if (formData.password.length < 4) {
      newErrors.password = '비밀번호는 최소 4자리 이상이어야 합니다.';
    } else if (formData.password.length > 12) {
      newErrors.password = '비밀번호는 최대 12자리까지 가능합니다.';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/.test(formData.password.trim())) {
      newErrors.password = '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해주세요.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // 서버에 로그인 데이터 전송
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          // 로그인 성공 시 AuthContext의 login 함수를 호출
          login(data.token, formData.username);
          console.log('로그인 완료~!');
          alert('로그인이 성공했습니다!');
          navigate('/');
        } else {
          const errorData = await response.json();
          console.error('로그인 실패:', errorData.message);
          alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        }
      } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <SignUpForm onSubmit={handleSubmit}>
      <Title>로그인 페이지</Title>
      <InputField
        type="text"
        name="username"
        placeholder="아이디"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <Content><ErrorMsg>{errors.username}</ErrorMsg></Content>}
      <InputField
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <Content><ErrorMsg>{errors.password}</ErrorMsg></Content>}
      <Button type="submit">로그인</Button>
      <BottomContent>
        아이디가 없으신가요?{' '}
        <LoginLink to="/signup">회원가입 페이지로 이동하기</LoginLink>
      </BottomContent>
    </SignUpForm>
  );
}

export default Login;
