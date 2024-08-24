import { BehaviorSubject } from "rxjs";

// 초기 상태 설정
const initialUserState = null;

// BehaviorSubject 생성 (초기 상태는 null로 설정)
export const userState$ = new BehaviorSubject(initialUserState);

// 상태 업데이트 함수
export const setUserState = (userData: any) => {
  userState$.next(userData);
};

// 상태 가져오기 함수 (옵셔널)
export const getUserState = () => userState$.getValue();
