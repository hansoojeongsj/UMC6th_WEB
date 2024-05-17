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
    id:'',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = {...errors};
    
    // 값이 변경될 때마다 검증을 실시하여 에러 메시지를 업데이트
    switch(name) {
      case 'name':
        newErrors.name = value.trim() ? '' : '이름을 입력해주세요!';
        break;
      case 'id':
        newErrors.id = value.trim() ? '' : '아이디를 입력해주세요!';
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
      case 'confirmPassword':
        newErrors.confirmPassword = value.trim() ? (value !== formData.password ? '비밀번호가 일치하지 않습니다.' : '') : '비밀번호를 다시 입력해주세요!';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // 이름 입력 필드 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요!';
    }
    // 아이디 입력 필드 검증
    if (!formData.id.trim()) {
      newErrors.id = '아이디를 입력해주세요!';
    }
    // 이메일 입력 필드 검증
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요!';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = '이메일 형식에 맞게 다시 입력해주세요!';
    }
    // 나이 입력 필드 검증
    if (!formData.age.trim()) {
      newErrors.age = '나이를 입력해주세요!';
    } else if (isNaN(formData.age)) {
      newErrors.age = '나이는 숫자로 입력해주세요!';
    } else if (parseFloat(formData.age) !== parseInt(formData.age)) {
      newErrors.age = '나이는 실수를 입력할 수 없습니다.';
    } else if (parseInt(formData.age) < 0) {
      newErrors.age = '나이는 음수가 될 수 없습니다.';
    } else if (parseInt(formData.age) < 19) {
      newErrors.age = '19세 이상만 사용 가능 합니다!';
    }

    // 비밀번호 입력 필드 검증
    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요!';
    } else if (formData.password.length < 4) {
      newErrors.password = '비밀번호는 최소 4자리 이상이어야 합니다.';
    } else if (formData.password.length > 12) {
      newErrors.password = '비밀번호는 최대 12자리까지 가능합니다.';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/.test(formData.password.trim())) {
      newErrors.password = '영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해주세요.';
    }



    // 비밀번호 확인 입력 필드 검증
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호를 다시 입력해주세요!';
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 여기에 회원가입 처리 로직 작성
      console.log(formData);
      console.log('제출 완료~!');
      // 회원가입이 성공했을 때 알림 띄우기
      alert('회원가입이 성공했습니다!');
      // 홈페이지로 이동
      navigate('/'); // 홈페이지 경로로 변경
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
        name="id"
        placeholder="아이디를 입력해주세요"
        value={formData.id}
        onChange={handleChange}
      />
      {errors.id && <Content><ErrorMsg>{errors.id}</ErrorMsg></Content>}
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
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <Content><ErrorMsg>{errors.confirmPassword}</ErrorMsg></Content>}
      <Button type="submit">제출하기</Button>
      <BottomContent>
        이미 아이디가 있으신가요?{' '}
        <LoginLink to="/login">로그인 페이지로 이동하기</LoginLink>
      </BottomContent>    
      </SignUpForm>
  );
}

export default SignUpPage;
