import React, { useState, useEffect } from 'react';
import './AddressDialog.css';
import { DaumPostcodeData } from '../types/daum';

interface AddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Address) => void;
}

interface Address {
  isInternational: boolean;
  country: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  recipient: string;
  phone: string;
}

const COUNTRIES = [
  { code: 'KR', name: '대한민국' },
  { code: 'US', name: '미국' },
  { code: 'JP', name: '일본' },
  { code: 'CN', name: '중국' },
  { code: 'GB', name: '영국' },
  { code: 'DE', name: '독일' },
  { code: 'FR', name: '프랑스' },
  { code: 'IT', name: '이탈리아' },
  { code: 'ES', name: '스페인' },
  { code: 'CA', name: '캐나다' },
  { code: 'AU', name: '호주' },
  { code: 'BR', name: '브라질' },
  { code: 'IN', name: '인도' },
  { code: 'RU', name: '러시아' },
  { code: 'SG', name: '싱가포르' },
  { code: 'HK', name: '홍콩' },
  { code: 'TW', name: '대만' },
  { code: 'TH', name: '태국' },
  { code: 'VN', name: '베트남' },
  { code: 'ID', name: '인도네시아' },
  { code: 'MY', name: '말레이시아' },
  { code: 'PH', name: '필리핀' },
  { code: 'MX', name: '멕시코' },
  { code: 'AE', name: '아랍에미리트' },
  { code: 'SA', name: '사우디아라비아' },
  { code: 'IL', name: '이스라엘' },
  { code: 'NZ', name: '뉴질랜드' },
  { code: 'CH', name: '스위스' },
  { code: 'SE', name: '스웨덴' },
  { code: 'NO', name: '노르웨이' },
  { code: 'DK', name: '덴마크' },
  { code: 'FI', name: '핀란드' },
  { code: 'IE', name: '아일랜드' },
  { code: 'AT', name: '오스트리아' },
  { code: 'BE', name: '벨기에' },
  { code: 'NL', name: '네덜란드' },
  { code: 'PT', name: '포르투갈' },
  { code: 'GR', name: '그리스' },
  { code: 'PL', name: '폴란드' },
  { code: 'CZ', name: '체코' },
  { code: 'HU', name: '헝가리' },
  { code: 'SK', name: '슬로바키아' },
  { code: 'RO', name: '루마니아' },
  { code: 'BG', name: '불가리아' },
  { code: 'HR', name: '크로아티아' },
  { code: 'SI', name: '슬로베니아' },
  { code: 'EE', name: '에스토니아' },
  { code: 'LV', name: '라트비아' },
  { code: 'LT', name: '리투아니아' },
  { code: 'CY', name: '키프로스' },
  { code: 'LU', name: '룩셈부르크' },
  { code: 'MT', name: '몰타' },
  { code: 'IS', name: '아이슬란드' },
  { code: 'LI', name: '리히텐슈타인' },
  { code: 'MC', name: '모나코' },
  { code: 'AD', name: '안도라' },
  { code: 'SM', name: '산마리노' },
  { code: 'VA', name: '바티칸 시국' },
  { code: 'KZ', name: '카자흐스탄' },
  { code: 'UA', name: '우크라이나' },
  { code: 'BY', name: '벨라루스' },
  { code: 'UZ', name: '우즈베키스탄' },
  { code: 'AZ', name: '아제르바이잔' },
  { code: 'GE', name: '조지아' },
  { code: 'AM', name: '아르메니아' },
  { code: 'KG', name: '키르기스스탄' },
  { code: 'TJ', name: '타지키스탄' },
  { code: 'TM', name: '투르크메니스탄' },
  { code: 'MD', name: '몰도바' },
  { code: 'AL', name: '알바니아' },
  { code: 'MK', name: '북마케도니아' },
  { code: 'ME', name: '몬테네그로' },
  { code: 'RS', name: '세르비아' },
  { code: 'BA', name: '보스니아 헤르체고비나' },
  { code: 'XK', name: '코소보' },
  { code: 'TR', name: '터키' },
  { code: 'AR', name: '아르헨티나' },
  { code: 'CL', name: '칠레' },
  { code: 'CO', name: '콜롬비아' },
  { code: 'PE', name: '페루' },
  { code: 'VE', name: '베네수엘라' },
  { code: 'EC', name: '에콰도르' },
  { code: 'BO', name: '볼리비아' },
  { code: 'PY', name: '파라과이' },
  { code: 'UY', name: '우루과이' },
  { code: 'CR', name: '코스타리카' },
  { code: 'PA', name: '파나마' },
  { code: 'DO', name: '도미니카 공화국' },
  { code: 'PR', name: '푸에르토리코' },
  { code: 'GT', name: '과테말라' },
  { code: 'SV', name: '엘살바도르' },
  { code: 'HN', name: '온두라스' },
  { code: 'NI', name: '니카라과' },
  { code: 'CU', name: '쿠바' },
  { code: 'HT', name: '아이티이' },
  { code: 'JM', name: '자메이카' },
  { code: 'TT', name: '트리니다드 토바고' },
  { code: 'BB', name: '바베이도스' },
  { code: 'GD', name: '그레나다' },
  { code: 'LC', name: '세인트루시아' },
  { code: 'VC', name: '세인트빈센트 그레나딘' },
  { code: 'AG', name: '앤티가 바부다' },
  { code: 'KN', name: '세인트키츠 네비스' },
  { code: 'DM', name: '도미니카 연방' },
  { code: 'SR', name: '수리남' },
  { code: 'GY', name: '가이아나' },
  { code: 'BZ', name: '벨리즈' },
  { code: 'BS', name: '바하마' },
  { code: 'BM', name: '버뮤다' },
  { code: 'AI', name: '앵귈라' },
  { code: 'VG', name: '영국령 버진 아일랜드' },
  { code: 'VI', name: '미국령 버진 아일랜드' },
  { code: 'AW', name: '아루바' },
  { code: 'CW', name: '퀴라소' },
  { code: 'SX', name: '신트외스타위위스' },
  { code: 'BL', name: '생바르텔레미' },
  { code: 'MF', name: '생마르탱' },
  { code: 'PM', name: '생피에르 미클롱' },
  { code: 'WF', name: '왈리스 푸투나' },
  { code: 'PF', name: '프랑스령 폴리네시아' },
  { code: 'NC', name: '뉴칼레도니아' },
  { code: 'VU', name: '바누아투' },
  { code: 'SB', name: '솔로몬 제도' },
  { code: 'GU', name: '괌' },
  { code: 'MP', name: '북마리아나 제도' },
  { code: 'AS', name: '미국령 사모아' },
  { code: 'FM', name: '미크로네시아 연방' },
  { code: 'MH', name: '마셜 제도' },
  { code: 'PW', name: '팔라우' },
  { code: 'KI', name: '키리바시' },
  { code: 'NR', name: '나우루' },
  { code: 'TV', name: '투발루' },
  { code: 'TO', name: '통가' },
  { code: 'WS', name: '사모아' },
  { code: 'FJ', name: '피지' },
  { code: 'PG', name: '파푸아뉴기니' },
  { code: 'TL', name: '동티모르' },
  { code: 'BN', name: '브루나이' },
  { code: 'MM', name: '미얀마' },
  { code: 'KH', name: '캄보디아' },
  { code: 'LA', name: '라오스' },
  { code: 'BD', name: '방글라데시' },
  { code: 'NP', name: '네팔' },
  { code: 'BT', name: '부탄' },
  { code: 'MV', name: '몰디브' },
  { code: 'LK', name: '스리랑카' },
  { code: 'PK', name: '파키스탄' },
  { code: 'AF', name: '아프가니스탄' },
  { code: 'IR', name: '이란' },
  { code: 'IQ', name: '이라크' },
  { code: 'SY', name: '시리아' },
  { code: 'LB', name: '레바논' },
  { code: 'JO', name: '요르단' },
  { code: 'PS', name: '팔레스타인' },
  { code: 'KW', name: '쿠웨이트' },
  { code: 'BH', name: '바레인' },
  { code: 'QA', name: '카타르' },
  { code: 'OM', name: '오만' },
  { code: 'YE', name: '예멘' },
  { code: 'EG', name: '이집트' },
  { code: 'LY', name: '리비아' },
  { code: 'TN', name: '튀니지' },
  { code: 'DZ', name: '알제리' },
  { code: 'MA', name: '모로코' },
  { code: 'MR', name: '모리타니' },
  { code: 'ML', name: '말리' },
  { code: 'SN', name: '세네갈' },
  { code: 'GM', name: '감비아' },
  { code: 'GN', name: '기니' },
  { code: 'CI', name: '코트디부아르' },
  { code: 'BF', name: '부르키나파소' },
  { code: 'NE', name: '니제르' },
  { code: 'TG', name: '토고' },
  { code: 'BJ', name: '베냉' },
  { code: 'NG', name: '나이지리아' },
  { code: 'CM', name: '카메룬' },
  { code: 'GQ', name: '적도 기니' },
  { code: 'GA', name: '가봉' },
  { code: 'CG', name: '콩고' },
  { code: 'CD', name: '콩고 민주 공화국' },
  { code: 'AO', name: '앙골라' },
  { code: 'GW', name: '기니비사우' },
  { code: 'ST', name: '상투메 프린시페' },
  { code: 'CV', name: '카보베르데' },
  { code: 'SL', name: '시에라리온' },
  { code: 'LR', name: '라이베리아' },
  { code: 'GH', name: '가나' },
  { code: 'TD', name: '차드' },
  { code: 'CF', name: '중앙아프리카 공화국' },
  { code: 'ER', name: '에리트레아' },
  { code: 'ET', name: '에티오피아' },
  { code: 'DJ', name: '지부티' },
  { code: 'SO', name: '소말리아' },
  { code: 'KE', name: '케냐' },
  { code: 'TZ', name: '탄자니아' },
  { code: 'UG', name: '우간다' },
  { code: 'RW', name: '르완다' },
  { code: 'BI', name: '부룬디' },
  { code: 'SS', name: '남수단' },
  { code: 'SD', name: '수단' },
  { code: 'CF', name: '중앙아프리카 공화국' },
  { code: 'CM', name: '카메룬' },
  { code: 'GQ', name: '적도 기니' },
  { code: 'GA', name: '가봉' },
  { code: 'CG', name: '콩고' },
  { code: 'CD', name: '콩고 민주 공화국' },
  { code: 'AO', name: '앙골라' },
  { code: 'GW', name: '기니비사우' },
  { code: 'ST', name: '상투메 프린시페' },
  { code: 'CV', name: '카보베르데' },
  { code: 'SL', name: '시에라리온' },
  { code: 'LR', name: '라이베리아' },
  { code: 'GH', name: '가나' },
  { code: 'TD', name: '차드' },
  { code: 'CF', name: '중앙아프리카 공화국' },
  { code: 'ER', name: '에리트레아' },
  { code: 'ET', name: '에티오피아' },
  { code: 'DJ', name: '지부티' },
  { code: 'SO', name: '소말리아' },
  { code: 'KE', name: '케냐' },
  { code: 'TZ', name: '탄자니아' },
  { code: 'UG', name: '우간다' },
  { code: 'RW', name: '르완다' },
  { code: 'BI', name: '부룬디' },
  { code: 'SS', name: '남수단' },
  { code: 'SD', name: '수단' }
];

const AddressDialog: React.FC<AddressDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [address, setAddress] = useState<Address>({
    isInternational: false,
    country: 'KR',
    zipCode: '',
    address: '',
    detailAddress: '',
    recipient: '',
    phone: ''
  });

  useEffect(() => {
    if (!address.isInternational) {
      // 카카오 주소 API 스크립트 로드
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [address.isInternational]);

  const handleSearchAddress = () => {
    if (!address.isInternational && window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: DaumPostcodeData) => {
          setAddress(prev => ({
            ...prev,
            zipCode: data.zonecode,
            address: data.address
          }));
        }
      }).open();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(address);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          <h2>배송지 입력</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={address.isInternational}
                onChange={(e) => setAddress(prev => ({ ...prev, isInternational: e.target.checked }))}
              />
              해외 배송지
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="recipient">받는 사람</label>
            <input
              type="text"
              id="recipient"
              value={address.recipient}
              onChange={(e) => setAddress(prev => ({ ...prev, recipient: e.target.value }))}
              required
              placeholder="받는 사람 이름"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">연락처</label>
            <input
              type="tel"
              id="phone"
              value={address.phone}
              onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
              required
              placeholder="연락처"
            />
          </div>
          {address.isInternational && (
            <div className="form-group">
              <label htmlFor="country">국가</label>
              <select
                id="country"
                value={address.country}
                onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
                required
              >
                {COUNTRIES.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label>주소</label>
            {!address.isInternational ? (
              <>
                <div className="address-input-group">
                  <input
                    type="text"
                    value={address.zipCode}
                    readOnly
                    placeholder="우편번호"
                  />
                  <button type="button" onClick={handleSearchAddress} className="search-button">
                    주소 검색
                  </button>
                </div>
                <input
                  type="text"
                  value={address.address}
                  readOnly
                  placeholder="주소"
                />
              </>
            ) : (
              <input
                type="text"
                value={address.address}
                onChange={(e) => setAddress(prev => ({ ...prev, address: e.target.value }))}
                placeholder="주소"
                required
              />
            )}
            <input
              type="text"
              value={address.detailAddress}
              onChange={(e) => setAddress(prev => ({ ...prev, detailAddress: e.target.value }))}
              placeholder="상세주소"
              required
            />
          </div>
          <div className="dialog-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="save-button">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressDialog; 