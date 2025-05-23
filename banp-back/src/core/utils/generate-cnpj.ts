export function generateRandomCNPJ() {
  let cnpj = '';
  for (let i = 0; i < 8; i++) {
    cnpj += Math.floor(Math.random() * 10);
  }
  cnpj += '0001'; // Suffix for main branch

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let d1 = 0,
    d2 = 0;
  for (let i = 0; i < 12; i++) {
    d1 += (cnpj[i] as any) * weights1[i];
  }
  d1 = d1 % 11;
  d1 = d1 < 2 ? 0 : 11 - d1;

  cnpj += d1;

  for (let i = 0; i < 13; i++) {
    d2 += (cnpj[i] as any) * weights2[i];
  }
  d2 = d2 % 11;
  d2 = d2 < 2 ? 0 : 11 - d2;

  cnpj += d2;

  return cnpj;
}

export function generateCNPJArray(n: number) {
  const cnpjArray = [];
  for (let i = 0; i < n; i++) {
    cnpjArray.push(generateRandomCNPJ());
  }
  return cnpjArray;
}

export default generateCNPJArray;
