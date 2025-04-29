import { LoginDto } from "@/models/loginDto";

/**
 * Attempt Login
 * @returns
 */
export default async function postLogin(email: string, password: string): Promise<LoginDto> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    if (response.ok) {
        return response.json();
    } else {
        let errorMessage = '알 수 없는 오류가 발생했습니다.';

        try {
            const errorData = await response.json(); // 에러 응답이 JSON일 경우
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);

        } catch (e) {
            // JSON 파싱 실패하면 그냥 텍스트로 처리
            console.log(e);
            const text = await response.text();
            errorMessage = text || errorMessage;
        }

        console.error(`로그인 실패: ${errorMessage}`);
        throw new Error(errorMessage);  // 호출한 쪽에서 에러 처리하게 던짐
    }
}