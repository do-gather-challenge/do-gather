import { z } from 'zod';

const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,12}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!#@$%&*?]{6,16}$/;

const AuthSchema = {
  EMAIL_SCHEMA: z.string().email({
    message: '유효한 이메일 형식이 아닙니다.'
  }),
  NICKNAME_SCHEMA: z
    .string()
    .min(2, { message: '2~12자 이하의 한글/영어/숫자만 가능합니다.' })
    .max(12, { message: '2~12자 이하의 한글/영어/숫자만 가능합니다.' })
    .regex(nicknameRegex, { message: '특수문자, 공백이 포함 될 수 없습니다.' }),
  PASSWORD_SCHEMA: z
    .string()
    .min(6, { message: '비밀번호는 6자리 이상 입력해주세요.' })
    .max(16, { message: '비밀번호는 16자리 이하 입력해주세요. ' })
    .regex(passwordRegex, { message: '영문, 숫자, 특수문자(!@$%^&*()를 최소 1개 이상 포함하여야 합니다. ' }),
  CONFIRM_PASSWORD_SCHEMA: z.string()
};

export default AuthSchema;
