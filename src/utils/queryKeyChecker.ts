import { ParsedUrlQuery } from 'querystring';

/**
 * @param {string} query 쿼리 리스트
 * @param {string[]} allow 허용할 쿼리스트링 리스트
 * @return {boolean} 허용되지않은 쿼리스트링일 경우 false 반환
 */

interface IQueryKeyChecker {
  query: ParsedUrlQuery;
  allow: string[];
}

export const queryKeyChecker = ({ query, allow }: IQueryKeyChecker): boolean => {
  const queryList: string[] | [] = Object.keys(query);
  const result = queryList.map((query) => allow.includes(query));

  if (result.length === 0 || result.every((el) => el)) {
    return true;
  }

  return false;
};
