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

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case 'id':
        newErrors.id = value.trim() ? '' : '아이디를 입력해주세요!';
        break;
        case 'password':
          newErrors.password = value.trim() ? (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/.test(value.trim()) ? 
          (value.trim().length < 4 ? '비밀번호는 최소 4자리 이상이어야 합니다.' : (value.trim().length > 12 ? '비밀번호는 최대 12자리까지 가능합니다.' : '비밀번호는 영어, 숫자, 특수문자를 포함해주세요.')) 
          : '') : '비밀번호를 입력해주세요!';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = '아이디를 입력해주세요!';
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
      console.log(formData);
      console.log('로그인 완료~!');
      alert('로그인이 성공했습니다!');
      navigate('/');
    }
  };

  return (
    <SignUpForm onSubmit={handleSubmit}>
      <Title>로그인 페이지</Title>
      <InputField
        type="text"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleChange}
      />
      {errors.id && <Content><ErrorMsg>{errors.id}</ErrorMsg></Content>}
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
