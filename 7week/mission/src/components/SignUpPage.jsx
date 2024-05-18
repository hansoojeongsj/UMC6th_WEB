import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 356px;
`;
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
`;
const LoginLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
`;

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',

    email: '',
    age: '',
    password: '',
    passwordCheck: ''
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    
    // 값이 변경될 때마다 검증을 실시하여 에러 메시지를 업데이트
    switch(name) {
      case 'name':
        newErrors.name = value.trim() ? '' : '이름을 입력해주세요!';
        break;
      case 'username':
        newErrors.username = value.trim() ? '' : '아이디를 입력해주세요!';
        break;
      case 'email':
        newErrors.email = value.trim() ? (/^\S+@\S+\.\S+$/.test(value.trim()) ? '' : '이메일 형식에 맞게 다시 입력해주세요!') : '이메일을 입력해주세요!';
        break;
      case 'age':
        newErrors.age = value.trim() ? (isNaN(value) ? '나이는 숫자로 입력해주세요!' : (parseFloat(value) !== parseInt(value) ? '나이는 실수를 입력할 수 없습니다.' : (parseInt(value) < 0 ? '나이는 음수가 될 수 없습니다.' : (parseInt(value) < 19 ? '19세 이상만 사용 가능 합니다!' : '')))) : '나이를 입력해주세요!';
        break;
      case 'password':
        newErrors.password = value.trim() ? (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/.test(value.trim()) ? 
        (value.trim().length < 4 ? '비밀번호는 최소 4자리 이상이어야 합니다.' : (value.trim().length > 12 ? '비밀번호는 최대 12자리까지 가능합니다.' : '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.')) 
        : '') : '비밀번호를 입력해주세요!';
        break;
      case 'passwordCheck':
        newErrors.passwordCheck = value.trim() ? (value !== formData.password ? '비밀번호가 일치하지 않습니다.' : '') : '비밀번호를 다시 입력해주세요!';
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 회원가입 데이터 객체 생성
    const signUpData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      age: formData.age,
      password: formData.password,
      passwordCheck: formData.passwordCheck
    };

    try {
      // 서버에 회원가입 데이터 전송
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      });

      // 응답 확인
      if (response.ok) {
        // 회원가입 성공 메시지 출력
        alert('회원가입이 성공했습니다!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <SignUpForm onSubmit={handleSubmit}>
      <Title>회원가입 페이지</Title>
      <InputField
        type="text"
        name="name"
        placeholder="이름을 입력해주세요"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <Content><ErrorMsg>{errors.name}</ErrorMsg></Content>}
      <InputField
        type="text"
        name="username"
        placeholder="아이디를 입력해주세요"
        value={formData.username}
        onChange={handleChange}
      />
      {errors.username && <Content><ErrorMsg>{errors.username}</ErrorMsg></Content>}
      <InputField
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <Content><ErrorMsg>{errors.email}</ErrorMsg></Content>}
      <InputField
        type="text"
        name="age"
        placeholder="나이를 입력해주세요"
        value={formData.age}
        onChange={handleChange}
      />
      {errors.age && <Content><ErrorMsg>{errors.age}</ErrorMsg></Content>}
      <InputField
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <Content><ErrorMsg>{errors.password}</ErrorMsg></Content>}
      <InputField
        type="password"
        name="passwordCheck"
        placeholder="비밀번호 확인"
        value={formData.passwordCheck}
        onChange={handleChange}
      />
      {errors.passwordCheck && <Content><ErrorMsg>{errors.passwordCheck}</ErrorMsg></Content>}
      <Button type="submit">제출하기</Button>
      <BottomContent>
        이미 아이디가 있으신가요?{' '}
        <LoginLink to="/login">로그인 페이지로 이동하기</LoginLink>
      </BottomContent>    
      </SignUpForm>
  );
}

export default SignUpPage;
