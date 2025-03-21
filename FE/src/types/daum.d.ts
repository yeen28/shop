export interface DaumPostcodeData {
  zonecode: string;
  address: string;
}

export interface DaumPostcode {
  open: () => void;
  oncomplete: (data: DaumPostcodeData) => void;
}

export interface Daum {
  Postcode: new (config: { oncomplete: (data: DaumPostcodeData) => void }) => DaumPostcode;
}

declare global {
  interface Window {
    daum: Daum;
  }
} 