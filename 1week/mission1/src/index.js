
// 이름
function validateName() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();
  const nameMessage = document.getElementById("name-message"); // 오류 메시지를 표시할 요소 가져옴
  
  if (name === "") {
    nameMessage.textContent = "필수 입력 항목입니다!";
    nameMessage.style.color = "red"; 
  } else {
    nameMessage.textContent = "멋진 이름이네요!";
    nameMessage.style.color = "green";
    return true
  }
}
// 이메일
function validateEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  const emailMessage = document.getElementById("email-message"); // 오류 메시지를 표시할 요소 가져옴

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailMessage.textContent = "올바른 이메일 형식이 아닙니다!";
    emailMessage.style.color = "red"; 
  } else {
    emailMessage.textContent = "올바른 이메일 형식입니다!";
    emailMessage.style.color = "green"; 
    return true

  }
}

// 나이
function validateAge() {
  const ageInput = document.getElementById("age");
  const age = ageInput.value.trim();
  const ageMessage = document.getElementById("age-message");
  
  if (age === "") {
    ageMessage.textContent = "나이를 입력해주세요!";
    ageMessage.style.color = "red";
    return false;
  }
  // 입력값이 숫자가 아닌 경우
  if (isNaN(age)) {
    ageMessage.textContent = "나이는 숫자 형식이어야 합니다!";
    ageMessage.style.color = "red";
    return false; 
  }

  // 입력값이 음수인 경우
  if (age < 0) {
    ageMessage.textContent = "나이는 음수가 될 수 없습니다!";
    ageMessage.style.color = "red";
    return false; 
  }

  // 입력값이 소수인 경우
  if (age % 1 !== 0) {
    ageMessage.textContent = "나이는 소수가 될 수 없습니다!";
    ageMessage.style.color = "red";
    return false;
  }

  // 입력값이 19 미만인 경우
  if (age < 19) {
    ageMessage.textContent = "미성년자는 가입할 수 없습니다!";
    ageMessage.style.color = "red";
    return false; 
  }

  ageMessage.textContent = "올바른 나이 형식입니다!";
  ageMessage.style.color = "green";
  return true; 
}

function validatePassword() {
  const passwordInput = document.getElementById("password");
  const password = passwordInput.value.trim(); 
  const passwordMessage = document.getElementById("password-message"); // 오류 메시지를 표시할 요소 가져옴


  // 최소 4자리 이상인지 확인
  if (password.length < 4) {
    passwordMessage.textContent = "비밀번호는 최소 4자리 이상이어야 합니다.";
    passwordMessage.style.color = "red";
    return false; 
  }

  // 최대 12자리 이하인지 확인
  if (password.length > 12) {
    passwordMessage.textContent = "비밀번호는 최대 12자리까지 가능합니다.";
    passwordMessage.style.color = "red";
    return false; 
  }

  // 영어, 숫자, 특수문자를 모두 포함하는지 확인
  const hasLetter = /[a-zA-Z]/.test(password); 
  const hasNumber = /\d/.test(password); 
  const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password); // 특수문자 포함 여부

  if (!(hasLetter && hasNumber && hasSpecialChar)) {
    passwordMessage.textContent = "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다.";
    passwordMessage.style.color = "red";
    return false;
  }

  // 유효한 경우 메시지 표시
  passwordMessage.textContent = "올바른 비밀번호입니다!";
  passwordMessage.style.color = "green";
  return true; 
}

function validateConfirmPassword() {
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmPassword = confirmPasswordInput.value.trim();
  const confirmPasswordMessage = document.getElementById("confirm-password-message"); // 오류 메시지를 표시할 요소 가져옴

  const password = passwordInput.value.trim();
  if (password !== confirmPassword || password ==="") {
    confirmPasswordMessage.textContent = "비밀번호가 일치하지 않습니다.";
    confirmPasswordMessage.style.color = "red";
    return false; 
  }

  confirmPasswordMessage.textContent = "비밀번호가 일치합니다!";
  confirmPasswordMessage.style.color = "green";
  return true;
}

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById("submit-btn");
  const modal = document.querySelector(".modal-wrapper"); // 수정된 부분
  const closeButton = document.getElementById("close");

  submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // 유효성 검사 함수들 호출하여 모두 true 여부 확인
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isAgeValid = validateAge();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    console.log("isConfirmPasswordValid", isConfirmPasswordValid);
    console.log("isPasswordValid", isPasswordValid);
    console.log("isAgeValid", isAgeValid);
    console.log("isEmailValid", isEmailValid);
    console.log("isNameValid", isNameValid);

    if (isNameValid && isEmailValid && isAgeValid && isPasswordValid && isConfirmPasswordValid) {
      modal.style.display = "flex";
    }
  });

  // 모달 닫기 버튼 클릭 이벤트 처리
  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });
});